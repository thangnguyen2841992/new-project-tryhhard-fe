import React from "react";

interface ActionUserInterface {
    toUserId : number;
    toUserFullName : string;
    toUserAvatar: string;
    isShow:boolean;
}
const ActionUser : React.FC<ActionUserInterface> = ({toUserId, toUserFullName, toUserAvatar, isShow}) => {
    return (
        <div className={'action-user'}>
            <button className={'send-message-btn'}>Nhắn tin</button>
            <button className={'send-friend-btn'}>Kết Bạn</button>
        </div>
    )
}
export default ActionUser