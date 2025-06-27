import {Client} from "@stomp/stompjs";
import React, {ChangeEvent, useState} from "react";
import {getUserToken} from "../../api/PublicApi";
import Account from "../../model/Account";
import ChatRequest from "../../model/ChatRequest";
import CalculateTime from "./CalculateTime";

interface ChatInterface {
    toAccountId: number;
    toAccountFullName: string;
    toAccountAvatar: string;
    client: Client;
    chats: ChatRequest[];
    showChat: boolean;
    setShowChat: (show: boolean) => void;
}

const ChatProps: React.FC<ChatInterface> = ({
                                                toAccountId,
                                                toAccountAvatar,
                                                toAccountFullName,
                                                client,
                                                chats,
                                                showChat,
                                                setShowChat
                                            }) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Gọi hàm khi nhấn Enter
            handleCreateChat();
        }
    };
    const [messageChat, setMessageChat] = useState<string>('');
  

    const handleChangeMessageChat = (e: ChangeEvent<HTMLInputElement>) => {
        setMessageChat(e.target.value);
    }
    const handleCreateChat = () => {
        if (client) {
            let messageSend = JSON.stringify({

                formUserId: getUserToken().accountId,
                formUserFullName: getUserToken().fullName,
                formUserAvatar: getUserToken().avatar,
                toUserId: toAccountId,
                toUserFullName: toAccountFullName,
                toUserAvatar: toAccountAvatar,
                message: messageChat

            })
            client.publish({
                destination: '/app/chat',
                body: messageSend
            });
            setMessageChat('');
        }
    }
    return (
        <div hidden={!showChat} className={'chat-box'}>
            <div className="chat-box-header"
                 style={{height: '65px', borderBottom: '1px solid #e5e5e5', padding: '5px', display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <img src={toAccountAvatar} alt="avatar" style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginRight: '10px'
                    }}/>
                    {toAccountFullName}
                </div>
                <div  onClick={() => setShowChat(!showChat)} className={'close-chat-box'} title={'Close'}>
                    <button
                        style={{width: '40px', height: '40px', border: 'none', outline: 'none', borderRadius: '50%'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                             fill="#000000">
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>

                    </button>
                </div>

            </div>
            <div className="list-chat-box" style={{height: '300px', overflowY: 'scroll', padding: '10px', width:'100%'}}>
                {
                    chats.map((chat) => (
                        <div key={chat.chatId} className={'list-chat-box-item'}>
                            <div hidden={chat.formUserId !== getUserToken().accountId}
                                 className="list-chat-box-item-formUser">
                                <div style={{backgroundColor: '#0070f6', borderRadius: '20px', padding: '5px 10px', maxWidth:'100%', wordWrap: 'break-word'}}
                                     className={'list-chat-box-item-formUser-right'}>
                                    {chat.message}
                                </div>
                                <div style={{fontSize: '13px'}}>{chat.dateCreated}</div>
                            </div>
                            <div hidden={chat.formUserId === getUserToken().accountId}
                                 className="list-chat-box-item-toUser">
                                <div className={'list-chat-box-item-toUser-left'} style={{display: 'flex'}}>
                                    <img src={chat.formUserAvatar} alt="avatar" style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginRight: '10px'
                                    }}/>
                                    <div style={{
                                        backgroundColor: '#e5e5e5',
                                        borderRadius: '20px',
                                        padding: '5px 10px',
                                        maxWidth:'100%',
                                        wordWrap: 'break-word'
                                    }} className={'list-chat-box-item-toUser-right'}>
                                        {chat.message}
                                    </div>
                                </div>

                                <div style={{fontSize: '13px', marginLeft: '50px'}}>{chat.dateCreated}</div>

                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="chat-text-input" style={{borderTop: '1px solid #e5e5e5', height: '50px'}}>
                <input value={messageChat} onKeyDown={handleKeyDown} onChange={handleChangeMessageChat} type="text"
                       placeholder={'Nói chuyện nào... '}
                       style={{border: 'none', outline: 'none', padding: '10px', width: '100%'}}/>
            </div>
        </div>
    )
}
export default ChatProps