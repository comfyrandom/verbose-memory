import {useState} from "react";
import UserAction from "./rows/UserAction.tsx";
import UserId from "./rows/UserId.tsx";
import UserIp from "./rows/UserIp.tsx";
import LogTimestamp from "./rows/LogTimestamp.tsx";
import LogDetailsButton from "./rows/LogDetailsButton.tsx";
import LogRowMetadata from "./rows/LogRowMetadata.tsx";
import type {UserLog} from "../../types/userLog.ts";

interface LogRowProps {
    log: UserLog;
}

const LogRow = ({ log }: LogRowProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <>
            <tr className="hover:bg-gray-750 transition-colors">
                <UserAction log={log}/>
                <UserId log={log} />
                <UserIp log={log} />
                <LogTimestamp log={log} />
                <LogDetailsButton isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            </tr>

            {isExpanded && (
                <LogRowMetadata metadata={log.metadata} log={log} />
                )}
        </>
    );
};

export default LogRow;