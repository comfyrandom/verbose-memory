import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faExclamationTriangle, faInfoCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {supabase} from "../../libs/supabase.ts";

const Stats = () => {
    const [stats, setStats] = useState({
        totalLogs: 0,
        uniqueUsers: 0,
        todayLogs: 0,
        errorActions: 0
    });

    useEffect(() => {
        let isMounted = true; // optional safety guard

        const fetchStats = async () => {
            try {
                const { count: totalLogs } = await supabase
                    .from('user_logs')
                    .select('*', { count: 'exact', head: true });

                const { data: uniqueUsers } = await supabase
                    .from('user_logs')
                    .select('authenticated_id')
                    .not('authenticated_id', 'is', null);

                const uniqueUserIds = new Set(uniqueUsers?.map(log => log.authenticated_id));

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const { count: todayLogs } = await supabase
                    .from('user_logs')
                    .select('*', { count: 'exact', head: true })
                    .gte('created_at', today.toISOString());

                const { count: errorActions } = await supabase
                    .from('user_logs')
                    .select('*', { count: 'exact', head: true })
                    .ilike('user_action', '%error%');

                if (isMounted) {
                    setStats({
                        totalLogs: totalLogs || 0,
                        uniqueUsers: uniqueUserIds.size,
                        todayLogs: todayLogs || 0,
                        errorActions: errorActions || 0
                    });
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();

        return () => { isMounted = false; }; // cleanup
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Total Logs</p>
                        <p className="text-3xl font-bold text-white">{stats.totalLogs}</p>
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                        <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 text-2xl" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Unique Users</p>
                        <p className="text-3xl font-bold text-white">{stats.uniqueUsers}</p>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded-lg">
                        <FontAwesomeIcon icon={faUser} className="text-green-500 text-2xl" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Today's Logs</p>
                        <p className="text-3xl font-bold text-white">{stats.todayLogs}</p>
                    </div>
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-500 text-2xl" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Error Actions</p>
                        <p className="text-3xl font-bold text-white">{stats.errorActions}</p>
                    </div>
                    <div className="bg-red-500/20 p-3 rounded-lg">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;