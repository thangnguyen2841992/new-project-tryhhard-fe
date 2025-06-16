
class Image {
    imageId ?: number;
    imageData ?: string;
    description ?: string;
    dateCreated ?: string;
    commentId ?: number;
    replyId?: number;
    userId?: number;


    constructor(imageId: number, imageData: string, description: string, dateCreated: string, commentId: number, replyId: number, userId: number) {
        this.imageId = imageId;
        this.imageData = imageData;
        this.description = description;
        this.dateCreated = dateCreated;
        this.commentId = commentId;
        this.replyId = replyId;
        this.userId = userId;
    }
}
export default Image