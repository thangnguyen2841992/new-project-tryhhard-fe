import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import Image from "../../model/Image";
import {Modal} from "react-bootstrap";
import ImageModal from "../ImageModal";
import ModalEditImages from "../ModalEditImages";
import TopicProduct from "../../model/TopicProduct";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase/firebase";

function ModalCreatePost(props: any) {
    const [title, setTitle] = useState('');
    const [isUploadFull, setIsUploadFull] = useState(false);
    const [contentText, setContentText] = useState('');
    const [status, setStatus] = useState(1);
    const [imageListData, setImageListData] = useState<Image[]>([]);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [isShowStatus, setIsShowStatus] = useState(false);
    const [isShowImageForm, setIsShowImageForm] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isShowModalEditImages, setIsShowModalEditImages] = useState(false);
    const [imagesLink, setImagesLink] = useState<File[]>([]);
    const [urls, setUrls] = useState<string[]>([]);

    const handleChangeTopic = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        props.setSelectedTopicValue(value);
    };

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
    };


    const handleOpenImageClick = (e: React.FormEvent) => {
        e.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleShowImageForm = (e: React.FormEvent) => {
        e.preventDefault();
        setIsShowImageForm(true);
    }
    const handleCloseImageForm = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        setIsShowImageForm(false);
        if (imageListData.length > 0) {
            setImageListData([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset the input value to an empty string
            }
        }

    }


    const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContentText(e.target.value.trim());

    }

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(parseInt(e.target.value + ''));
    }
    const handleShowStatus = (e: React.FormEvent) => {
        e.preventDefault();
        setIsShowStatus(true);
    }

    const handleCancelShowStatus = (e: React.FormEvent) => {
        e.preventDefault();
        setIsShowStatus(false);
    }
    const handleSaveShowStatus = (e: React.FormEvent) => {
        e.preventDefault();
        setIsShowStatus(false);
    }

    const handleShowEditImagesModal = (e: React.FormEvent) => {
        e.preventDefault();
        setIsShowModalEditImages(true);
    }


    // Convert file to Base64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };

    const onImagesInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const listImageBase64: Image[] = [];
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setImagesLink(fileArray);
            // @ts-ignore
            for (let i = 0; i < files.length; i++) {
                // @ts-ignore
                listImageBase64.push({imageData: await getBase64(files[i])});
            }
        }
        // @ts-ignore
        setImageListData([...imageListData, ...listImageBase64])
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the input value to an empty string
        }
    }


    const handleUpload = async () => {
        const uploadedUrls: string[] = [];
        for (const image of imagesLink) {
            const imageRef = ref(storage, `images/${image.name}`);
            try {
                await uploadBytes(imageRef, image); // Upload file
                const downloadUrl = await getDownloadURL(imageRef); // Lấy URL
                uploadedUrls.push(downloadUrl);
                console.log('File uploaded successfully. URL:', downloadUrl);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
        setUrls(uploadedUrls);
        setIsUploadFull(true);
    };

    // @ts-ignore
    // const convertFilesToBlobs = async (files: File[]): Promise<Blob[]> => {
    //     const blobs: Blob[] = [];
    //
    //     for (const file of files) {
    //         const blob = await new Promise<Blob>((resolve) => {
    //             const reader = new FileReader();
    //             reader.onloadend = () => {
    //                 const arrayBuffer = reader.result as ArrayBuffer;
    //                 const newBlob = new Blob([arrayBuffer], {type: file.type});
    //                 resolve(newBlob);
    //             };
    //             reader.readAsArrayBuffer(file);
    //         });
    //         blobs.push(blob);
    //     }
    //     setImageListDataBlob(blobs);
    //     // return blobs;
    // };


    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "100px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [contentText]);


    const handleCreatePost = () => {
        if (imagesLink.length > 0) {
            handleUpload();
            if (isUploadFull) {
                if (props.client) {
                    let messageSend = JSON.stringify({
                        content: contentText,
                        title: title,
                        statusId: status,
                        topicPostId: props.selectedTopicValue != '' ? props.selectedTopicValue : '1',
                        imageList: urls
                    })
                    // Kiểm tra kích thước của body
                    let size = new Blob([messageSend]).size;
                    console.log(size);


                    props.client.publish({
                        destination: '/app/message',
                        body: messageSend
                    });
                }
            }
        }

    };
    // @ts-ignore
    // @ts-ignore
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton hidden={isShowStatus}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <strong className={'text-center'}
                            style={{marginLeft: '150px'}}>Tạo bài
                        viết</strong>

                </Modal.Title>
            </Modal.Header>
            <Modal.Header hidden={!isShowStatus}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <strong className={'text-center'}
                            style={{marginLeft: '90px'}}>Đối tượng
                        của bài viết</strong>
                </Modal.Title>

            </Modal.Header>
            <form onSubmit={handleCreatePost}>
                <Modal.Body>
                    <div className="create-post-modal" style={!isShowStatus ? {display: "block"} : {display: 'none'}}>
                        <div className="create-post-modal-header" style={{display: 'flex', alignItems: 'center'}}>
                            <img src={props.user.avatar} alt="avatar" style={{
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                marginRight: '10px'
                            }}/>
                            <div className="create-post-modal-header-name">
                                <h6 style={{fontWeight: '600'}}>{props.user.firstName} {props.user.lastName}</h6>
                                <button hidden={status !== 3} onClick={handleShowStatus} style={{
                                    fontSize: '13px',
                                    background: '#f2f2f2',
                                    border: 'none',
                                    outline: 'none',
                                    padding: '3px 10px',
                                    borderRadius: '5px'
                                }}><span><i className='bx bxs-lock-alt'></i></span> Chỉ mình tôi <span
                                    style={{fontSize: '9px'}}><i className='bx bxs-down-arrow'></i></span>
                                </button>

                                <button hidden={status !== 1} onClick={handleShowStatus} style={{
                                    fontSize: '13px',
                                    background: '#f2f2f2',
                                    border: 'none',
                                    outline: 'none',
                                    padding: '3px 10px',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}><span><i className='bx bx-world'></i></span><span
                                    style={{margin: '0 10px', fontSize: '13px'}}>Công khai</span> <span
                                    style={{fontSize: '9px'}}><i className='bx bxs-down-arrow'></i></span>
                                </button>

                                <button hidden={status !== 2} onClick={handleShowStatus} style={{
                                    fontSize: '13px',
                                    background: '#f2f2f2',
                                    border: 'none',
                                    outline: 'none',
                                    padding: '3px 10px',
                                    borderRadius: '5px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}><span><i className='bx bxs-user-account'></i></span><span
                                    style={{margin: '0 10px', fontSize: '13px'}}>Bạn bè</span><span
                                    style={{fontSize: '9px'}}><i className='bx bxs-down-arrow'></i></span>
                                </button>
                            </div>
                        </div>
                        <div style={isShowImageForm ? {height: '415px', overflowY: 'scroll'} : {}}>
                            <div className="create-post-modal-content">
                                <div id={'select-option-area'}>
                                    <select id={'modal-create-post-topic-select'} value={props.selectedTopicValue}
                                            onChange={handleChangeTopic}>
                                        {props.topics.map((option: TopicProduct) => (
                                            <option key={option.topicId} value={option.topicId}>
                                                {option.topicName}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="select-arrow">▼</span> {/* Mũi tên */}
                                    <button disabled style={{
                                        position: "absolute",
                                        top: '1px',
                                        left: '0',
                                        borderRadius: '20px',
                                        outline: 'none',
                                        border: 'none',
                                        padding: '10px 20px',
                                        color: '#fff',
                                        background: '#dee2e6'
                                    }}>Chủ đề
                                    </button>
                                </div>
                                <input id={'inputTitlePost'} type="text" value={title} onChange={handleChangeTitle}
                                       placeholder={'Hãy nhập tiêu đề câu hỏi của bạn.'}
                                       style={{
                                           height: '40px',
                                           width: '100%',
                                           borderRadius: '20px',
                                           border: '1px solid #dee2e6',
                                           outline: 'none',
                                           padding: '0 20px',
                                           fontSize: '15px',
                                           // background: '#f2f2f2',
                                           marginTop: '10px'
                                       }}/>
                                <textarea
                                    className={'create-post-modal-content-textarea'}
                                    onChange={handleChangeContent}
                                    ref={textareaRef}
                                    placeholder={'Bạn đang thắc mắc điều gì?'}
                                    style={{
                                        padding: '10px 20px',
                                        border: '1px solid #dee2e6',
                                        borderRadius: '20px',
                                        fontSize: '15px'
                                    }}
                                >
                                {contentText}
                            </textarea>
                            </div>
                            <div hidden={!isShowImageForm || imageListData.length > 0}
                                 className="create-post-modal-add-image" style={{
                                cursor: 'pointer',
                                background: '#e5e5e5',
                                height: '200px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                borderRadius: '10px',
                                margin: '10px 0',
                                position: 'relative'
                            }} onClick={handleOpenImageClick}>
                            <span style={{
                                padding: '10px',
                                background: '#f2f2f2',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '25px'
                            }}><i className='bx bxs-image-add'></i></span>
                                <strong>Thêm ảnh/video</strong>
                                <button hidden={!isShowImageForm} onClick={handleCloseImageForm} className={'btn'}
                                        style={{
                                            position: 'absolute',
                                            background: '#f2f2f2',
                                            borderRadius: '50%',
                                            right: '10px',
                                            top: '10px',
                                            padding: '5px',
                                            zIndex: 9999
                                        }}><span style={{fontSize: '30px', display: 'flex', alignItems: 'center'}}><i
                                    className='bx bx-x'></i> </span>
                                </button>
                            </div>

                            <div className="image-selected-create-modal" hidden={imageListData.length === 0}
                                 style={{
                                     position: "relative",
                                     border: '1px solid #e5e5e5',
                                     padding: '5px',
                                     borderRadius: '10px',
                                     width: '100%'
                                 }}>
                                <div className="imageList-modal-wrapper-detail">
                                    <ImageModal imageList={imageListData}/>
                                </div>
                                <div className="button-edit-images-wrapper" style={{
                                    position: 'absolute',
                                    left: '10px',
                                    top: '20px',
                                }}>
                                    <button onClick={handleShowEditImagesModal}
                                            style={{marginRight: '10px', border: '1px solid #e5e5e5'}}
                                            className={'btn btn-light'}><i className='bx bx-edit-alt'></i> Chỉnh sửa tất
                                        cả
                                    </button>
                                    <button style={{border: '1px solid #e5e5e5'}} onClick={handleOpenImageClick}
                                            className={'btn btn-light'}><i className='bx bx-image-add'></i> Thêm ảnh
                                    </button>
                                </div>
                                <button title={'Xóa hết ảnh'} hidden={!isShowImageForm} onClick={handleCloseImageForm}
                                        className={'btn'} style={{
                                    position: 'absolute',
                                    background: '#f2f2f2',
                                    borderRadius: '50%',
                                    right: '10px',
                                    top: '15px',
                                    padding: '5px',
                                    zIndex: 9999
                                }}><span style={{fontSize: '30px', display: 'flex', alignItems: 'center'}}><i
                                    className='bx bx-x'></i> </span>
                                </button>
                            </div>
                        </div>


                        <input type="file" multiple style={{display: 'none'}}
                               ref={fileInputRef}
                               onChange={onImagesInputChange}/>


                    </div>
                    <div className="create-post-modal-status"
                         style={isShowStatus ? {display: "block"} : {display: 'none'}}>
                        <strong>Ai có thể xem bài viết của bạn?</strong> <br/>
                        <span style={{color: '#606060', fontSize: '14px'}}>Bài viết của bạn sẽ hiển thị ở Bảng feed, trang cá nhân và kết quả tìm kiếm.</span>
                        <br/>

                        <div className="create-post-modal-status-item" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '10px',
                            padding: '5px',
                            borderRadius: '10px'
                        }}>
                            <div className="create-post-modal-status-item-label"
                                 style={{display: 'flex', alignItems: 'center'}}>
                                <div className="create-post-modal-status-item-label-icon" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                    fontSize: '30px',
                                    background: '#e5e5e5'
                                }}>
                                    <i className='bx bx-world'></i>
                                </div>
                                <div className="create-post-modal-status-item-label-text">
                                    <strong> Công khai</strong> <br/>
                                    <span style={{color: '#606060', fontSize: '14px'}}>Bất kỳ ai ở trên hoặc ngoài Facebook</span>
                                </div>
                            </div>
                            <input style={{
                                width: '20px',
                                height: '20px'
                            }} type="radio"
                                   value={1}
                                   checked={status === 1}
                                   onChange={handleStatusChange}/>
                        </div>

                        <div className="create-post-modal-status-item" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '10px',
                            padding: '5px',
                            borderRadius: '10px'
                        }}>
                            <div className="create-post-modal-status-item-label"
                                 style={{display: 'flex', alignItems: 'center'}}>
                                <div className="create-post-modal-status-item-label-icon" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                    fontSize: '30px',
                                    background: '#e5e5e5'
                                }}>
                                    <i className='bx bxs-user-account'></i>
                                </div>
                                <div className="create-post-modal-status-item-label-text">
                                    <strong>Bạn bè</strong> <br/>
                                    <span
                                        style={{color: '#606060', fontSize: '14px'}}>Bạn bè của bạn trên Facebook</span>
                                </div>
                            </div>
                            <input
                                style={{
                                    width: '20px',
                                    height: '20px'
                                }}
                                type="radio"
                                value={2}
                                checked={status === 2}
                                onChange={handleStatusChange}/>
                        </div>

                        <div className="create-post-modal-status-item" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '10px',
                            padding: '5px',
                            borderRadius: '10px'
                        }}>
                            <div className="create-post-modal-status-item-label"
                                 style={{display: 'flex', alignItems: 'center'}}>
                                <div className="create-post-modal-status-item-label-icon" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    marginRight: '10px',
                                    fontSize: '30px',
                                    background: '#e5e5e5'
                                }}>
                                    <i className='bx bxs-lock-alt'></i>
                                </div>
                                <div className="create-post-modal-status-item-label-text">
                                    <strong>Chỉ mình tôi</strong> <br/>
                                </div>
                            </div>
                            <input style={{
                                width: '20px',
                                height: '20px'
                            }}
                                   type="radio"
                                   value={3}
                                   checked={status === 3}
                                   onChange={handleStatusChange}/>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div hidden={isShowStatus} className="create-post-modal-add-more" style={{
                        width: '100%',
                        padding: '5px 10px',
                        border: '1px solid #e5e5e5',
                        display: 'flex',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '10px'
                    }}>
                        <div className="create-post-modal-add-more-titlte">
                            <strong>Thêm vào bài viết của bạn</strong>
                        </div>
                        <div className="create-post-modal-add-more-icon">
                                <span onClick={handleShowImageForm} style={{color: '#45BD62'}} title={'Ảnh/video'}><i
                                    className='bx bx-images'></i></span>
                            <span style={{color: '#1877F2'}} title={'Gắn thẻ người khác'}><i
                                className='bx bxs-user-plus'></i></span>
                        </div>


                    </div>
                    <button disabled={contentText === '' && imageListData.length === 0}
                            style={!isShowStatus ? {display: "block", width: '100%'} : {display: 'none'}}
                            className="btn" id="registerBtn">Đăng
                    </button>
                    <div className="btnShowStatus"
                         style={isShowStatus ? {display: "block", float: 'right'} : {display: 'none'}}>
                        <button onClick={handleCancelShowStatus} style={{marginRight: '20px'}}
                                className="btn btn-outline-secondary" id="statusCancelBtn">Hủy
                        </button>
                        <button onClick={handleSaveShowStatus} className="btn btn-primary" id="statusSaveBtn">Tiếp
                        </button>
                    </div>
                </Modal.Footer>
            </form>
            <ModalEditImages
                show={isShowModalEditImages}
                images={imageListData}
                setImages={setImageListData}
                click={fileInputRef}
                setIsShowEditImageModal={setIsShowModalEditImages}/>
        </Modal>

    )


}

export default ModalCreatePost