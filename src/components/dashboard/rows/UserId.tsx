import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import type {UserLog} from "../../../types/userLog.ts";

interface UserIdProps {
    log: UserLog
}

const UserId = ({log} : UserIdProps) => {
    return (
        <td className="py-4 px-6">
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                <span className={log.authenticated_id ? 'text-white' : 'text-gray-500'}>
                    {log.user_profiles?.name || 'Unknown User'}
                </span>
            </div>
            {log.authenticated_id && (
                <div className="text-xs text-gray-500 mt-1 font-mono">
                    {log.authenticated_id.substring(0, 8)}...
                </div>
            )}
        </td>
    );
};

export default UserId;