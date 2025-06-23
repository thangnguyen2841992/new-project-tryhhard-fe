class Image {
    imageId ?: number;
    imageData ?: string;
    postId ?: number;
    dateCreated ?: Date;
    description ?: string;


    constructor(imageId: number, imageData: string, postId: number, dateCreated: Date, description: string) {
        this.imageId = imageId;
        this.imageData = imageData;
        this.postId = postId;
        this.dateCreated = dateCreated;
        this.description = description;
    }
}

export default Image