class ReplyComment {

    replyId ?: number;

    commentId ?: number;

    postId ?: number;

    accountId ?: number;

    content ?: string;

    dateCreated ?: Date;

    fullName ?: string;

    avatar ?: string;


    constructor(replyId: number, commentId: number, postId: number, accountId: number, content: string, dateCreated: Date, fullName: string, avatar: string) {
        this.replyId = replyId;
        this.commentId = commentId;
        this.postId = postId;
        this.accountId = accountId;
        this.content = content;
        this.dateCreated = dateCreated;
        this.fullName = fullName;
        this.avatar = avatar;
    }
}
export default ReplyComment