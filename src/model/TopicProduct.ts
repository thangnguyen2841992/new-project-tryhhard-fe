class TopicProduct {
    topicId ?: number;
    topicName ?: string;


    constructor(topicId: number, topicName: string) {
        this.topicId = topicId;
        this.topicName = topicName;
    }
}
export default TopicProduct;