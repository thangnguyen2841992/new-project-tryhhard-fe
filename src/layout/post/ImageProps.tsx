import React from "react";
import Image from "../../model/Image";
import Post from "../../model/Post";

interface ImagesInterface {
    post : Post;
}

// @ts-ignore
const ImageProps: React.FC<ImagesInterface> = ({post}) => {


    const handleSetPostId = (e: React.FormEvent, image:Image) => {
        e.preventDefault();
    }

    // @ts-ignore
    if (post.imageList.length === 4 || post.imageList.length === 2) {
        return (
            // @ts-ignore
            post.imageList.map((image) => (
                <div key={image} className="post-detail-image-item">
        <img style={{cursor : 'pointer'}} src={image} alt="image"/>
        </div>
    ))
    )
        // @ts-ignore
    } else if (post.imageList.length === 1) {
        return (
            // @ts-ignore
            <div key={post.imageList[0]} className="post-detail-image-item-one">
                {/*// @ts-ignore*/}
        <img style={{cursor : 'pointer'}} src={post.imageList[0]} alt=""/>
        </div>
    )
        // @ts-ignore
    } else if (post.imageList.length === 3) {
        return (
            // @ts-ignore
            post.imageList.map((image) => (
                <div key={image} className="post-detail-image-item-three">
        <img style={{cursor : 'pointer'}} src={image} alt=""/>
        </div>
    ))
    )
        // @ts-ignore
    } else if (post.imageList.length >= 5) {
        return (
            <div>
                <div className={'d-flex'}>
            <div className="post-detail-image-item-three-top">
                {/*// @ts-ignore*/}
            <img style={{cursor : 'pointer'}} src={post.imageList[0].imageData} alt="" onClick={(e: React.FormEvent) => handleSetPostId(e, imageList[0])}/>
        </div>
        <div className="post-detail-image-item-three-top">
            {/*// @ts-ignore*/}
        <img style={{cursor : 'pointer'}} src={post.imageList[1]} alt="" onClick={(e: React.FormEvent) => handleSetPostId(e, imageList[1])}/>
        </div>
        <div className="post-detail-image-item-three-top">
            {/*// @ts-ignore*/}
        <img style={{cursor : 'pointer'}} src={post.imageList[2]} alt="" onClick={(e: React.FormEvent) => handleSetPostId(e, imageList[2])}/>
        </div>
        </div>
        <div className={'d-flex'} style={{position : 'relative'}}>
        <div className="post-detail-image-item-three-bottom">
            {/*// @ts-ignore*/}
        <img style={{cursor : 'pointer'}} src={post.imageList[3]} alt="" onClick={(e: React.FormEvent) => handleSetPostId(e, imageList[3])}/>
        </div>
        <div className="post-detail-image-item-three-bottom">
            {/*// @ts-ignore*/}
        <img style={{cursor : 'pointer'}} src={post.imageList[4]} alt="" onClick={(e: React.FormEvent) => handleSetPostId(e, imageList[4])}/>
            {/*// @ts-ignore*/}
            <div style={{cursor : 'pointer'}} hidden={post.imageList.length <= 5} onClick={(e: React.FormEvent) => handleSetPostId(e, imageList[4])} className="image-overlay"></div>
            </div>
            {/*// @ts-ignore*/}
            <div  hidden={post.imageList.length < 6} className="more-images-count" style={{
            position : 'absolute',
                left: '75%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                color : '#000',
                fontSize : '40px',
                background : '#e5e5e5',
                borderRadius : '50%',
                padding : '0 10px',
                cursor : 'pointer'
        }}>
                {/*// @ts-ignore*/}
        +{post.imageList.length - 5}
        </div>
        </div>
        </div>
    )
    }
}
export default ImageProps;