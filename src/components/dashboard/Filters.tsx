import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faSearch, faSync} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import {supabase} from "../../libs/supabase.ts";
import {useEffect, useState} from "react";
import type {LogFilters} from "../../types/logFilters.ts";

interface FiltersProps {
    fetchLogs: () => Promise<void>;
    exportLogs: () => void;
    filters: LogFilters;
    setFilters: (filters: LogFilters) => void;
}

interface UserProfile {
    id: string;
    name: string;
}

const Filters = ({fetchLogs, exportLogs, filters, setFilters}: FiltersProps) => {
    const [actions, setActions] = useState<string[]>([]);
    const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);

    useEffect(() => {
        const loadActions = async () => {
            const { data, error } = await supabase.rpc("get_distinct_actions");

            if (!error && data) {
                setActions(data);
            }
        };

        const loadUserProfiles = async () => {
            setLoadingUsers(true);
            const { data, error } = await supabase
                .from('user_profiles')
                .select('id, name')
                .order('name', { ascending: true });

            if (!error && data) {
                setUserProfiles(data);
            }
            setLoadingUsers(false);
        };

        loadActions();
        loadUserProfiles();
    }, []);

    return (
        <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Filters</h2>
                <div className="flex gap-3">
                    <button
                        onClick={fetchLogs}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faSync} />
                        Refresh
                    </button>
                    <button
                        onClick={exportLogs}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faDownload} />
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Search</label>
                    <div className="relative">
                        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => setFilters({...filters, search: e.target.value})}
                            placeholder="Search logs..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Date Range</label>
                    <div className="flex gap-2">
                        <DatePicker
                            selected={filters.dateRange.start}
                            onChange={(date) => setFilters({...filters, dateRange: {...filters.dateRange, start: date}})}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholderText="Start Date"
                            dateFormat="MMM dd, yyyy"
                        />
                        <DatePicker
                            selected={filters.dateRange.end}
                            onChange={(date) => setFilters({...filters, dateRange: {...filters.dateRange, end: date}})}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholderText="End Date"
                            dateFormat="MMM dd, yyyy"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Action Type</label>
                    <select
                        value={filters.action}
                        onChange={(e) => setFilters({...filters, action: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">All Actions</option>
                        {actions.map((a) => (
                            <option key={a} value={a}>
                                {a}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">User</label>
                    <select
                        value={filters.userId}
                        onChange={(e) => setFilters({...filters, userId: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={loadingUsers}
                    >
                        <option value="">All Users</option>
                        {loadingUsers ? (
                            <option value="" disabled>Loading users...</option>
                        ) : (
                            userProfiles.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.id})
                                </option>
                            ))
                        )}
                    </select>
                    {loadingUsers && (
                        <p className="text-xs text-gray-400 mt-1">Loading user list...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filters;