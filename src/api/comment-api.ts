import CommentPost from "../model/CommentPost";
import {myRequest} from "./PublicApi";

export async function getAllCommentOfPost(postId: number): Promise<CommentPost[]> {
    const url = `http://localhost:8082/comment-api/getAllCommentOfPost/${postId}`;
    const responseData = await myRequest(url);

    let comments: CommentPost[] = [];



    for (const key in responseData) {
        comments.push(
            {
                commentId: responseData[key].commentId,
                postId: responseData[key].postId,
                accountId: responseData[key].accountId,
                dateCreated: responseData[key].dateCreated,
                content: responseData[key].content,
            }
        )
    }

    return comments;
}