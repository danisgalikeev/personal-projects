import {useEffect, useState} from 'react'
import {ChatInput} from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import './App.css'
import {Chatbot} from "supersimpledev";







    function App() {



        //map проходится по каждому элементу массива и конвертирует его в новый элемент
        const [chatMessages, setChatMessages] = useState(() => {
            const saved = JSON.parse(localStorage.getItem('messages'));

            if (saved && Array.isArray(saved)) {
                return saved;
            }

            return [{
                message: 'Welcome to the chatbot project! Send a message using the textbox below.',
                sender: 'system',
                id: crypto.randomUUID(),
                time: ''
            }];
        });



        useEffect(() => {
            localStorage.setItem('messages', JSON.stringify(chatMessages));
        },[chatMessages])


        //const [chatMessages, setChatMessages] = array;
        //const chatMessages = array[0];
        //const setChatMessages = array[1];

        return (
            <div className="app-container">
                {/*используем компонент как HTML-элемент*/}

                <ChatMessages
                    chatMessages={chatMessages}
                />
                <ChatInput
                    chatMessages={chatMessages}
                    setChatMessages={setChatMessages}
                />
            </div>
        );

}

export default App
