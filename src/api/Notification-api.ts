import Notification from "../model/Notification";
import {getUserToken, myRequest} from "./PublicApi";

export async function getAllNotificationUnreadOfUser(): Promise<Notification[]> {
    const url = `http://localhost:8082/notification-api/getAllNotificationUnreadOfUser/${getUserToken().accountId}`;
    const responseData = await myRequest(url);

    let notifications: Notification[] = [];


    for (const key in responseData) {
        notifications.push(
            {
                notificationId: responseData[key].notificationId,
                formAccountId: responseData[key].formAccountId,
                toAccountId: responseData[key].toAccountId,
                isRead: responseData[key].isRead,
                dateCreated: responseData[key].dateCreated,
                content: responseData[key].content,
                type : responseData[key].type
            }
        )
    }

    return notifications;
}