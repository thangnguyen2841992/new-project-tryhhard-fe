import { Client } from "@stomp/stompjs";
import React, {ChangeEvent, useState} from "react";
import {getUserToken} from "../../api/PublicApi";
import Account from "../../model/Account";

interface ChatInterface {
    toAccountId : number;
    toAccountFullName : string;
    toAccountAvatar:string;
     client:Client;
}
const ChatProps: React.FC<ChatInterface> = ({ toAccountId,toAccountAvatar,toAccountFullName, client}) => {
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
                messageChat: messageChat

            })
            client.publish({
                destination: '/app/chat',
                body: messageSend
            });
            setMessageChat('');
        }
    }
    return (
        <div className={'chat-box'}>
                <div className="chat-box-header" style={{height : '50px', borderBottom : '1px solid #e5e5e5'}}>
                    CHAT BOX
                </div>
                 <div className="list-chat-box" style={{height : '300px'}}>
                     
                 </div>
                   <div className="chat-text-input" style={{borderTop : '1px solid #e5e5e5', height : '50px'}}>
                       <input onKeyDown={handleKeyDown} type="text" placeholder={'Nói chuyện nào... '} style={{border : 'none', outline : 'none', padding: '10px', width:'100%'}}/>
                   </div> 
        </div>
    )
}
export default ChatProps