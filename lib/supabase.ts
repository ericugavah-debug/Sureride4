
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          user_type: 'student' | 'driver'
          full_name: string
          phone: string | null
          university: string | null
          department: string | null
          student_id: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          user_type: 'student' | 'driver'
          full_name: string
          phone?: string | null
          university?: string | null
          department?: string | null
          student_id?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          user_type?: 'student' | 'driver'
          full_name?: string
          phone?: string | null
          university?: string | null
          department?: string | null
          student_id?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      driver_profiles: {
        Row: {
          id: string
          user_id: string
          license_number: string
          vehicle_make: string
          vehicle_model: string
          vehicle_year: number
          vehicle_plate: string
          vehicle_color: string
          vehicle_capacity: number
          is_approved: boolean
          rating: number
          total_trips: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          license_number: string
          vehicle_make: string
          vehicle_model: string
          vehicle_year: number
          vehicle_plate: string
          vehicle_color: string
          vehicle_capacity: number
          is_approved?: boolean
          rating?: number
          total_trips?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          license_number?: string
          vehicle_make?: string
          vehicle_model?: string
          vehicle_year?: number
          vehicle_plate?: string
          vehicle_color?: string
          vehicle_capacity?: number
          is_approved?: boolean
          rating?: number
          total_trips?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
