import React, { createContext, useContext, useEffect, useState } from 'react'
import type {User} from '@supabase/supabase-js';
import { AuthService } from '../services/auth'
import type {AuthState} from "../types/authState.ts";

interface AuthContextType extends AuthState {
    signUp: (email: string, password: string, fullName: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AuthService.getSession().then((session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        const { data: { subscription } } = AuthService.onAuthStateChange(
            async (_, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const signUp = async (email: string, password: string, fullName: string) => {
        setLoading(true)
        try {
            await AuthService.signUp(email, password, fullName)
        } finally {
            setLoading(false)
        }
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        try {
            await AuthService.signIn(email, password)
        } finally {
            setLoading(false)
        }
    }

    const signOut = async () => {
        setLoading(true)
        try {
            await AuthService.signOut()
        } finally {
            setLoading(false)
        }
    }

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signOut,
        profile: null
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}