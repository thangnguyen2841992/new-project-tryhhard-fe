import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Image from "../../model/Image";
import ModalCreatePost from "./ModalCreatePost";
import Account from "../../model/Account";
import {getAccountByAccountId} from "../../api/AccountApi";
import {getUserToken} from "../../api/PublicApi";
import Navbar from "../navbar/Navbar";
import {getAllTopicProduct} from "../../api/ProductApi";
import TopicProduct from "../../model/TopicProduct";
import {Client} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import Post from "../../model/Post";
import CalculateTime from "./CalculateTime";

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
    const [topics, setTopics] = useState<TopicProduct[]>([]);

    const [selectedTopicValue, setSelectedTopicValue] = useState<string>(topics[0]?.topicName || '');

    const [messages, setMessages] = useState<string[]>([]);
    const [client, setClient] = useState<Client | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                login: 'guest',
                passcode: 'guest',
            },
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                stompClient.subscribe('/topic/posts', (message) => {
                    const post = JSON.parse(message.body);
                        setPosts((prev) => [...prev, post]);
                });
            },
            webSocketFactory: () => {
                return new SockJS('http://localhost:8082/ws');
            },
        });

        setClient(stompClient);
        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, []);


    useEffect(() => {
        // @ts-ignore
        getAccountByAccountId(getUserToken().accountId).then((data) => {
            setUser(data);
        }).catch((error: any) => {
            console.log(error.message)
        });

        getAllTopicProduct().then(
            data => {
                setTopics(data);
            }).catch(error => console.log(error));

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    }
    return (<div>
        <Navbar/>
        <div className="home-content" style={{width: '99vw', height: '100vh', display: 'flex', padding: '15px 5px'}}>
            <div className="home-content-left" style={{
                width: '15%',
                height: '100%',
                position: 'fixed',
                top: '0',
                left: '0',
                backgroundColor: '#F2A3B5'
            }}>
                <div className="home-content-left-user"
                     style={{marginLeft: '5px', marginBottom: '10px', marginTop: '10px'}}>
                    <img src={'/sakura-removebg-preview.png'} alt="avatar"
                         style={{width: '150px', height: "100px", objectFit: 'cover', marginRight: '10px'}}/>
                </div>
                <Link to={'/friends'} style={{textDecoration: 'none'}}>
                    <div className="home-content-left-item d-flex align-items-center">
                        <div className={'home-content-left-item-icon'}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                                 fill="#fff">
                                <path
                                    d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM384-480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42Zm336-144q0 60-42 102t-102 42q-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t-51-21Q354-696 333-674.79t-21 51Q312-594 333.21-573t51 21ZM384-264Zm0-360Z"/>
                            </svg>
                        </div>
                        <span style={{color: 'white'}}>Bạn bè</span>
                    </div>
                </Link>

                <div className="home-content-left-item d-flex align-items-center">
                    <div className={'home-content-left-item-icon'}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                             fill="#fff">
                            <path
                                d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"/>
                        </svg>
                    </div>

                    <span style={{color: 'white'}}>Dịch</span>
                </div>
                <div className="home-content-left-item d-flex align-items-center">
                    <div className={'home-content-left-item-icon'}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                             fill="#fff">
                            <path
                                d="M216-792v624-624 168-168Zm72 408h164q9-20 21.5-38t27.5-34H288v72Zm0 144h149q-3.75-18-4.87-36-1.13-18 .87-36H288v72ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-624q0-29.7 21.15-50.85Q186.3-864 216-864h312l192 192v149q-18-4-36-5t-36 1v-97H480v-168H216v624h248q12 21 28 39.5T528-96H216Zm455.77-96Q712-192 740-219.77q28-27.78 28-68Q768-328 740.16-356q-27.84-28-68.16-28-32 0-64 24t-32 72q0 40.32 27.77 68.16 27.78 27.84 68 27.84ZM861-48l-98-99q-20 13-43.03 20t-47.47 7Q602-120 553-169t-49-119q0-70 49-119t119-49q70 0 119 49t49 119q0 24.61-7 47.81Q826-217 813-197l99 98-51 51Z"/>
                        </svg>
                    </div>
                    <span style={{color: 'white'}}>Tra cứu</span>
                </div>
                <Link to={'/groups'} style={{color: '#000', textDecoration: 'none'}}>
                    <div className="home-content-left-item d-flex align-items-center">
                        <div className={'home-content-left-item-icon'}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                                 width="20px"
                                 fill="#fff">
                                <path
                                    d="M288-288h288v-72H288v72Zm0-156h384v-72H288v72Zm0-156h384v-72H288v72Zm-72 456q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528H216v528Zm0-528v528-528Z"/>
                            </svg>
                        </div>
                        <span style={{color: 'white'}}>JLPT</span>

                    </div>
                </Link>
                <div className="home-content-left-item d-flex align-items-center">
                    <div className={'home-content-left-item-icon'}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                             fill="#fff">
                            <path
                                d="M323.79-516q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm156 0q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm156 0q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM96-96v-696q0-29.7 21.15-50.85Q138.3-864 168-864h624q29.7 0 50.85 21.15Q864-821.7 864-792v480q0 29.7-21.15 50.85Q821.7-240 792-240H240L96-96Zm114-216h582v-480H168v522l42-42Zm-42 0v-480 480Z"/>
                        </svg>
                    </div>
                    <span style={{color: 'white'}}>Tin nhắn</span>
                </div>

                <div className="home-content-left-item d-flex align-items-center">
                    <div className={'home-content-left-item-icon'}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                             fill="#fff">
                            <path
                                d="M168-394h42l22-62h99l22 62h43l-92-244h-44l-92 244Zm77-97 36-102h2l36 102h-74Zm319-87v-76q31-10 64-14.5t68-4.5q23 0 46.5 2.5T792-663v74q-30-7-53-10t-43-3q-34 0-67 6t-65 18Zm0 236v-76q28-9 60-14.5t72-5.5q27 0 50.5 3t45.5 8v74q-30-7-53-10t-43-3q-34 0-67 6t-65 18Zm0-118v-76q32-10 65.5-15t66.5-5q27 0 50.5 3t45.5 8v74q-26-7-49.5-10t-46.5-3q-32 0-64.5 6T564-460ZM264-288q47 0 92 12t88 30v-454q-42-22-87-33t-93-11q-37 0-73.5 6.5T120-716v452q35-13 71-18.5t73-5.5Zm252 42q43-20 88-31t92-11q37 0 73.5 4.5T840-264v-452q-35-13-71-20.5t-73-7.5q-48 0-93 11t-87 33v454Zm-36 102q-49-32-103-52t-113-20q-38 0-76 7.5T115-186q-24 10-45.5-3.5T48-229v-503q0-14 7.5-26T76-776q45-20 92-30t96-10q57 0 111.5 13.5T480-762q51-26 105-40t111-14q49 0 96 10t92 30q13 6 21 18t8 26v503q0 25-15.5 40t-32.5 7q-40-18-82.5-26t-86.5-8q-59 0-113 20t-103 52ZM282-495Z"/>
                        </svg>
                    </div>
                    <span style={{color: 'white'}}>Từ vựng</span>
                </div>


                <div className="home-content-left-item d-flex align-items-center">
                    <div className={'home-content-left-item-icon'}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                             fill="#fff">
                            <path
                                d="M288-96q-40 0-68-27.5T192-190v-553q0-34 22-59.5t56-32.5l354-74v626l-338.95 71.13Q277-210 270.5-203.75 264-197.5 264-190q0 10 7.2 16t16.8 6h407.55v-624H768v696H288Zm96-211 168-36v-477l-168 35v478Zm-72 15v-477l-30 6q-8 2-13 7.19T264-743v463q5-2 10.5-3t10.5-3l27-6Zm-48-469v481-481Z"/>
                        </svg>
                    </div>
                    <span style={{color: 'white'}}>Ngữ pháp</span>
                </div>

                <div className="home-content-left-item d-flex align-items-center">
                    <div className={'home-content-left-item-icon'}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                             fill="#fff">
                            <path
                                d="m418-395-34-34q10-11 15.5-24t5.5-27q0-14-5.5-27T384-531l34-34q17 17 26 39t9 46q0 24-9 46t-26 39Zm85 85-34-34q26-27 41-62.5t15-73.5q0-38-14.5-73.5T469-616l34-33q34 34 52.5 77.5T574-480q0 48-18.5 92T503-310ZM192-480q-30 0-51-21t-21-51q0-30 21-51t51-21q30 0 51 21t21 51q0 30-21 51t-51 21ZM48-336v-33q0-22 12.5-38.5T92-435q23-12 48.5-16.5T192-456q26 0 51.5 4.5T292-435q19 11 31.5 27.5T336-369v33H48Zm720-144q-30 0-51-21t-21-51q0-30 21-51t51-21q30 0 51 21t21 51q0 30-21 51t-51 21ZM624-336v-33q0-22 12.5-38.5T668-435q23-13 48.5-17t51.5-4q26 0 51.5 4.5T868-435q19 11 31.5 27.5T912-369v33H624Z"/>
                        </svg>
                    </div>
                    <span style={{color: 'white'}}>Hội thoại</span>
                </div>

                <div className="home-content-left-item d-flex align-items-center">
                    <div className={'home-content-left-item-icon'}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                             fill="#fff">
                            <path
                                d="M340-460h280v-64H340v64Zm0 120h280v-64H340v64Zm0 120h174v-64H340v64ZM263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v168-168 624-624Z"/>
                        </svg>
                    </div>
                    <span style={{color: 'white'}}>Đọc hiểu</span>
                </div>
            </div>
            <div className="home-content-center" style={{width: '60%', marginTop: '90px', marginLeft: '20%'}}>
                <div className="form-create-post-wrapper" style={{marginBottom : '20px'}}>
                    <div className="create-post-top">
                        {/*<div className="create-post-avatar"><img src={avatar.imageData} alt="avatar"/></div>*/}
                        <div className="create-post-input"><input style={{paddingLeft: '50px'}}
                                                                  disabled={isDisable}
                                                                  onClick={handleShowModalCreatePost}
                                                                  type="text"
                                                                  placeholder={user.fullName + ' bạn đang thắc mắc điều gì?'}/>
                            <img src={user.avatar} alt="avatar" style={{
                                width: '30px', height: '30px', borderRadius: '50%',
                                position: "absolute", top: '10px', left: '10px'
                            }}/>
                        </div>

                    </div>
                </div>
                {
                    posts.map((post) => (
                        <div key={post.postId} className="post-detail-wrapper"
                             style={{
                                 padding: "20px",
                                 background: "#f2f2f2",
                                 borderRadius: "10px",
                                 marginBottom: '20px'
                             }}>
                            <div className="post-detail-title" style={{marginBottom: '20px'}}>
                                <h3>{post.title}</h3>
                            </div>
                            <div className="post-detail-acc" style={{display : 'flex'}}>
                                <div className="post-detail-acc-left">
                                    <img src={post.avatar} alt="avatar"
                                         style={{
                                             width: '50px',
                                             height: "50px",
                                             objectFit: 'cover',
                                             marginRight: '10px',
                                             borderRadius: '50%'
                                         }}/>
                                </div>
                                <div className="post-detail-acc-right">
                                    <p>{post.fullName}</p>
                                    {/*// @ts-ignore*/}
                                    <CalculateTime dateCreated = {post.dateCreated} />
                                </div>
                            </div>
                            <div style={{borderLeft : '2px solid #b1b6c9', padding: ' 0 10px', marginBottom: '10px', color : '#7a809b'}} className="post-detail-topicName">
                                {post.topicPostName}
                            </div>
                            <div className="post-detail-content"
                                 style={{fontSize: '18px', marginBottom: '20px'}}>
                                {post.content}
                            </div>

                            {/*<div className="post-detail-image-wrapper" style={{marginBottom: '5px'}}>*/}
                            {/*    <Images post={post} postId={postId} setPostId={setPostId}*/}
                            {/*            isShowImages={isShowImages} setIsShowImages={setIsShowImages}*/}
                            {/*            image={image} setImage={setImage}*/}
                            {/*            isReload={isReloadImgs}/>*/}
                            {/*</div>*/}
                            {/*<div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                            {/*    <div>*/}
                            {/*        <TotalLikePost postId={post.postId ? post.postId : 0}*/}
                            {/*                       resetTotalLike={resetTotalLike} resetComment={resetComment}*/}
                            {/*                       showComments={showComments} setShowComments={setShowComments}/>*/}
                            {/*    </div>*/}
                            {/*    <div style={{cursor: "pointer"}}*/}
                            {/*         onClick={(e: React.FormEvent) => showComment(e, post.postId ? post.postId : 0)}>*/}
                            {/*        <TotalCommentOfPost postId={post.postId ? post.postId : 0}*/}
                            {/*                            resetComment={resetComment}/>*/}
                            {/*    </div>*/}

                            {/*</div>*/}


                            <div className="post-detail-like-wrapper" style={{
                                width: '100%',
                                display: 'flex',
                                padding: '5px',
                            }}>
                                {/*<div style={{paddingRight: '5px', width: '50%'}}>*/}
                                {/*    <ButtonListPost post={post} resetTotalLike={resetTotalLike}*/}
                                {/*                    setResetTotalLike={setResetTotalLike}/>*/}

                                {/*</div>*/}
                                {/*<div style={{paddingLeft: '5px', width: '50%'}}>*/}
                                {/*    <button*/}
                                {/*        onClick={(e: React.FormEvent) => showComment(e, post.postId ? post.postId : 0)}*/}
                                {/*        style={{width: '100%', border: '1px solid #e5e5e5'}}*/}
                                {/*        className="postDetailDisLikeBtn btn btn-light"><span><i*/}
                                {/*        className='bx bx-message-rounded-dots'></i></span> <span>Bình luận</span>*/}
                                {/*    </button>*/}
                                {/*</div>*/}


                            </div>
                            {/*{commentForms[post.postId ? post.postId : 0] && (*/}
                            {/*    <ListComment postId={post.postId ? post.postId : 0} imageId={0}*/}
                            {/*                 resetComment={resetComment}/>*/}


                            {/*)}*/}
                            {/*{commentForms[post.postId ? post.postId : 0] && (*/}

                            {/*    <CommentForm postId={post.postId ? post.postId : 0} imageId={0}*/}
                            {/*                 resetComment={resetComment} setResetComment={setResetComment}/>*/}

                            {/*)}*/}
                        </div>
                    ))
                }


            </div>
            <div className="home-content-right"
                 style={{width: '20%', marginTop: '90px', marginRight: '5%'}}>
                <div className="search-wrapper" style={{
                    // marginLeft: '35px',
                    position: 'relative',
                }}>
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder="Tìm kiếm"
                               style={{
                                   height: '50px',
                                   width: '100%',
                                   borderRadius: '20px',
                                   border: 'none',
                                   outline: 'none',
                                   padding: '0 40px',
                                   fontSize: '17px',
                                   background: '#f2f2f2'
                               }}/>
                        <button type="submit"
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '25px',
                                    background: 'transparent',
                                    position: 'absolute',
                                    top: '7px',
                                    left: '10px'
                                }}><i className='bx bx-search'></i></button>
                    </form>
                </div>


            </div>
        </div>

        {/*<ModalImages*/}
        {/*    postId={postId}*/}
        {/*    image={image}*/}
        {/*    setImage={setImage}*/}
        {/*    show={isShowImages}*/}
        {/*    setIsShowImages={setIsShowImages}/>*/}
        <ModalCreatePost
            topics={topics}
            selectedTopicValue={selectedTopicValue}
            user={user}
            groupId={0}
            resetProp={resetProp}
            show={showModalCreatePost}
            actionCount={actionCount}
            setActionCount={setActionCount}
            setShowModalCreatePost={setShowModalCreatePost}
            onHide={handleCloseModalCreatePost}
            setSelectedTopicValue={setSelectedTopicValue}
            client={client}
        />
    </div>)
}

export default Home