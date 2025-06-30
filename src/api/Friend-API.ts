import Friend from "../model/Friend";
import {getUserToken, myRequest} from "./PublicApi";

export async function checkStatusFriend(formUserId: number): Promise<Friend> {
    const url = `http://localhost:8082/friend-api/checkStatusFriend?formUserId=${formUserId}&toUserId=${getUserToken().accountId}`;
    const response = await myRequest(url);

    let friend: Friend = {};

    friend = {

        friendId : response.friendId,
        formUserId : response.formUserId,
        toUserId : response.toUserId,
        dateCreated : response.dateCreated,
        dateApproved : response.dateApproved,
        isApproved : response.approved,
    }
    return friend;
}