import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

interface LogDetailsButtonProps {
    isExpanded: boolean;
    setIsExpanded: (isExpanded: boolean) => void;
}

const LogDetailsButton = ({isExpanded, setIsExpanded} : LogDetailsButtonProps) => {
    return (
        <td className="py-4 px-6">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
                {isExpanded ? (
                    <>
                        <FontAwesomeIcon icon={faEyeSlash} />
                        Hide Details
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faEye} />
                        View Details
                    </>
                )}
            </button>
        </td>
    );
};

export default LogDetailsButton;