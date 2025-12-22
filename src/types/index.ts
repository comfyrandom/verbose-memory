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

export interface UserProfile {
    id: string;
    name: string;
    email?: string;
}

export interface LogFilters {
    search: string;
    dateRange: {
        start: Date | null;
        end: Date | null;
    };
    action: string;
    userId: string;
}

export interface LogMetadata {
    [key: string]: any;
}

export interface LogComponentProps {
    log: UserLog;
    metadata: LogMetadata;
    isExpanded: boolean;
    onToggleExpand: () => void;
}