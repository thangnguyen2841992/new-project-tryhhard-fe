import {useEffect, useState } from "react";
import Notification from "../../model/Notification";
import Account from "../../model/Account";
import { getAccountByAccountId } from "../../api/AccountApi";
import CalculateTime from "../post/CalculateTime";
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
            <div className="notification-item-user" style={{marginRight : '10px'}}>
                <img style={{width : '50px', height : '50px', borderRadius : '50%', objectFit : 'cover'}} src={formUser.avatar} alt="avatar"/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className="notification-item-notification"
                     style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{fontWeight: 'bold', fontSize: '17px', cursor: 'pointer'}}>{formUser.fullName}</div>
                    <div style={{marginLeft: '8px'}}>{notification.content}</div>
                </div>
                <div>
                    {/*@ts-ignore*/}
                    <CalculateTime dateCreated={notification.dateCreated}/>
                </div>
            </div>


        </li>
    )
}
export default NotificationItem