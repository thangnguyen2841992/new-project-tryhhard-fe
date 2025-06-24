import {useEffect, useState } from "react";
import Notification from "../../model/Notification";
import Account from "../../model/Account";
import { getAccountByAccountId } from "../../api/AccountApi";
interface NotificationItem {
    notification : Notification
}
const NotificationItem: React.FC<NotificationItem> = ({ notification }) => {
    const [formUser, setFormUser] = useState<Account>({});
    useEffect(() => {
        if (notification.formAccountId) {
            getAccountByAccountId(notification.formAccountId).then((data) => {
                setFormUser(data)
            }).catch((error) => {
                console.log(error);
            })
        }

    }, []);
    return (
        <li className={'notiftication-item'} style={{display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '10px', cursor: 'pointer'}} >
            <div className="notification-item-user">
                <img style={{width : '50px', height : '50px', borderRadius : '50%', objectFit : 'cover'}} src={formUser.avatar} alt="avatar"/>
            </div>
            <div className="notification-item-notification" style={{display : 'flex', alignItems: 'center', marginLeft:'10px'}}>
                <p style={{fontWeight : 'bold', fontSize : '17px', cursor : 'pointer'}}>{formUser.fullName}</p>
                <p style={{marginLeft : '8px'}}>{notification.content}</p>
            </div>
        </li>
    )
}
export default NotificationItem