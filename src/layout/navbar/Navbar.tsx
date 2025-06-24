import React, {useEffect, useState} from "react";
import {getAccountByAccountId} from "../../api/AccountApi";
import {Link,useNavigate} from "react-router-dom";
import Account from "../../model/Account";
import {getUserToken} from "../../api/PublicApi";
import Notification from "../../model/Notification";
import NotificationItem from "./NotificationItem";

interface NavbarProps {
    notifications: Notification[];
}

const Navbar: React.FC<NavbarProps> = ({ notifications }) => {
    const [user, setUser] = useState<Account>({});
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleNavigationAbout = () => {
        navigate(`/about/${getUserToken().accountId}`); // Điều hướng đến trang người dùng
    };


    const onChangeKeyword = (e : React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    }

    useEffect(() => {
        // @ts-ignore
        getAccountByAccountId(getUserToken().accountId).then((data) => {
            setUser(data);
        }).catch(error => {
            console.log(error);
        });
    }, []);


    const logout = (e : React.FormEvent) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate('/login');
    }

    const handleSearch = (e : React.FormEvent) => {
        e.preventDefault();
    }


    return (
        <div className="navbar-wrapper" style={{
            width: '85%',
            height: '80px',
            padding: '10px 1%',
            background: '#FFCCCB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '5px',
            position : 'fixed',
            left : '15%',
            top : '0',
            zIndex : '1'
        }}>
            <div className="left-section" style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '5%'
            }}>
                    <h1 style={{fontFamily: 'Lobster, cursive',
                        fontSize: '3em',
                        color: '#333',
                        textAlign: 'center'}}>N2 THẲNG TIẾN</h1>
            </div>
            <div className="right-section"
                 style={{
                     display: 'flex',
                     alignItems: 'center',
                     marginRight : '6%'
                 }}>
                <div className="notification-wrapper">
                    <button className="notificationBtn" id="notificationBtn1" data-bs-toggle="dropdown" aria-expanded="false" title={'Thông báo'}><i style={{fontSize : '20px', color : '#FFA500'}} className='bx bxs-bell'></i>
                    </button>
                    <span className={'notification-wrapper-total'} style={notifications.length > 0 ? {display :'block'} : {display :'none'}}> {notifications.length}</span>
                    <ul style={{width :'520px', maxHeight : '270px', overflowY : 'scroll', padding : '10px'}} className="dropdown-menu" aria-labelledby="notificationBtn1">
                        <strong style={{marginLeft :'10px', marginBottom : '10px'}}>Thông báo({notifications.length})</strong>
                        {
                            notifications.map((item) => (
                                <NotificationItem notification={item} />
                            ))
                        }
                    </ul>
                </div>
                <div className="notification-wrapper">
                    <button title={'Tin nhắn'} className="messageBtn">
                        
                        <i style={{fontSize : '20px', color : '#87CEEB'}} className='bx bxl-messenger'></i>
                    </button>
                    {/*<span className={'notification-wrapper-total'}>10</span>*/}
                </div>
                <div className="nav-avatar-wrapper">

                    <button style={{border : 'none', outline : 'none', width : '40px', height : '40px', borderRadius : '50%'}} data-bs-toggle="dropdown" aria-expanded="false"
                            id="editPostDropdown"> <img className={'nav-avatar-wrapper-img'} src={user.avatar} alt="avatar"/></button>

                    <ul className="dropdown-menu" aria-labelledby="editPostDropdown">
                        <li onClick={handleNavigationAbout} className={'friend-list-li'}><i className="fa-solid fa-user"></i> <span style={{marginLeft : '10px'}}>Xem tất cả trang cá nhân</span>
                        </li>
                        <li onClick={logout} className={'friend-list-li'}><i className="fa-solid fa-right-from-bracket"></i><span style={{marginLeft : '10px'}}>Đăng xuất</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar