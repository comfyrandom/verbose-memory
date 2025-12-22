import { supabase } from './supabase'
import type {UserSubscription} from "../types/userSubscription.ts";

export function mapToUserSubscription(data: any): UserSubscription {
  return {
    title: data.subscription_tiers?.title || '',
    level: data.subscription_tiers?.level || 0,
    expiresAt: data.expires_at || undefined
  };
}

export class UserService {
  static async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          tier_id,
          expires_at,
          subscription_tiers!inner (
            level,
            title
          )
        `)
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle()

    if (error) {
      console.error('Error fetching subscription:', error)
      return null
    }

    if (!data) {
      return null
    }

    return mapToUserSubscription(data);
  }
}