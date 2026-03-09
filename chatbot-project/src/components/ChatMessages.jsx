import {useEffect, useRef} from "react";
import {ChatMessage} from "./ChatMessage";
import './ChatMessage.css';
import './ChatMessages.css'
function ChatMessages({chatMessages}) {

    function useAutoScroll(dependencies) {
        const containerRef = useRef(null); //возьмет div элемент внизу и сохранит его в эту переменную (т.е. как DOM querySelector сохраняем элемкент HTML в переменную)

        useEffect(()=>{
            const containerElem = containerRef.current;
            containerElem && (containerElem.scrollTop = containerElem.scrollHeight);

        }, [dependencies]);
        return containerRef;
    }

    const chatMessagesRef = useAutoScroll([chatMessages]);

    return (
        <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((chatMessage)=> {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                        time={chatMessage.time}
                    />
                );
            })} </div>)
}

export default ChatMessages;