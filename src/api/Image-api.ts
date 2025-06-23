import Image from "../model/Image";
import {myRequest} from "./PublicApi";

export async function getAllImageOfPost(postId: number): Promise<Image[]> {
    const url = `http://localhost:8082/image-api/getAllImageOfPost/${postId}`;
    const responseData = await myRequest(url);

    let images: Image[] = [];

  

    for (const key in responseData) {
        images.push(
            {
                imageId: responseData[key].imageId,
                imageData: responseData[key].imageData,
                postId: responseData[key].postId,
                dateCreated: responseData[key].dateCreated,
                description: responseData[key].description,
            }
        )
    }

    return images;
}