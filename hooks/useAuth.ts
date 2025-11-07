
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { authService, AuthUser } from '@/lib/auth'

export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const currentUser = await authService.getCurrentUser()
            setUser(currentUser)
          } catch (error) {
            console.error('Error getting user after sign in:', error)
            setUser(null)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true)
    try {
      const result = await authService.signUp(email, password, userData)
      return result
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const result = await authService.signIn(email, password)
      return result
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await authService.signOut()
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: any) => {
    if (!user) throw new Error('No user logged in')
    const result = await authService.updateProfile(user.id, updates)
    const updatedUser = await authService.getCurrentUser()
    setUser(updatedUser)
    return result
  }

  const createDriverProfile = async (driverData: any) => {
    if (!user) throw new Error('No user logged in')
    const result = await authService.createDriverProfile(user.id, driverData)
    const updatedUser = await authService.getCurrentUser()
    setUser(updatedUser)
    return result
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    createDriverProfile
  }
}
