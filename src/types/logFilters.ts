export interface LogFilters {
    search: string;
    dateRange: {
        start: Date | null;
        end: Date | null;
    };
    action: string;
    userId: string;
}