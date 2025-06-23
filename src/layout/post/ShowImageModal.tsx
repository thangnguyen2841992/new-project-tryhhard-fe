import React, {useEffect, useState} from "react";
import Image from "../../model/Image";
import {Modal} from "react-bootstrap";
import {getAllImageOfPost} from "../../api/Image-api";

function ShowImageModal(props: any) {

    const [imageList, setImageList] = useState<Image[]>([]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    };

    const previousImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + imageList.length) % imageList.length);
    };

    useEffect(() => {
        getAllImageOfPost(props.postId).then((data) => {
            setImageList(data);
        }).catch((error: any) => {
            console.log(error.message)
        });
    }, [props.postId]);

    if (!imageList.length) {
        return null;
    } else {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <strong className={'text-center'}
                                style={{marginLeft: '150px'}}>Ảnh Bài Viết</strong>

                    </Modal.Title>
                </Modal.Header>

                <div>
                    <Modal.Body>
                        <div key={imageList[0].imageId} className="post-detail-image-item-one">
                            <button title={'Previous'}
                                style={{
                                    position: 'absolute',
                                    top: '45%',
                                    left: '-5px',
                                    border: 'none',
                                    outline: 'none',
                                    background: '#RRGGBBAA',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onClick={previousImage} disabled={imageList.length <= 1}>
                                <svg style={{marginLeft : '5px'}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px" fill="#000000">
                                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                                </svg>

                            </button>
                            <img style={{cursor: 'pointer'}} src={imageList[currentIndex].imageData} alt=""/>
                            <button title={'Next'} style={{
                                position: 'absolute',
                                top: '45%',
                                right: '-5px',
                                border: 'none',
                                outline: 'none',
                                background: '#RRGGBBAA',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }} onClick={nextImage} disabled={imageList.length <= 1}>

                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px" fill="#000000">
                                    <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                                </svg>

                            </button>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>

        )
    }

}

export default ShowImageModal