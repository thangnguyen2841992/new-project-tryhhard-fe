import {type} from "node:os";

class Notification {
    notificationId ?: number;
    formAccountId ?: number;
    toAccountId ?: number;
    isRead ?: boolean;
    dateCreated ?: Date;
    content ?: string;
    type ?: number;


    constructor(notificationId: number, formAccountId: number, toAccountId: number, isRead: boolean, dateCreated: Date, content: string, type: number) {
        this.notificationId = notificationId;
        this.formAccountId = formAccountId;
        this.toAccountId = toAccountId;
        this.isRead = isRead;
        this.dateCreated = dateCreated;
        this.content = content;
        this.type = type;
    }
}

export default Notification