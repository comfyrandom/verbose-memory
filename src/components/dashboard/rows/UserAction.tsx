import type {LogMetadata, UserLog} from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faNewspaper,
    faLightbulb,
    faCalendarAlt,
    faReceipt,
    faInfoCircle,
    faSignInAlt,
    faUserPlus,
    faBirthdayCake,
    faHome
} from "@fortawesome/free-solid-svg-icons";

interface UserActionProps {
    log: UserLog;
}

const UserAction = ({ log }: UserActionProps) => {
    const getActionIcon = (action: string, page?: string) => {
        const actionLower = action.toLowerCase();
        const pageLower = page?.toLowerCase() || "";

        if (pageLower.includes('posts_list') || pageLower.includes('story')) {
            return <FontAwesomeIcon icon={faNewspaper} className="text-blue-400" />;
        }
        if (pageLower.includes('idea')) {
            return <FontAwesomeIcon icon={faLightbulb} className="text-yellow-400" />;
        }
        if (pageLower.includes('schedule')) {
            return <FontAwesomeIcon icon={faCalendarAlt} className="text-green-400" />;
        }
        if (pageLower.includes('subscriptions')) {
            return <FontAwesomeIcon icon={faReceipt} className="text-purple-400" />;
        }
        if (pageLower.includes('about')) {
            return <FontAwesomeIcon icon={faInfoCircle} className="text-cyan-400" />;
        }
        if (pageLower.includes('login')) {
            return <FontAwesomeIcon icon={faSignInAlt} className="text-green-400" />;
        }
        if (pageLower.includes('register')) {
            return <FontAwesomeIcon icon={faUserPlus} className="text-blue-400" />;
        }

        // Action-specific icons
        if (actionLower.includes('age_verified')) {
            return <FontAwesomeIcon icon={faBirthdayCake} className="text-red-400" />;
        }
        if (actionLower.includes('login')) {
            return <FontAwesomeIcon icon={faSignInAlt} className="text-green-400" />;
        }
        if (actionLower.includes('register')) {
            return <FontAwesomeIcon icon={faUserPlus} className="text-blue-400" />;
        }
        if (actionLower.includes('page_load')) {
            return <FontAwesomeIcon icon={faHome} className="text-gray-400" />;
        }

        return <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500" />;
    };

    const getActionTitle = (action: string, metadata: LogMetadata) => {
        const actionLower = action.toLowerCase();
        const page = metadata?.page || "";

        if (actionLower.includes('page_load')) {
            if (metadata?.post_title) {
                return `Story Engagement: "${metadata.post_title}"`;
            }

            // Page-specific titles
            switch (page.toLowerCase()) {
                case 'posts_list':
                    return "Browse Stories";
                case 'idea':
                    return "Explore Ideas";
                case 'schedule':
                    return "View Schedule";
                case 'subscriptions':
                    return "Manage Subscriptions";
                case 'about':
                    return "About Page";
                case 'login':
                    return "Login Page";
                case 'register':
                    return "Registration Page";
                default:
                    return `Page View: ${page}`;
            }
        }

        if (actionLower.includes('age_verified')) {
            return "Age Verification Complete";
        }
        if (actionLower.includes('login')) {
            return "User Login";
        }
        if (actionLower.includes('register')) {
            return "New Registration";
        }

        // Format generic action names
        return action
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <td className="py-4 px-6">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                    {getActionIcon(log.user_action, log.metadata?.page)}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col">
                        <span className="font-semibold text-white text-base">
                            {getActionTitle(log.user_action, log.metadata)}
                        </span>
                    </div>
                </div>
            </div>
        </td>
    );
};

export default UserAction;