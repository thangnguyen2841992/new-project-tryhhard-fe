class Post {
    postId ?: number;
    accountId ?: number;
    fullName ?: string;
    avatar ?: string;
    title ?: string;
    content ?: string;
    dateCreated ?: Date;
    topicPostId ?: number;
    topicPostName ?: string;
    statusPostId ?: number;
    statusPostName ?: string;


    constructor(postId: number, accountId: number, fullName: string, avatar: string, title: string, content: string, dateCreated: Date, topicPostId: number, topicPostName: string, statusPostId: number, statusPostName : string) {
        this.postId = postId;
        this.accountId = accountId;
        this.fullName = fullName;
        this.avatar = avatar;
        this.title = title;
        this.content = content;
        this.dateCreated = dateCreated;
        this.topicPostId = topicPostId;
        this.topicPostName = topicPostName;
        this.statusPostId = statusPostId;
        this.statusPostName = statusPostName;
    }
}

export default Post;