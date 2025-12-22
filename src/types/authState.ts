import type {User} from "./user.ts";
import type {UserProfile} from "./userProfile.ts";

export interface AuthState {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    isAuthenticated: boolean;
}