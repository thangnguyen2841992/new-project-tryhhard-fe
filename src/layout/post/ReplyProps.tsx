import {Client} from "@stomp/stompjs";
import ReplyComment from "../../model/ReplyComment";
import React, {ChangeEvent, useState} from "react";
import {getUserToken} from "../../api/PublicApi";
import CalculateTime from "./CalculateTime";

interface ReplyInterface {
    replies: ReplyComment[];
    fullName : string;
    avatar: string;
    accountId: number;
    client:Client;
    postId: number;
    commentId : number;
    commentAccountId : number;
    postAccountId: number;
}

const ReplyProps : React.FC<ReplyInterface> = ({replies, fullName, avatar, accountId, client, postId, commentId, commentAccountId, postAccountId}) => {
   if (!replies) {
       replies = [];
   }
    const [content, setContent] = useState<string>('');

    const handleChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Gọi hàm khi nhấn Enter
            handleCreateReply();
        }
    };

    const handleCreateReply = () => {
        if (client) {
            let messageSend = JSON.stringify({
                content: content,
                postId: postId,
                commentId : commentId,
                commentAccountId : commentAccountId,
                accountId: getUserToken().accountId,
                fullName: getUserToken().fullName,
                avatar: getUserToken().avatar
            })
            client.publish({
                destination: '/app/replyPost',
                body: messageSend
            });
            setContent('');
        }
    }
    return (
      <div className={'reply-comment-area'}>
          <div className="reply-form" style={{display: 'flex', marginLeft: '40px', marginTop : '10px'}}>
              <div className="reply-form-left">
                  <img src={getUserToken().avatar} alt="avatar"
                       style={{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover'}}/>
              </div>
              <div className="reply-form-right" style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#e5e5e5',
                  borderRadius: '10px',
                  marginLeft: '10px'
              }}>
                  <div className="reply-form-right-top">
                      <input value={content} onChange={handleChangeContent} onKeyDown={handleKeyDown} type="text" style={{
                          padding: '10px',
                          width: '100%',
                          border: 'none',
                          outline: 'none',
                          borderRadius: '10px'
                      }} placeholder={'Nhập phản hồi của bạn ... '}/>
                  </div>
                  <div className="reply-form-right-bot"
                       style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                      <button className={'reply-form-right-bot-btn'} title={'Thêm ảnh'} style={{
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


                      <button onClick={handleCreateReply} title={'Gửi'} className={'comment-form-right-bot-btn'}
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
          <div className="list-reply-area" style={{maxHeight : '330px', overflowY:'scroll'}}>
              {
                  replies.map((reply) => (
                      <div key={reply.replyId} className={'reply-list-area'} style={{marginBottom: '10px', marginLeft: '80px', marginTop : '10px'}}>
                          <div className="reply-list-area-top">
                              {/*@ts-ignore*/}
                              <img src={reply.avatar} alt="avatar"
                                   style={{
                                       width: '30px',
                                       height: '30px',
                                       borderRadius: '50%',
                                       objectFit: 'cover',
                                       marginRight: '10px'
                                   }}/>
                              {reply.fullName}
                          </div>
                          <div className="reply-list-area-bottom" style={{
                              marginLeft: '40px',
                              color: 'rgb(122, 128, 155)',
                              backgroundColor: '#e5e5e5',
                              padding: '10px',
                              borderRadius: '10px'
                          }}>
                              {reply.content}
                          </div>
                          <div style={{marginLeft: '40px', marginTop: '5px', display: 'flex'}}>
                              {/*@ts-ignore*/}
                              <CalculateTime dateCreated={reply.dateCreated}/>
                              {/*<div style={{marginLeft: '20px', display: 'flex'}}>*/}
                              {/*    <svg xmlns="http://www.w3.org/2000/svg" height="24px"*/}
                              {/*         viewBox="0 -960 960 960"*/}
                              {/*         width="24px" fill={comment.totalLikeComments === 0 ? '#7a809b' : 'red'}>*/}
                              {/*        <path*/}
                              {/*            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>*/}
                              {/*    </svg>*/}
                              {/*    <div*/}
                              {/*        onClick={() => comment?.commentId !== undefined && comment?.accountId !== undefined && handleCreateLikeComment(comment.commentId, comment.accountId)}*/}
                              {/*        style={{*/}
                              {/*            color: '#7a809b',*/}
                              {/*            marginLeft: '5px',*/}
                              {/*            fontSize: '14px',*/}
                              {/*            cursor: 'pointer'*/}
                              {/*        }}> Yêu thích ({comment.totalLikeComments})*/}
                              {/*    </div>*/}
                              {/*</div>*/}

                              {/*<div style={{marginLeft: '20px', display: 'flex'}}>*/}
                              {/*    <svg xmlns="http://www.w3.org/2000/svg" height="24px"*/}
                              {/*         viewBox="0 -960 960 960"*/}
                              {/*         width="24px" fill={'#7a809b'}>*/}
                              {/*        <path*/}
                              {/*            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>*/}
                              {/*    </svg>*/}
                              {/*    <div*/}
                              {/*        onClick={() => comment?.commentId !== undefined && showReplyForm(comment.commentId)}*/}
                              {/*        style={{*/}
                              {/*            color: '#7a809b',*/}
                              {/*            marginLeft: '5px',*/}
                              {/*            fontSize: '14px',*/}
                              {/*            cursor: 'pointer'*/}
                              {/*        }}> Phản hồi (0)*/}
                              {/*    </div>*/}
                              {/*</div>*/}
                          </div>

                      </div>
                  ))
              }
          </div>
      </div>
    )
}
export default ReplyProps