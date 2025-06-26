import React, {ChangeEvent, useState} from "react";
import {getUserToken} from "../../api/PublicApi";
import CommentPost from "../../model/CommentPost";
import {Client} from "@stomp/stompjs";
import CalculateTime from "./CalculateTime";
import ReplyProps from "./ReplyProps";

interface CommentInterface {
    comments: CommentPost[];
    fullName : string;
    avatar: string;
    accountId: number;
    client:Client;
    postId: number;
    postAccountId: number;
}

const CommentProps: React.FC<CommentInterface> = ({comments, fullName, avatar, accountId, client, postId,postAccountId}) => {

    const [content, setContent] = useState<string>('');
    const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Gọi hàm khi nhấn Enter
            handleCreateComment();
        }
    };

    const [visibleReplies, setVisibleReplies] = useState<number[]>([]);
    const showReplyForm = (commentId: number) => {
        setVisibleReplies(prev =>
            prev.includes(commentId)
                ? prev.filter(id => id !== commentId) // Nếu đã có, xóa khỏi mảng
                : [...prev, commentId] // Nếu chưa có, thêm vào mảng
        );
    };

    const handleCreateComment = () => {
        if (client) {
            let messageSend = JSON.stringify({
                content: content,
                postId: postId,
                accountId: getUserToken().accountId,
                fullName: getUserToken().fullName,
                avatar: getUserToken().avatar,
                postAccountId : postAccountId
            })
            client.publish({
                destination: '/app/commentPost',
                body: messageSend
            });
            setContent('');
        }
    };

    const handleCreateLikeComment = (commentId : number, accountCommentId : number) => {
        if (client) {
            let messageSend = JSON.stringify({
                postId: postId,
                commentId: commentId,
                accountId: getUserToken().accountId,
                accountCommentId: accountCommentId
            })
            client.publish({
                destination: '/app/likeComment',
                body: messageSend
            });
            setContent('');
        }
    };
    if (!comments) {
        return (
            <div className={'comment-area'}>
                <div className="comment-header"
                     style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <div style={{fontWeight: '500', fontSize: '18px', color: '#7a809b'}}>

                        Bình luận
                    </div>
                    <div style={{fontWeight: '500', fontSize: '18px', color: '#7a809b'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                             fill="#7a809b">
                            <path d="M480-200v-360H120v-80h440v440h-80Zm200-200v-360H320v-80h440v440h-80Z"/>
                        </svg>
                        Cũ nhất
                    </div>
                </div>
                <div className="comment-form" style={{display: 'flex'}}>
                    <div className="comment-form-left">
                        <img src={getUserToken().avatar} alt="avatar"
                             style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}}/>
                    </div>
                    <div className="comment-form-right" style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#e5e5e5',
                        borderRadius: '10px',
                        marginLeft: '10px'
                    }}>
                        <div className="comment-form-right-top">
                            <input value={content} onChange={handleChangeContent} onKeyDown={handleKeyDown} type="text" style={{
                                padding: '10px',
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                borderRadius: '10px'
                            }} placeholder={'Nhập bình luận của bạn ... '}/>
                        </div>
                        <div className="comment-form-right-bot"
                             style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                            <button className={'comment-form-right-bot-btn'} title={'Thêm ảnh'} style={{
                                outline: 'none',
                                border: 'none',
                                borderRadius: '10px',
                                backgroundColor: '#e5e5e5'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                     fill="#7a809b">
                                    <path
                                        d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
                                </svg>
                            </button>


                            <button onClick={handleCreateComment} title={'Gửi'} className={'comment-form-right-bot-btn'}
                                    style={{
                                        outline: 'none',
                                        border: 'none',
                                        borderRadius: '10px',
                                        backgroundColor: '#e5e5e5'
                                    }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                     fill="#7a809b">
                                    <path
                                        d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={'comment-area'}>
                <div className="comment-header"
                     style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <div style={{fontWeight: '500', fontSize: '18px', color: '#7a809b'}}>

                        Bình luận
                    </div>
                    <div style={{fontWeight: '500', fontSize: '18px', color: '#7a809b'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                             fill="#7a809b">
                            <path d="M480-200v-360H120v-80h440v440h-80Zm200-200v-360H320v-80h440v440h-80Z"/>
                        </svg>
                        Cũ nhất
                    </div>
                </div>
                <div className="comment-form" style={{display: 'flex'}}>
                    <div className="comment-form-left">
                        <img src={getUserToken().avatar} alt="avatar"
                             style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}}/>
                    </div>
                    <div className="comment-form-right" style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#e5e5e5',
                        borderRadius: '10px',
                        marginLeft: '10px'
                    }}>
                        <div className="comment-form-right-top">
                            <input value={content} onChange={handleChangeContent} onKeyDown={handleKeyDown} type="text" style={{
                                padding: '10px',
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                borderRadius: '10px'
                            }} placeholder={'Nhập bình luận của bạn ... '}/>
                        </div>
                        <div className="comment-form-right-bot"
                             style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                            <button className={'comment-form-right-bot-btn'} title={'Thêm ảnh'} style={{
                                outline: 'none',
                                border: 'none',
                                borderRadius: '10px',
                                backgroundColor: '#e5e5e5'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                     fill="#7a809b">
                                    <path
                                        d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
                                </svg>
                            </button>


                            <button onClick={handleCreateComment} title={'Gửi'} className={'comment-form-right-bot-btn'}
                                    style={{
                                        outline: 'none',
                                        border: 'none',
                                        borderRadius: '10px',
                                        backgroundColor: '#e5e5e5'
                                    }}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                     fill="#7a809b">
                                    <path
                                        d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="list-comment-area" style={{marginLeft : '30px', padding:'20px'}}>
                    {
                        comments.map((comment) => (
                            <div key={comment.commentId} className={'comment-list-area'} style={{marginBottom: '10px'}}>
                                <div className="comment-list-area-top">
                                    {/*@ts-ignore*/}
                                    <img src={comment.avatar} alt="avatar"
                                         style={{
                                             width: '30px',
                                             height: '30px',
                                             borderRadius: '50%',
                                             objectFit: 'cover',
                                             marginRight: '10px'
                                         }}/>
                                    {comment.fullName}
                                </div>
                                <div className="comment-list-area-bottom" style={{
                                    marginLeft: '40px',
                                    color: 'rgb(122, 128, 155)',
                                    backgroundColor: '#e5e5e5',
                                    padding: '10px',
                                    borderRadius: '10px'
                                }}>
                                    {comment.content}
                                </div>
                                <div style={{marginLeft: '40px', marginTop: '5px', display: 'flex'}}>
                                    {/*@ts-ignore*/}
                                    <CalculateTime dateCreated={comment.dateCreated}/>
                                    <div style={{marginLeft: '20px', display: 'flex'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                             viewBox="0 -960 960 960"
                                             width="24px" fill={comment.totalLikeComments === 0 ? '#7a809b' : 'red'}>
                                            <path
                                                d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
                                        </svg>
                                        <div
                                            onClick={() => comment?.commentId !== undefined && comment?.accountId !== undefined && handleCreateLikeComment(comment.commentId, comment.accountId)}
                                            style={{
                                                color: '#7a809b',
                                                marginLeft: '5px',
                                                fontSize: '14px',
                                                cursor: 'pointer'
                                            }}> Yêu thích ({comment.totalLikeComments})
                                        </div>
                                    </div>

                                    <div style={{marginLeft: '20px', display: 'flex'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px"
                                             viewBox="0 -960 960 960" width="24px"
                                             fill={!comment.listReplyComments ? '#7a809b' : 'blue'}>
                                            <path
                                                d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                                        </svg>
                                        <div
                                            onClick={() => comment?.commentId !== undefined && showReplyForm(comment.commentId)}
                                            style={{
                                                color: '#7a809b',
                                                marginLeft: '5px',
                                                fontSize: '14px',
                                                cursor: 'pointer'
                                            }}> Phản hồi ({comment.listReplyComments ? comment.listReplyComments.length : 0})
                                        </div>
                                    </div>
                                </div>
                                <div hidden={!comment.commentId || !visibleReplies.includes(comment.commentId)}>
                                    {/*// @ts-ignore*/}
                                    <ReplyProps replies={comment.listReplyComments} fullName={comment.avatar} avatar={comment.fullName} accountId={comment.accountId} client={client} postId={comment.postId} commentId={comment.commentId} commentAccountId={comment.accountId} postAccountId={comment.postId}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

}
export default CommentProps