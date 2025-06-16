import Image from "../model/Image";
import React from "react";

interface ImageModalInterface {
    imageList: Image[];
}

// @ts-ignore
const ImageModal: React.FC<ImagesModalInterface> = ({imageList}) => {

    if (imageList.length === 4) {
        return (
            <div>
                <div className={'d-flex'}>
                    <div key={imageList[0].imageId} className="post-detail-image-item-modal">
                        <img src={imageList[0].imageData} alt=""/>
                    </div>
                    <div key={imageList[1].imageId} className="post-detail-image-item-modal">
                        <img src={imageList[1].imageData} alt=""/>
                    </div>
                </div>
                <div className={'d-flex'}>
                    <div key={imageList[2].imageId} className="post-detail-image-item-modal">
                        <img src={imageList[2].imageData} alt=""/>
                    </div>
                    <div key={imageList[3].imageId} className="post-detail-image-item-modal">
                        <img src={imageList[3].imageData} alt=""/>
                    </div>
                </div>
            </div>
        )
    } else if (imageList.length === 2) {
        return (
            <div className={'d-flex'}>
                <div key={imageList[0].imageId} className="post-detail-image-item-modal">
                    <img src={imageList[0].imageData} alt=""/>
                </div>
                <div key={imageList[1].imageId} className="post-detail-image-item-modal">
                    <img src={imageList[1].imageData} alt=""/>
                </div>
            </div>

        )
    }

    else if (imageList.length === 1) {
        return (
            <div key={imageList[0].imageId} className="post-detail-image-item-one">
                <img src={imageList[0].imageData} alt=""/>
            </div>
        )
    } else if (imageList.length === 3) {
        return (
            <div className={'d-flex'}>
                <div key={imageList[0].imageId} className="post-detail-image-item-three-modal">
                    <img src={imageList[0].imageData}/>
                </div>
                <div key={imageList[1].imageId} className="post-detail-image-item-three-modal">
                    <img src={imageList[1].imageData}/>
                </div>
                <div key={imageList[2].imageId} className="post-detail-image-item-three-modal">
                    <img src={imageList[2].imageData}/>
                </div>
            </div>

        )
    } else if (imageList.length >= 5) {
        return (
            <div>
                <div className={'d-flex'}>
                    <div className="post-detail-image-item-three-top-modal">
                        <img style={{background: '#f2f2f2'}} src={imageList[0].imageData}/>
                    </div>
                    <div className="post-detail-image-item-three-top-modal">
                        <img src={imageList[1].imageData}/>
                    </div>
                    <div className="post-detail-image-item-three-top-modal">
                        <img src={imageList[2].imageData}/>
                    </div>
                </div>
                <div className={'d-flex'} style={{position : 'relative'}}>
                    <div className="post-detail-image-item-three-bottom-modal">
                        <img src={imageList[3].imageData}/>
                    </div>
                    <div className="post-detail-image-item-three-bottom-modal">
                        <img src={imageList[4].imageData}/>
                    </div>
                    <div hidden={imageList.length < 6} className="more-images-count" style={{
                        position : 'absolute',
                        left: '75%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        color : '#000',
                        fontSize : '40px',
                        background : '#e5e5e5',
                        borderRadius : '50%',
                        padding : '0 10px'
                    }}>
                        +{imageList.length - 5}
                    </div>
                </div>
            </div>
        )
    }
}
export default ImageModal
