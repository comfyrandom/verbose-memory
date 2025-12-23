import type {UserLog} from "./userLog.ts";
import type {LogMetadata} from "./logMetadata.ts";

export interface LogComponentProps {
    log: UserLog;
    metadata: LogMetadata;
    isExpanded: boolean;
    onToggleExpand: () => void;
}