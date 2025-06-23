import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import Image from "../../model/Image";
import {Modal} from "react-bootstrap";
import ImageModal from "../ImageModal";
import ModalEditImages from "../ModalEditImages";
import TopicProduct from "../../model/TopicProduct";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {imageDb} from "../../firebase/ConfigFireBase";
import LoadingSpinner from "../common/LoadingSpinner";
import {getUserToken} from "../../api/PublicApi";

function ShowImageModal(props: any) {
    const imageList: string[] = props.images;

    if (imageList.length === 4 || imageList.length === 2) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <strong className={'text-center'}
                                style={{marginLeft: '150px'}}>Ảnh
                            viết</strong>

                    </Modal.Title>
                </Modal.Header>

                <div>
                    <Modal.Body>
                        {
                            imageList.map((image) => (
                                <div key={image} className="post-detail-image-item">
                                    <img style={{cursor: 'pointer'}} src={image} alt="image"/>
                                </div>
                            ))
                        }
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </div>
            </Modal>
        )
    } else if (imageList.length === 1) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <strong className={'text-center'}
                                style={{marginLeft: '150px'}}>Ảnh
                            viết</strong>

                    </Modal.Title>
                </Modal.Header>

                <div>
                    <Modal.Body>
                        <div key={imageList[0]} className="post-detail-image-item-one">
                            <img style={{cursor: 'pointer'}} src={imageList[0]} alt=""/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </div>
            </Modal>

        )
    } else if (imageList.length === 3) {
        return (

            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <strong className={'text-center'}
                                style={{marginLeft: '150px'}}>Ảnh
                            viết</strong>

                    </Modal.Title>
                </Modal.Header>

                <div>
                    <Modal.Body>
                        {
                            imageList.map((image) => (
                                <div key={image} className="post-detail-image-item-three">
                                    <img style={{cursor: 'pointer'}} src={image} alt=""/>
                                </div>
                            ))
                        }
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </div>
            </Modal>

        )
    } else if (imageList.length >= 5) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <strong className={'text-center'}
                                style={{marginLeft: '150px'}}>Ảnh
                            viết</strong>

                    </Modal.Title>
                </Modal.Header>

                <div>
                    <Modal.Body>
                        <div>
                            <div className={'d-flex'}>
                                <div className="post-detail-image-item-three-top">
                                    <img style={{cursor: 'pointer'}} src={imageList[0]} alt=""/>
                                </div>
                                <div className="post-detail-image-item-three-top">
                                    <img style={{cursor: 'pointer'}} src={imageList[1]} alt=""/>
                                </div>
                                <div className="post-detail-image-item-three-top">
                                    <img style={{cursor: 'pointer'}} src={imageList[2]} alt=""/>
                                </div>
                            </div>
                            <div className={'d-flex'} style={{position: 'relative'}}>
                                <div className="post-detail-image-item-three-bottom">
                                    <img style={{cursor: 'pointer'}} src={imageList[3]} alt=""/>
                                </div>
                                <div className="post-detail-image-item-three-bottom">
                                    <img style={{cursor: 'pointer'}} src={imageList[4]} alt=""/>
                                    <div style={{cursor: 'pointer'}} hidden={imageList.length <= 5}
                                         className="image-overlay"></div>
                                </div>
                                <div hidden={imageList.length < 6} className="more-images-count" style={{
                                    position: 'absolute',
                                    left: '75%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: '#000',
                                    fontSize: '40px',
                                    background: '#e5e5e5',
                                    borderRadius: '50%',
                                    padding: '0 10px',
                                    cursor: 'pointer'
                                }}>
                                    + {imageList.length - 5}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </div>
            </Modal>

        )
    }
}

export default ShowImageModal