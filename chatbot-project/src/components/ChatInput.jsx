import './ChatInput.css'
import { Chatbot } from 'supersimpledev'
import {useState} from "react";
import LoadingImage from '../assets/loading-spinner.gif';
import dayjs from "dayjs";

export function ChatInput({chatMessages, setChatMessages}) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    function saveInputText(event) {
        setInputText(event.target.value);
    }
    async function sendMessage() { //await должен быть в async-функции
        if (isLoading) return;
        if (inputText === '') return;
        setInputText('');
        setIsLoading(true);
        const timeNow = dayjs().format('h:mma');


        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender:'user',
                id: crypto.randomUUID(),
                time: timeNow
            }
        ]

        setChatMessages(newChatMessages);


        setChatMessages([
            ...newChatMessages,
            {
                message: <img className="loading-img" src={LoadingImage} />,
                sender:'robot',
                id: crypto.randomUUID(),
                time: timeNow
            }

        ]);

        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender:'robot',
                id: crypto.randomUUID(),
                time: timeNow
            }
        ])
        setIsLoading(false);



    }
    const clearMessages = () => {
        setChatMessages([]);
        localStorage.clear();
    }
    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                onKeyDown={(event)=>{
                    (event.key === 'Enter') ? sendMessage() : (event.key==='Escape' && setInputText(''));
                }}
                className="chat-input"
            />
            <button
                onClick={sendMessage}
                className="send-button"
            >Send</button>
            <button className="clear-button"
            onClick={clearMessages}
            >Clear</button>
        </div>
    );
}
