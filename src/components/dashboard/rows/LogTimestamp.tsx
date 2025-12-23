import type {UserLog} from "../../../types/userLog.ts";

interface LogTimestampProps {
    log: UserLog
}

const LogTimestamp = ({log} : LogTimestampProps) => {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <td className="py-4 px-6">
            <div className="text-sm text-gray-300">{formatDate(log.created_at)}</div>
        </td>
    );
};

export default LogTimestamp;