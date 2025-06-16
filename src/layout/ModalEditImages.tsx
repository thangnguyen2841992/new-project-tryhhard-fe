import React, {ChangeEvent} from "react";
import {Modal} from "react-bootstrap";
import Image from "../model/Image";


function ModalEditImages(props: any) {
    const handleCloseEditImagesModal = (e: React.FormEvent) => {
        e.preventDefault();
        props.setIsShowEditImageModal(false);
    }
    const handleClickAddImage = (e: React.FormEvent) => {
        e.preventDefault();
        if (props.click.current) {
            props.click.current.click();
        }
    }
    const deleteImage = (e: React.FormEvent, index: number) => {
        e.preventDefault();
        const updatedImages = [...props.images];
        updatedImages.splice(index, 1);
        props.setImages(updatedImages);
    };

    const handleSetDescription = (description:string, index:number) => {
        const updatedImages = [...props.images];
        if (updatedImages[index]) {
            updatedImages[index].description = description;
            props.setImages(updatedImages);
        }
    }

    return (
        <div>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <button onClick={handleCloseEditImagesModal}
                                style={{
                                    borderRadius: '50%',
                                    fontSize: '20px',
                                    padding: '5px 10px'
                                }} className={'btn btn-secondary'}><i className='bx bx-left-arrow-alt'></i></button>
                        <strong className={'text-center'} style={{marginLeft: '400px'}}>Chỉnh sửa ảnh</strong>


                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-edit-image-wrapper"
                         style={{
                             height: '500px',
                             overflow: 'scroll',
                             display: "flex",
                             flexWrap: 'wrap',
                             background: '#f2f2f2',

                         }}>
                        {
                            props.images.map((image: Image, index: number) => (
                                <div className="modal-edit-image-item"
                                     style={{
                                         width: '33.3%',
                                         padding: '5px',
                                         height: '400px',
                                         position: 'relative'
                                     }}>
                                    <img src={image.imageData} alt="image"
                                         style={{
                                             width: '100%',
                                             height: '270px',
                                             marginBottom: '10px',
                                             borderRadius: '10px',
                                             border: '5px solid #fff',
                                             background: '#fff'
                                         }}/>
                                    <button className={'btn btn-light'} style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                            onClick={(e: React.FormEvent) => deleteImage(e,index)}
                                    ><span className={'fs-5'}><i className='bx bx-x'></i></span></button>
                                    <div className="image-description"
                                         style={{
                                             width: '100%',
                                             height: '90px',
                                             background: '#fff',
                                             padding: '10px',
                                             borderRadius: '10px'
                                         }}>
                                        <input style={{
                                            width: '100%',
                                            height: '70px',
                                            padding: '20px',
                                            fontSize: '18px',
                                            border: '1px solid #e5e5e5',
                                            outline: 'none',
                                            borderRadius: '10px'
                                        }} type="text" placeholder={'Chú thích'}
                                               value={image.description}
                                               onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetDescription(e.target.value, index)}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <div className="button-modal-edit-wrapper">
                        <button onClick={handleClickAddImage} className={'btn text-primary fs-6'}><i
                            className='bx bx-images'></i> Thêm ảnh
                        </button>
                        <button onClick={handleCloseEditImagesModal}   className={'btn btn-primary fs-6'}>Xong</button>
                    </div>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default ModalEditImages