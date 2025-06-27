import {useEffect, useState } from "react";
import Notification from "../../model/Notification";
import Account from "../../model/Account";
import { getAccountByAccountId } from "../../api/AccountApi";
import CalculateTime from "../post/CalculateTime";
import {Client} from "@stomp/stompjs";
import {getUserToken} from "../../api/PublicApi";
interface NotificationItem {
    notification : Notification
    client : Client
    notifications : Notification[]
    setNotifications : (notifications : Notification[]) =>  void
}
const NotificationItem: React.FC<NotificationItem> = ({ notification, client, setNotifications, notifications }) => {
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


    const handleAcceptFriend = (notification : Notification) => {
        if (client) {
            let messageSend = JSON.stringify({
                formUserId : notification.formAccountId,

                toUserId : notification.toAccountId,

                isAccepted : 1,

                notificationId : notification.notificationId
            })
                client.publish({
                destination: '/app/approvalFriend',
                body: messageSend
            });
            setNotifications(notifications.filter(item => item.notificationId !== notification.notificationId));
        }
    };

    return (
        <li className={'notiftication-item'} style={{display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '10px', cursor: 'pointer'}} >
            <div className="notification-item-user" style={{marginRight : '10px'}}>
                <img style={{width : '50px', height : '50px', borderRadius : '50%', objectFit : 'cover'}} src={formUser.avatar} alt="avatar"/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className="notification-item-notification"
                     style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{fontWeight: 'bold', fontSize: '17px', cursor: 'pointer'}}>{formUser.fullName}</div>
                    <div style={{marginLeft: '8px', fontSize: '14px'}}>{notification.content}</div>
                </div>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    {/*@ts-ignore*/}
                    <CalculateTime dateCreated={notification.dateCreated}/>
                    <button onClick={() => notification !== undefined && handleAcceptFriend(notification)}
                                                hidden={notification.type !== 5} style={{fontSize : '13px', width:'100px', padding:'5px', background:'#28a745', borderRadius:'10px', margin:'0 10px'}}>Đồng ý</button>
                    <button hidden={notification.type !== 5} style={{fontSize : '13px', width:'100px', padding:'5px', background:'#dc3545', borderRadius:'10px'}}>Từ chối</button>
                </div>
            </div>
        </li>
    )
}
export default NotificationItem