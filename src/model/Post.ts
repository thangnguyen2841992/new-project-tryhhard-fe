import CommentPost from "./CommentPost";

interface Image {
    imageList : Image[];
}

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
    imageList ?: Image[];
    totalLikes ?: number;
    comments ?: CommentPost[];


    constructor(postId: number, accountId: number, fullName: string, avatar: string, title: string, content: string, dateCreated: Date, topicPostId: number, topicPostName: string, statusPostId: number, statusPostName: string, imageList: Image[], totalLikes: number, comments: CommentPost[]) {
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
        this.imageList = imageList;
        this.totalLikes = totalLikes;
        this.comments = comments;
    }
}

export default Post;