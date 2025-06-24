class Notification {
    notificationId ?: number;
    formAccountId ?: number;
    toAccountId ?: number;
    isRead ?: boolean;
    dateCreated ?: Date;
    content ?: string;


    constructor(notificationId: number, formAccountId: number, toAccountId: number, isRead: boolean, dateCreated: Date, content: string) {
        this.notificationId = notificationId;
        this.formAccountId = formAccountId;
        this.toAccountId = toAccountId;
        this.isRead = isRead;
        this.dateCreated = dateCreated;
        this.content = content;
    }
}

export default Notification