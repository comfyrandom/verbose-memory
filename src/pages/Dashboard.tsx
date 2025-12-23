import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css";
import {supabase} from "../libs/supabase.ts";
import Stats from "../components/dashboard/Stats.tsx";
import Filters from "../components/dashboard/Filters.tsx";
import LogRow from "../components/dashboard/LogRow.tsx";
import type {UserLog} from "../types/userLog.ts";
import type {LogFilters} from "../types/logFilters.ts";

const ITEMS_PER_PAGE = 25;

const Dashboard: React.FC = () => {
    const [logs, setLogs] = useState<UserLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState<LogFilters>({
        search: '',
        dateRange: { start: null, end: null },
        action: '',
        userId: ''
    });

    useEffect(() => {
        setCurrentPage(1);
        fetchLogs(1);
    }, [filters]);

    const fetchLogs = async (page: number) => {
        setLoading(true);
        try {
            // First, get the total count
            let countQuery = supabase
                .from('user_logs')
                .select('*', { count: 'exact', head: false });

            if (filters.search) {
                countQuery = countQuery.or(`user_action.ilike.%${filters.search}%,metadata.ilike.%${filters.search}%`);
            }

            if (filters.action) {
                countQuery = countQuery.eq('user_action', filters.action);
            }

            if (filters.userId) {
                countQuery = countQuery.eq('authenticated_id', filters.userId);
            }

            if (filters.dateRange.start) {
                countQuery = countQuery.gte('created_at', filters.dateRange.start.toISOString());
            }

            if (filters.dateRange.end) {
                countQuery = countQuery.lte('created_at', filters.dateRange.end.toISOString());
            }

            const { count, error: countError } = await countQuery;
            if (countError) throw countError;

            const totalItems = count || 0;
            setTotalCount(totalItems);
            setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));

            // Calculate pagination range
            const from = (page - 1) * ITEMS_PER_PAGE;
            const to = from + ITEMS_PER_PAGE - 1;

            // Then fetch the paginated data
            let query = supabase
                .from('user_logs')
                .select(`
                  *,
                  user_profiles (
                    name
                  )
                `)
                .order('created_at', { ascending: false })
                .range(from, to);

            if (filters.search) {
                query = query.or(`user_action.ilike.%${filters.search}%,metadata.ilike.%${filters.search}%`);
            }

            if (filters.action) {
                query = query.eq('user_action', filters.action);
            }

            if (filters.userId) {
                query = query.eq('authenticated_id', filters.userId);
            }

            if (filters.dateRange.start) {
                query = query.gte('created_at', filters.dateRange.start.toISOString());
            }

            if (filters.dateRange.end) {
                query = query.lte('created_at', filters.dateRange.end.toISOString());
            }

            const { data, error } = await query;

            if (error) throw error;
            setLogs(data || []);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        fetchLogs(page);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const exportLogs = () => {
        const exportAllLogs = async () => {
            try {
                let query = supabase
                    .from('user_logs')
                    .select(`
                      *,
                      user_profiles (
                        name
                      )
                    `)
                    .order('created_at', { ascending: false });

                if (filters.search) {
                    query = query.or(`user_action.ilike.%${filters.search}%,metadata.ilike.%${filters.search}%`);
                }

                if (filters.action) {
                    query = query.eq('user_action', filters.action);
                }

                if (filters.userId) {
                    query = query.eq('authenticated_id', filters.userId);
                }

                if (filters.dateRange.start) {
                    query = query.gte('created_at', filters.dateRange.start.toISOString());
                }

                if (filters.dateRange.end) {
                    query = query.lte('created_at', filters.dateRange.end.toISOString());
                }

                const { data, error } = await query;

                if (error) throw error;

                const csvContent = [
                    ['ID', 'Action', 'User', 'IP Address', 'User Agent', 'Timestamp', 'Metadata'],
                    ...(data || []).map(log => [
                        log.id,
                        log.user_action,
                        log.user_profiles?.name || 'Unknown',
                        log.ip_address || 'N/A',
                        log.user_agent?.substring(0, 50) || 'N/A',
                        formatDate(log.created_at),
                        JSON.stringify(log.metadata)
                    ])
                ].map(row => row.join(',')).join('\n');

                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `debug-logs-${new Date().toISOString()}.csv`;
                a.click();
            } catch (error) {
                console.error('Error exporting logs:', error);
            }
        };

        exportAllLogs();
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6">

            <Stats />
            <Filters fetchLogs={() => fetchLogs(currentPage)} exportLogs={exportLogs} filters={filters} setFilters={setFilters} />

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mt-6">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Recent Logs</h2>
                        <p className="text-gray-400 text-xs">
                            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} logs
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-3 text-gray-400 text-sm">Loading logs...</p>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="p-8 text-center">
                        <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500 text-3xl mb-3" />
                        <p className="text-gray-400 text-sm">No logs found matching your criteria</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-900">
                            <tr>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IP</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                                <th className="py-2 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Details</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                            {logs.map((log) => (
                                <LogRow key={log.id} log={log} />
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {totalPages > 1 && logs.length > 0 && (
                    <div className="p-3 border-t border-gray-700 flex justify-center">
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"
                            >
                                First
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"
                            >
                                Prev
                            </button>

                            <span className="px-2 py-1 text-gray-300 text-xs">
                                {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"
                            >
                                Next
                            </button>
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"
                            >
                                Last
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;