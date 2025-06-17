import TopicProduct from "../model/TopicProduct";
import {myRequest} from "./PublicApi";

export async function getAllTopicProduct(): Promise<TopicProduct[]> {
    const url = `http://localhost:8082/topic/getAll`;
    const response = await myRequest(url);

    let topicList: TopicProduct[] = [];
    for (const key in response) {
        topicList.push(
            {
                topicId: response[key].topicPostId,
                topicName: response[key].name,
            }
        )
    }

    return topicList;
}