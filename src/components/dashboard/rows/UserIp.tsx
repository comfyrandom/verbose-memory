import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";

import type {UserLog} from "../../../types/userLog.ts";

interface UserIpProps {
    log: UserLog;
}

const UserIp = ({log} : UserIpProps) => {
    return (
        <td className="py-4 px-6">
            {log.ip_address ? (
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faGlobe} className="text-gray-500" />
                    <span className="font-mono text-sm">{log.ip_address}</span>
                </div>
            ) : (
                <span className="text-gray-500">N/A</span>
            )}
        </td>
    );
};

export default UserIp;