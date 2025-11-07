
import { supabase } from './supabase'
import { Database } from './supabase'

type UserProfile = Database['public']['Tables']['users']['Row']
type DriverProfile = Database['public']['Tables']['driver_profiles']['Row']

export interface AuthUser extends UserProfile {
  driver_profile?: DriverProfile
}

export const authService = {
  async signUp(email: string, password: string, userData: {
    full_name: string
    user_type: 'student' | 'driver'
    phone?: string
    university?: string
    department?: string
    student_id?: string
  }) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          ...userData,
        })

      if (profileError) throw profileError
    }

    return authData
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) return null

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select(`
        *,
        driver_profiles (*)
      `)
      .eq('id', user.id)
      .single()

    if (profileError) return null

    return {
      ...profile,
      driver_profile: profile.driver_profiles?.[0] || undefined
    }
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async createDriverProfile(userId: string, driverData: {
    license_number: string
    vehicle_make: string
    vehicle_model: string
    vehicle_year: number
    vehicle_plate: string
    vehicle_color: string
    vehicle_capacity: number
  }) {
    const { data, error } = await supabase
      .from('driver_profiles')
      .insert({
        user_id: userId,
        ...driverData,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateDriverProfile(userId: string, updates: Partial<DriverProfile>) {
    const { data, error } = await supabase
      .from('driver_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
