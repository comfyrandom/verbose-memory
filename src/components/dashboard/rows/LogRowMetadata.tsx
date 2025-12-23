import {useEffect, useState} from 'react';
import { getPostTitle } from '../../../services/metadataService.ts';
import type {UserLog} from "../../../types/userLog.ts";
import type {LogMetadata} from "../../../types/logMetadata.ts";

interface LogRowMetadataProps {
    metadata: LogMetadata;
    log: UserLog;
}

const LogRowMetadata = ({metadata, log}: LogRowMetadataProps) => {
    const [postTitle, setPostTitle] = useState<string | null>(null);
    const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);

    useEffect(() => {
        const fetchPostTitle = async () => {

            if (!metadata || !metadata.post_id)
                return;

            setIsLoadingPost(true);

            try {
                const title = await getPostTitle(metadata.post_id);
                setPostTitle(title || null);
            } catch (error) {
                console.error("Error fetching post:", error);
                setPostTitle(null);
            } finally {
                setIsLoadingPost(false);
            }
        };

        fetchPostTitle();
    }, [metadata]);

    const parseUserAgent = (userAgent: string | null) => {
        if (!userAgent) return null;

        const ua = userAgent.toLowerCase();
        let browser = "Unknown";
        let os = "Unknown";

        if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
        else if (ua.includes("firefox")) browser = "Firefox";
        else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
        else if (ua.includes("edg")) browser = "Edge";
        else if (ua.includes("opera")) browser = "Opera";

        if (ua.includes("windows")) os = "Windows";
        else if (ua.includes("ios") || ua.includes("iphone")) os = "iOS";
        else if (ua.includes("android")) os = "Android";
        else if (ua.includes("mac")) os = "macOS";
        else if (ua.includes("linux")) os = "Linux";

        return { browser, os };
    };

    const userAgentInfo = parseUserAgent(log.user_agent);

    return (
        <tr className="bg-gray-900">
            <td colSpan={5} className="p-2">
                <div className="bg-gray-950 rounded border border-gray-800 overflow-hidden">
                    <div className="px-3 py-2 bg-gray-900 border-b border-gray-800">
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                            {log.ip_address && (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-gray-500">IP:</span>
                                    <span className="font-mono text-gray-300">{log.ip_address}</span>
                                </div>
                            )}
                            {userAgentInfo && (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-gray-500">Browser:</span>
                                    <span className="text-gray-300">{userAgentInfo.browser}</span>
                                </div>
                            )}
                            {userAgentInfo && (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-gray-500">OS:</span>
                                    <span className="text-gray-300">{userAgentInfo.os}</span>
                                </div>
                            )}
                            {metadata?.post_id && (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-gray-500">Post ID:</span>
                                    <span className="font-mono text-gray-300">{metadata.post_id}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-3 space-y-3">
                        {log.user_agent && (
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-gray-400">User Agent</span>
                                    {userAgentInfo && (
                                        <span className="text-xs text-gray-500">
                                            {userAgentInfo.browser} • {userAgentInfo.os}
                                        </span>
                                    )}
                                </div>
                                <div className="bg-gray-900 p-2 rounded text-xs font-mono text-gray-300 overflow-x-auto whitespace-nowrap">
                                    {log.user_agent}
                                </div>
                            </div>
                        )}

                        {metadata?.post_id && (
                            <div className="space-y-1.5">
                                <span className="text-xs font-medium text-gray-400">Post Information</span>
                                <div className="bg-gray-900 p-2 rounded">
                                    {isLoadingPost ? (
                                        <div className="text-xs text-gray-500 animate-pulse">Loading title...</div>
                                    ) : postTitle ? (
                                        <div className="text-xs text-white">{postTitle}</div>
                                    ) : (
                                        <div className="text-xs text-gray-500">No title available</div>
                                    )}
                                    <div className="text-xs text-gray-500 mt-1">ID: {metadata.post_id}</div>
                                </div>
                            </div>
                        )}

                        {metadata && (
                            <div className="space-y-1.5">
                                <details className="group">
                                    <summary className="cursor-pointer text-xs font-medium text-gray-400 hover:text-gray-300">
                                        Raw Metadata
                                        <span className="inline-block ml-1 text-gray-500 group-open:hidden">[...]</span>
                                    </summary>
                                    <div className="mt-1.5">
                                        <pre className="text-xs bg-gray-900 p-2 rounded overflow-x-auto text-gray-300">
                                            {JSON.stringify(metadata, null, 2)}
                                        </pre>
                                    </div>
                                </details>
                            </div>
                        )}
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default LogRowMetadata;