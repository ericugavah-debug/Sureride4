
import { supabase } from './supabase';

export interface TripPod {
  id: string;
  driver_id: string;
  title: string;
  description?: string;
  departure_location: string;
  destination: string;
  departure_time: string;
  available_seats: number;
  price_per_seat: number;
  status: 'active' | 'full' | 'completed' | 'cancelled';
  created_at: string;
  driver?: {
    full_name: string;
    avatar_url?: string;
  };
  vehicle?: {
    make: string;
    model: string;
    color: string;
    license_plate: string;
  };
}

export interface RideRequest {
  id: string;
  trip_pod_id: string;
  student_id: string;
  seats_requested: number;
  pickup_location: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
  trip_pod?: TripPod;
  student?: {
    full_name: string;
    avatar_url?: string;
  };
}

export interface Earnings {
  id: string;
  driver_id: string;
  trip_pod_id: string;
  ride_request_id: string;
  amount: number;
  commission: number;
  net_amount: number;
  status: 'pending' | 'paid' | 'processing';
  payout_date?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'ride_request' | 'ride_accepted' | 'ride_cancelled' | 'payment' | 'general';
  read: boolean;
  data?: any;
  created_at: string;
}

// Trip Pods Functions
export const createTripPod = async (tripPodData: Omit<TripPod, 'id' | 'created_at' | 'status'>) => {
  const { data, error } = await supabase
    .from('trip_pods')
    .insert([tripPodData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getTripPods = async (filters?: {
  departure_location?: string;
  destination?: string;
  departure_date?: string;
}) => {
  let query = supabase
    .from('trip_pods')
    .select(`
      *,
      driver:users!driver_id(full_name, avatar_url),
      vehicle:driver_profiles!driver_id(make, model, color, license_plate)
    `)
    .eq('status', 'active')
    .gt('departure_time', new Date().toISOString())
    .order('departure_time', { ascending: true });

  if (filters?.departure_location) {
    query = query.ilike('departure_location', `%${filters.departure_location}%`);
  }
  if (filters?.destination) {
    query = query.ilike('destination', `%${filters.destination}%`);
  }
  if (filters?.departure_date) {
    const startOfDay = new Date(filters.departure_date);
    const endOfDay = new Date(filters.departure_date);
    endOfDay.setHours(23, 59, 59, 999);
    query = query.gte('departure_time', startOfDay.toISOString())
                 .lte('departure_time', endOfDay.toISOString());
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getDriverTripPods = async (driverId: string) => {
  const { data, error } = await supabase
    .from('trip_pods')
    .select(`
      *,
      ride_requests(
        id,
        student_id,
        seats_requested,
        pickup_location,
        status,
        total_amount,
        student:users!student_id(full_name, avatar_url)
      )
    `)
    .eq('driver_id', driverId)
    .order('departure_time', { ascending: false });

  if (error) throw error;
  return data;
};

// Ride Requests Functions
export const createRideRequest = async (requestData: Omit<RideRequest, 'id' | 'created_at' | 'status' | 'payment_status'>) => {
  const { data, error } = await supabase
    .from('ride_requests')
    .insert([{ ...requestData, status: 'pending', payment_status: 'pending' }])
    .select()
    .single();

  if (error) throw error;
  
  // Create notification for driver
  await createNotification({
    user_id: requestData.trip_pod_id, // Will be replaced with actual driver_id in trigger
    title: 'New Ride Request',
    message: `You have a new ride request for ${requestData.seats_requested} seat(s)`,
    type: 'ride_request',
    data: { ride_request_id: data.id }
  });

  return data;
};

export const updateRideRequestStatus = async (requestId: string, status: RideRequest['status']) => {
  const { data, error } = await supabase
    .from('ride_requests')
    .update({ status })
    .eq('id', requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserRideRequests = async (userId: string) => {
  const { data, error } = await supabase
    .from('ride_requests')
    .select(`
      *,
      trip_pod:trip_pods(
        *,
        driver:users!driver_id(full_name, avatar_url),
        vehicle:driver_profiles!driver_id(make, model, color, license_plate)
      )
    `)
    .eq('student_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getDriverRideRequests = async (driverId: string) => {
  const { data, error } = await supabase
    .from('ride_requests')
    .select(`
      *,
      trip_pod:trip_pods!inner(
        id,
        title,
        departure_location,
        destination,
        departure_time
      ),
      student:users!student_id(full_name, avatar_url)
    `)
    .eq('trip_pods.driver_id', driverId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Earnings Functions
export const getDriverEarnings = async (driverId: string) => {
  const { data, error } = await supabase
    .from('earnings')
    .select(`
      *,
      trip_pod:trip_pods(title, departure_location, destination, departure_time),
      ride_request:ride_requests(seats_requested, student:users!student_id(full_name))
    `)
    .eq('driver_id', driverId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getDriverEarningsStats = async (driverId: string) => {
  const { data, error } = await supabase
    .from('earnings')
    .select('amount, net_amount, status')
    .eq('driver_id', driverId);

  if (error) throw error;

  const totalEarnings = data.reduce((sum, earning) => sum + earning.amount, 0);
  const totalNet = data.reduce((sum, earning) => sum + earning.net_amount, 0);
  const pendingEarnings = data
    .filter(earning => earning.status === 'pending')
    .reduce((sum, earning) => sum + earning.net_amount, 0);

  return {
    totalEarnings,
    totalNet,
    pendingEarnings,
    totalRides: data.length
  };
};

// Real-time notifications functions
export async function getUserNotifications(userId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data;
}

export async function markNotificationAsRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);

  if (error) throw error;
}

export function subscribeToNotifications(userId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`notifications_${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe();
}

// Chat functions
export async function sendChatMessage(messageData: {
  sender_id: string;
  sender_name: string;
  message: string;
  trip_pod_id?: string;
  ride_request_id?: string;
}) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([messageData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getChatMessages(chatId: string, chatType: 'trip_pod' | 'ride_request') {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq(`${chatType}_id`, chatId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

// Real-time ride status updates
export function subscribeToRideStatus(rideRequestId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`ride_status_${rideRequestId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'ride_requests',
        filter: `id=eq.${rideRequestId}`
      },
      callback
    )
    .subscribe();
}

// Create notification
export async function createNotification(notificationData: {
  user_id: string;
  title: string;
  message: string;
  type: string;
  data?: any;
}) {
  const { data, error } = await supabase
    .from('notifications')
    .insert([notificationData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Preserve other notification utilities
export const markAllNotificationsAsRead = async (userId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false);

  if (error) throw error;
};

// Real-time subscriptions
export const subscribeToRideRequests = (driverId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('ride_requests')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'ride_requests',
        filter: `trip_pod_id=in.(select id from trip_pods where driver_id=${driverId})`
      },
      callback
    )
    .subscribe();
};
