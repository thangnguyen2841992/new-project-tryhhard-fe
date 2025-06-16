import React, {useEffect, useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import Image from "../../model/Image";
import ModalCreatePost from "./ModalCreatePost";
import Account from "../../model/Account";
import {getAccountByAccountId} from "../../api/AccountApi";
import {getUserToken} from "../../api/PublicApi";

function Home() {
    const [postId, setPostId] = useState(0);
    const [isShowImages, setIsShowImages] = useState(false);
    const [image, setImage] = useState<Image>({});
    const [isReloadImgs, setIsReloadImgs] = useState<number>(0);
    const [user, setUser] = useState<Account>({});
    const [isDisable, setIsDisable] = useState(false);
    const [showModalCreatePost, setShowModalCreatePost] = useState<boolean>(false);
    const [resetProp, setResetProp] = useState(false);
    const [actionCount, setActionCount] = useState(0);
    const navigate = useNavigate();
    // const [friends, setFriends] = useState<User[]>([]);
    const [resetTotalLike, setResetTotalLike] = useState(0);
    const [avatar, setAvatar] = useState<Image>({});
    const [showComments, setShowComments] = useState<boolean>(false);
    const [resetComment, setResetComment] = useState<number>(0);

    const [commentForms, setCommentForms] = useState<{
        [key: number]: boolean
    }>({});

    useEffect(() => {
        // @ts-ignore
        getAccountByAccountId(getUserToken().accountId).then((data) => {
            setUser(data);
        }).catch((error : any) => {
            console.log(error.message)
        })

    }, []);
    const handleShowModalCreatePost = (e: any) => {
        e.preventDefault();
        setShowModalCreatePost(true);
        setIsDisable(true);
        setResetProp(false);
    }

    const handleCloseModalCreatePost = () => {
        setShowModalCreatePost(false);
        setIsDisable(false);
        setResetProp(true);
    }
    return (<div>
        {/*<Navbar1/>*/}
        <div className="home-content" style={{width: '99vw', height: '100vh', display: 'flex', padding: '15px 5px'}}>
            <div className="home-content-left" style={{width: '30%', position : 'fixed', top : '90px', left : '0'}}>
                {/*<div onClick={goAbout} className="home-content-left-user"*/}
                {/*     style={{marginLeft: '5px', marginBottom: '10px'}}>*/}
                {/*    <img src={avatar.imageData} alt="avatar"*/}
                {/*         style={{width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px'}}/>*/}
                {/*    <strong>{user.firstName} {user.lastName}</strong>*/}
                {/*</div>*/}
                {/*<Link to={'/friends'} style={{textDecoration: 'none'}}>*/}
                {/*    <div className="home-content-left-item d-flex align-items-center">*/}
                {/*    <span className={'fs-2'} style={{marginRight: '20px', color: '#1D8EF7'}}><i*/}
                {/*        className="fa-solid fa-user-group"></i></span>*/}
                {/*        <span>Bạn bè</span>*/}
                {/*    </div>*/}
                {/*</Link>*/}

                <div className="home-content-left-item d-flex align-items-center">
                    <span className={'fs-2'} style={{marginRight: '28px', color: '#1666C9'}}><i
                        className="fa-regular fa-clock"></i></span>
                    <span>Kỷ niệm</span>
                </div>
                <div className="home-content-left-item d-flex align-items-center">
                    <span className={'fs-2'} style={{marginRight: '35px', color: '#C632A2'}}><i
                        className="fa-solid fa-bookmark"></i></span>
                    <span>Đã lưu</span>
                </div>
                <Link to={'/groups'} style={{color: '#000', textDecoration : 'none'}}>
                    <div className="home-content-left-item d-flex align-items-center">
                    <span className={'fs-2'} style={{marginRight: '20px', color: '#1D8EF7'}}><i
                        className="fa-solid fa-users"></i></span>
                        <span>Nhóm</span>

                    </div>
                </Link>
                <div className="home-content-left-item d-flex align-items-center">
                    <span className={'fs-2  '} style={{marginRight: '28px', color: '#E248A6'}}><i
                        className="fa-brands fa-facebook-messenger"></i></span>
                    <span>Messager</span>
                </div>
            </div>
            <div className="home-content-center" style={{width: '45%', marginTop : '90px', marginLeft : '30%'}}>
                <div className="form-create-post-wrapper">
                    <div className="create-post-top">
                        {/*<div className="create-post-avatar"><img src={avatar.imageData} alt="avatar"/></div>*/}
                        <div className="create-post-input"><input
                            disabled={isDisable}
                            onClick={handleShowModalCreatePost}
                            type="text"
                            placeholder="Bạn đang nghĩ gì?"/></div>
                    </div>
                    <div style={{marginTop: '20px', border: "1px solid #e5e5e5"}}></div>
                    <div className="create-post-bottom">
                        <div className="create-post-bottom-item">
                            <i style={{color: "red", fontSize: "25px", marginRight: "10px"}}
                               className='bx bxs-camera-home'></i>
                            <span style={{fontSize: "16px", color: "#606060"}}>Video trực tiếp</span></div>
                        <div className="create-post-bottom-item"><i
                            style={{color: "green", fontSize: "25px", marginRight: "10px"}}
                            className='bx bx-images'></i> <span
                            style={{fontSize: "16px", color: "#606060"}}>Ảnh/video</span></div>
                        <div className="create-post-bottom-item"><i
                            style={{color: "blue", fontSize: "25px", marginRight: "10px"}}
                            className='bx bxs-flag-alt'></i> <span
                            style={{fontSize: "16px", color: "#606060"}}>Sự kiện trong đời</span>
                        </div>
                    </div>
                </div>
                {/*{*/}
                {/*    posts.map((post) => (*/}
                {/*        <div key={post.postId} className="post-detail-wrapper"*/}
                {/*             style={{*/}
                {/*                 padding: "20px",*/}
                {/*                 background: "#f2f2f2",*/}
                {/*                 borderRadius: "10px",*/}
                {/*                 marginBottom: '20px'*/}
                {/*             }}>*/}
                {/*            <div className="post-detail-header">*/}
                {/*                <PostDetailLeft post={post}/>*/}

                {/*            </div>*/}
                {/*            <div className="post-detail-content"*/}
                {/*                 style={{fontSize: '18px', marginBottom: '20px'}}>*/}
                {/*                {post.content}*/}
                {/*            </div>*/}

                {/*            <div className="post-detail-image-wrapper" style={{marginBottom: '5px'}}>*/}
                {/*                <Images post={post} postId={postId} setPostId={setPostId}*/}
                {/*                        isShowImages={isShowImages} setIsShowImages={setIsShowImages}*/}
                {/*                        image={image} setImage={setImage}*/}
                {/*                        isReload={isReloadImgs}/>*/}
                {/*            </div>*/}
                {/*            <div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                {/*                <div>*/}
                {/*                    <TotalLikePost postId={post.postId ? post.postId : 0}*/}
                {/*                                   resetTotalLike={resetTotalLike} resetComment={resetComment}*/}
                {/*                                   showComments={showComments} setShowComments={setShowComments}/>*/}
                {/*                </div>*/}
                {/*                <div style={{cursor: "pointer"}}*/}
                {/*                     onClick={(e: React.FormEvent) => showComment(e, post.postId ? post.postId : 0)}>*/}
                {/*                    <TotalCommentOfPost postId={post.postId ? post.postId : 0}*/}
                {/*                                        resetComment={resetComment}/>*/}
                {/*                </div>*/}

                {/*            </div>*/}


                {/*            <div className="post-detail-like-wrapper" style={{*/}
                {/*                width: '100%',*/}
                {/*                display: 'flex',*/}
                {/*                padding: '5px',*/}
                {/*            }}>*/}
                {/*                <div style={{paddingRight: '5px', width: '50%'}}>*/}
                {/*                    <ButtonListPost post={post} resetTotalLike={resetTotalLike}*/}
                {/*                                    setResetTotalLike={setResetTotalLike}/>*/}

                {/*                </div>*/}
                {/*                <div style={{paddingLeft: '5px', width: '50%'}}>*/}
                {/*                    <button*/}
                {/*                        onClick={(e: React.FormEvent) => showComment(e, post.postId ? post.postId : 0)}*/}
                {/*                        style={{width: '100%', border: '1px solid #e5e5e5'}}*/}
                {/*                        className="postDetailDisLikeBtn btn btn-light"><span><i*/}
                {/*                        className='bx bx-message-rounded-dots'></i></span> <span>Bình luận</span>*/}
                {/*                    </button>*/}
                {/*                </div>*/}


                {/*            </div>*/}
                {/*            {commentForms[post.postId ? post.postId : 0] && (*/}
                {/*                <ListComment postId={post.postId ? post.postId : 0} imageId={0}*/}
                {/*                             resetComment={resetComment}/>*/}


                {/*            )}*/}
                {/*            {commentForms[post.postId ? post.postId : 0] && (*/}

                {/*                <CommentForm postId={post.postId ? post.postId : 0} imageId={0}*/}
                {/*                             resetComment={resetComment} setResetComment={setResetComment}/>*/}

                {/*            )}*/}
                {/*        </div>*/}
                {/*    ))*/}
                {/*}*/}


            </div>
            <div className="home-content-right" style={{width: '25%', padding: '0 0 0 100px', position : 'fixed', top : '90px', right : '0'}}>
                <div className="home-content-right-title d-flex align-items-center justify-content-between">
                    <h5>Người liên hệ</h5>
                    <div className="home-content-right-title-btn">
                        <button className={'btn fs-5'}><i className="fa-solid fa-magnifying-glass"></i></button>
                        <button className={'btn fs-5'}><i className="fa-solid fa-ellipsis"></i></button>
                    </div>
                </div>
                {/*{*/}
                {/*    friends.map((friend) => (*/}
                {/*        <div key={friend.userId} className="home-content-right-item">*/}
                {/*            <AvatarOfAlert userId={friend.userId ? friend.userId : 0}/>*/}
                {/*            <strong style={{marginLeft: '10px'}}>{friend.firstName} {friend.lastName}</strong>*/}
                {/*        </div>*/}
                {/*    ))*/}
                {/*}*/}


            </div>
        </div>

        {/*<ModalImages*/}
        {/*    postId={postId}*/}
        {/*    image={image}*/}
        {/*    setImage={setImage}*/}
        {/*    show={isShowImages}*/}
        {/*    setIsShowImages={setIsShowImages}/>*/}
        <ModalCreatePost
            user={user}
            groupId={0}
            resetProp={resetProp}
            show={showModalCreatePost}
            actionCount={actionCount}
            setActionCount={setActionCount}
            setShowModalCreatePost={setShowModalCreatePost}
            onHide={handleCloseModalCreatePost}/>
    </div>)
}
export default Home