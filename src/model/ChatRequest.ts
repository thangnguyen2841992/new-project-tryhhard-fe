class ChatRequest {
    chatId ?: number;
    formUserId ?: number;
    formUserFullName ?: string ;
    formUserAvatar ?: string ;
    toUserId ?: number ;
    toUserFullName ?: string ;
    toUserAvatar ?: string;
    message ?: string;
    dateCreated ?: string;


    constructor(chatId: number, formUserId: number, formUserFullName: string, formUserAvatar: string, toUserId: number, toUserFullName: string, toUserAvatar: string, message: string, dateCreated: string) {
        this.chatId = chatId;
        this.formUserId = formUserId;
        this.formUserFullName = formUserFullName;
        this.formUserAvatar = formUserAvatar;
        this.toUserId = toUserId;
        this.toUserFullName = toUserFullName;
        this.toUserAvatar = toUserAvatar;
        this.message = message;
        this.dateCreated = dateCreated;
    }
}
export default ChatRequest;