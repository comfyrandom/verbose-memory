import type {LogMetadata} from "./logMetadata.ts";

export interface UserLog {
    id: string;
    user_action: string;
    user_agent: string | null;
    ip_address: string | null;
    authenticated_id: string | null;
    metadata: LogMetadata;
    created_at: string;
    user_profiles?: {
        name: string;
    };
}