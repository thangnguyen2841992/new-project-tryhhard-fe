import Post from "../model/Post";
import {getUserToken, myRequest} from "./PublicApi";

export async function getAllPostOfUser(accountId : number): Promise<Post[]> {
    const url = `http://localhost:8082/post-api/getAllPostsOfUser/${accountId}`;
    const responseData = await myRequest(url);

    let postList: Post[] = [];
    for (const key in responseData) {
        postList.push(
            {
                postId: responseData[key].postId,
                title: responseData[key].title,
                content: responseData[key].content,
                dateCreated: responseData[key].dateCreated,
                topicPostId: responseData[key].topicPostId,
                topicPostName: responseData[key].topicPostName,
                statusPostId: responseData[key].statusPostId,
                statusPostName: responseData[key].statusPostName,
                fullName: responseData[key].fullName,
                avatar: responseData[key].avatar,
                imageList: responseData[key].images,
                totalLikes: responseData[key].totalLikes,
            }
        )
    }

    return postList;
}

export async function getAllPostOfOtherUser(): Promise<Post[]> {
    const url = `http://localhost:8082/post-api/getAllPostsOfOtherUser/${getUserToken().accountId}`;
    const responseData = await myRequest(url);

    let postList: Post[] = [];
    for (const key in responseData) {
        postList.push(
            {
                postId: responseData[key].postId,
                title: responseData[key].title,
                content: responseData[key].content,
                dateCreated: responseData[key].dateCreated,
                topicPostId: responseData[key].topicPostId,
                topicPostName: responseData[key].topicPostName,
                statusPostId: responseData[key].statusPostId,
                statusPostName: responseData[key].statusPostName,
                fullName: responseData[key].fullName,
                avatar: responseData[key].avatar,
                imageList: responseData[key].images,
                totalLikes: responseData[key].totalLikes,
            }
        )
    }

    return postList;
}