class CommentPost {
    commentId ?: number;

    postId ?: number;

    accountId ?: number;

    content ?: string;

    dateCreated ?: Date;

    fullName ?: string;

    avatar ?: string;

    totalLikeComments ?: number;


    constructor(commentId: number, postId: number, accountId: number, content: string, dateCreated: Date, fullName: string, avatar: string, totalLikeComments: number) {
        this.commentId = commentId;
        this.postId = postId;
        this.accountId = accountId;
        this.content = content;
        this.dateCreated = dateCreated;
        this.fullName = fullName;
        this.avatar = avatar;
        this.totalLikeComments = totalLikeComments;
    }
}
export default CommentPost