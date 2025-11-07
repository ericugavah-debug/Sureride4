
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data: any;
  read: boolean;
  created_at: string;
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: () => void;
}

export default function NotificationCard({ notification, onMarkAsRead }: NotificationCardProps) {
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkAsRead = async () => {
    if (notification.read) return;
    
    setIsMarking(true);
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notification.id);

      if (error) throw error;

      if (onMarkAsRead) {
        onMarkAsRead();
      }
    } catch (error) {
      console.error('Mark as read error:', error);
    } finally {
      setIsMarking(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_request': return 'ri-calendar-event-line text-blue-500';
      case 'booking_accepted': return 'ri-checkbox-circle-line text-green-500';
      case 'booking_rejected': return 'ri-close-circle-line text-red-500';
      case 'trip_reminder': return 'ri-alarm-line text-orange-500';
      case 'payment_received': return 'ri-money-naira-circle-line text-green-500';
      case 'trip_completed': return 'ri-check-double-line text-purple-500';
      case 'new_message': return 'ri-message-line text-blue-500';
      default: return 'ri-notification-line text-gray-500';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking_request': return 'bg-blue-50 border-blue-200';
      case 'booking_accepted': return 'bg-green-50 border-green-200';
      case 'booking_rejected': return 'bg-red-50 border-red-200';
      case 'trip_reminder': return 'bg-orange-50 border-orange-200';
      case 'payment_received': return 'bg-green-50 border-green-200';
      case 'trip_completed': return 'bg-purple-50 border-purple-200';
      case 'new_message': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const notificationDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return notificationDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      className={`rounded-xl border p-4 cursor-pointer transition-all ${
        notification.read 
          ? 'bg-white border-gray-200' 
          : `${getNotificationColor(notification.type)} border-l-4`
      }`}
      onClick={handleMarkAsRead}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className={getNotificationIcon(notification.type)}></i>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
              {notification.title}
            </h4>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <span className={`text-xs ${notification.read ? 'text-gray-400' : 'text-gray-500'}`}>
                {formatTimeAgo(notification.created_at)}
              </span>
              {!notification.read && (
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
          </div>
          
          <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
            {notification.message}
          </p>
          
          {notification.data && (
            <div className="mt-2">
              {notification.data.route && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-route-line"></i>
                  </div>
                  <span>{notification.data.route}</span>
                </div>
              )}
              {notification.data.amount && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-money-naira-circle-line"></i>
                  </div>
                  <span>₦{notification.data.amount.toLocaleString()}</span>
                </div>
              )}
              {notification.data.seats && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <div className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-group-line"></i>
                  </div>
                  <span>{notification.data.seats} seat{notification.data.seats > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {!notification.read && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMarkAsRead();
            }}
            disabled={isMarking}
            className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer disabled:opacity-50"
          >
            {isMarking ? 'Marking as read...' : 'Mark as read'}
          </button>
        </div>
      )}
    </div>
  );
}
