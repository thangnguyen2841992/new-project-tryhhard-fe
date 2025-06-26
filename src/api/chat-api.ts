import ChatRequest from "../model/ChatRequest";
import CommentPost from "../model/CommentPost";
import {getUserToken, myRequest} from "./PublicApi";

export async function getAllChatOfUser(formUserId: number): Promise<ChatRequest[]> {
    const toUserId  = getUserToken().accountId ? getUserToken().accountId : 0;
    const url = `http://localhost:8082/chat-api/getAllChatOfUser/${formUserId}/${toUserId}`;
    const responseData = await myRequest(url);

    let chats: ChatRequest[] = [];
    for (const key in responseData) {
        chats.push(
            {
                chatId: responseData[key].chatId,
                formUserId: responseData[key].formUserId,
                formUserFullName: responseData[key].formUserFullName,
                formUserAvatar: responseData[key].formUserAvatar,
                toUserId: responseData[key].toUserId,
                toUserFullName: responseData[key].toUserFullName,
                toUserAvatar: responseData[key].toUserAvatar,
                message: responseData[key].message,
                dateCreated: responseData[key].dateCreated,
            }
        )
    }
    return chats;
}