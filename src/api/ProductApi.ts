import TopicProduct from "../model/TopicProduct";
import {myRequest} from "./PublicApi";

export async function getAllTopicProduct(): Promise<TopicProduct[]> {
    const url = `http://localhost:8082/topics`;
    const response = await myRequest(url);
    const responseData = response._embedded.topicPosts;

    let topicList: TopicProduct[] = [];
    for (const key in responseData) {
        topicList.push(
            {
                topicId: responseData[key].topicPostId,
                topicName: responseData[key].name,
            }
        )
    }

    return topicList;
}