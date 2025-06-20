class Post {
    postId ?: number;

    title ?: string;

    content ?: string;

    dateCreated ?: string;

    topicPostId ?: number;

    topicPostName ?: string;

    statusPostId ?: number;

    statusPostName ?: string;


    constructor(postId: number, title: string, content: string, dateCreated: string, topicPostId: number, topicPostName: string, statusPostId: number, statusPostName: string) {
        this.postId = postId;
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