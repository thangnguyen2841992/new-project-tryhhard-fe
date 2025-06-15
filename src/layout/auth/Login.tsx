import React, {ChangeEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState('');
    const [isErrorEmail, setIsErrorEmail] = useState(false);

    const [errorPassword, setErrorPassword] = useState('');
    const [isErrorPassword, setIsErrorPassword] = useState(false);

    const navigate = useNavigate();
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }


    // const checkExistUsername = async (username: string) => {
    //     const url: string = `http://localhost:8080/users/search/existsByUsername?username=${username.trim()}`;
    //     try {
    //         const response = await fetch(url);
    //         const data = await response.text();
    //         if (data === 'true') {
    //             setErrorUsername('');
    //             return true;
    //         } else {
    //             setErrorUsername('Tài khoản không tồn tại.');
    //             return false;
    //         }
    //     } catch (e) {
    //         console.error("Username đã tồn tại:", e);
    //         return false;
    //     }
    // }
    //
    // const checkMatchPassword = async (username: string, password: string) => {
    //     const url: string = `http://localhost:9000/user-api/checkMatchPassword?username=${username.trim()}&password=${password.trim()}`;
    //     try {
    //         const response = await fetch(url);
    //         const data = await response.text();
    //         if (data === 'true') {
    //             setErrorPassword('');
    //             return true;
    //         } else {
    //             setErrorPassword('Mật khẩu không đúng.');
    //             return false;
    //         }
    //     } catch (e) {
    //         console.error("Mật khẩu không đúng.", e);
    //         return false;
    //     }
    // }
    //
    // const showSuccessMessage = () => {
    //     toast.success("Đăng nhập thành công.",
    //         {
    //             position: toast.POSITION.TOP_RIGHT,
    //             className: "toast-message",
    //             autoClose: 1000
    //         })
    // }
    // const ErrorMessage = () => {
    //     toast.error("Đăng nhập không thành công.",
    //         {
    //             position: toast.POSITION.TOP_RIGHT,
    //             className: "toast-message",
    //             autoClose: 1000
    //         })
    // }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // const isExistUsername = await checkExistUsername(username);
        // const isMatchPassword = await checkMatchPassword(username, password);

        // if (!isExistUsername) {
        //     setIsErrorUsername(true);
        // }
        // if (!isMatchPassword) {
        //     setIsErrorPassword(true);
        // }

        // if (isMatchPassword && isExistUsername) {
            const loginForm = {
                email: email,
                password: password
            }
            fetch('http://localhost:8080/account/loginAccount',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginForm)
                }
            ).then(
                (response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Đăng nhập thất bại!')
                    }
                }
            ).then(
                (data) => {
                    // Xử lý đăng nhập thành công
                    const { jwt } = data;
                    // Lưu token vào localStorage hoặc cookie
                    localStorage.setItem('token', jwt);
                    alert('Đăng nhập thành công!')
                    // showSuccessMessage();
                    setEmail('');
                    setPassword('');
                    // Điều hướng đến trang chính hoặc thực hiện các tác vụ sau đăng nhập thành công
                    // navigate('/watches/admin')
                    // setError('Đăng nhập thành công!');
                }
            ).catch((error) => {
                    // Xử lý lỗi đăng nhập
                    console.error('Đăng nhập thất bại: ', error);
                    alert("Đăng nhập thất bại!")
                    // ErrorMessage();
                    // setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
                }
            )
        // } else  {
        //     ErrorMessage();
        // }
    }


    return (
        <div className={'container'}>
            {/*<Link to={'/'} className={'text-black fs-3'} title={'Quay lại trang chủ'}><ArrowLeft></ArrowLeft></Link>*/}


            <div className="row">
                <form onSubmit={onSubmit}>
                    <div className="col-md-6 my-5" style={{margin : '0 auto', border : '1px solid #eee', padding : '150px 100px', borderRadius : '20px'}}>
                        <div className="login-header" style={{position : "absolute", top : '120px'}}>
                            <h1>Đăng nhập tài khoản</h1>
                        </div>

                        <div className="form-register-item">
                            <label htmlFor="username" className="form-label">Email</label>
                            <input onChange={handleChangeEmail} type="text"
                                   // className={"form-control" + (!isErrorUsername ? " is-valid" : " is-invalid")}
                                   className={"form-control"}
                                   id="username" value={email}/>
                            {/*<div className="invalid-feedback">{errorUsername}</div>*/}
                        </div>
                        <div className="form-register-item">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input onChange={handleChangePassword} type="password"
                                   // className={"form-control" + (!isErrorPassword ? " is-valid" : " is-invalid")}
                                   className={"form-control"}
                                   id="password" value={password}/>
                            {/*<div className="invalid-feedback">{errorPassword}</div>*/}
                        </div>
                        <button type={'submit'} className={'btn btn-success'} style={{float : 'right', marginTop : '10px'}}>Đăng nhập</button>
                    </div>
                </form>

            </div>
            {/*<ToastContainer/>*/}
        </div>
    )
}

export default Login