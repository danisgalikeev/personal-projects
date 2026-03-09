import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/profile-1.jpg";

export function ChatMessage({message, sender, time}) {
    // const message=props.message;
    // const sender=props.sender;
    // const {message, sender} = props;
    /*
    if (sender === 'robot') {
        return (
            <div>
                <img src="robot.png" width="50px"></img>
                {message}
            </div>
        );
    }

     */

    return (
        <div className={sender==='user' ? 'chat-message-user' : sender==='system' ? 'chat-message-system' : 'chat-message-robot'}>
            {sender === 'robot' && (
                <img src={RobotProfileImage} className="chat-message-profile" />
            )}

            <div className={
                sender==='system' ? 'chat-message-system' : 'chat-message-text'
            }>{message}
                <p className="chat-message-time">{time}</p>
            </div>

            {sender === 'user' && (
                <img src={UserProfileImage} className="chat-message-profile"/>
            )}
        </div>
    );
}
