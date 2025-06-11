import {ChangeEvent, useState} from "react";
import {toast, ToastContainer} from "react-toastify";

function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }
    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    }
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }
    const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    }
    const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    }
    const handleBirthDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBirthDate(e.target.value);
    }
    const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCountry(e.target.value);
    }
    const handleJobTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setJobTitle(e.target.value);
    }

    //email
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);

    //confirm password
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');
    const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState<boolean>(false);

    //phone
    const [errorPhone, setErrorPhone] = useState<string>('');
    const [isErrorPhone, setIsErrorPhone] = useState<boolean>(false);

    const showSuccessMessage = () => {
        toast.success("Đăng ký thành công.",
            {
                position: toast.POSITION.TOP_RIGHT,
                className: "toast-message",
                autoClose: 1000
            })
    }
    const ErrorMessage = () => {
        toast.error("Đăng ký không thành công.",
            {
                position: toast.POSITION.TOP_RIGHT,
                className: "toast-message",
                autoClose: 1000
            })
    }

    //function check email
    const checkExistEmail = async (email: string) => {
        const url: string = `http://localhost:8080/account/checkExistEmail?email=${email.trim()}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === 'true') {
                setErrorEmail('Email đã tồn tại');
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error("Email đã tồn tại:", e);
            return false;

        }
    }

    //function check phone
    const checkExistPhone = async (phone: string) => {
        const url: string = `http://localhost:8080/account/checkExistPhone?phone=${phone.trim()}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === 'true') {
                setErrorPhone('Số điện thoại đã tồn tại');
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error("Số điện thoại đã tồn tại:", e);
            return false;

        }
    }

    // function check confirm password
    const checkInvalidConfirmPassword = (password: string, confirmPassword: string) => {
        if (password.trim() !== confirmPassword.trim()) {
            setErrorConfirmPassword('Mật khẩu chưa trùng khớp.');
            return true;
        } else {
            return false;
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //check confirm password
        setIsErrorConfirmPassword(checkInvalidConfirmPassword(password, confirmPassword));

        //check email
        setIsErrorEmail(await checkExistEmail(email));

        //check phone
        const isExistPhone = await checkExistPhone(phone);

        if (isExistPhone) {
            setIsErrorPhone(true)
        } else {
            setIsErrorPhone(false);
        }


        if (!isErrorConfirmPassword && !isErrorEmail && !isErrorPhone) {
            try {
                const url: string = `http://localhost:9000/user-api/register`;
                const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            firstName: firstName.trim(),
                            lastName: lastName.trim(),
                            password: password.trim(),
                            confirmPassword: confirmPassword.trim(),
                            email: email.trim(),
                            phone: phone.trim(),
                            gender: gender,
                            address: address.trim(),
                            birthDate : birthDate,
                            jobTitle : jobTitle.trim(),
                            country : country.trim(),
                            city : city.trim()
                        })
                    }
                );

                if (response.ok) {
                    showSuccessMessage();

                    setFirstName('');
                    setLastName('');
                    setPassword('');
                    setConfirmPassword('');
                    setEmail('');
                    setAddress('');
                    setGender('Nam');

                } else {
                    console.log(response.json());
                    // alert("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
                    ErrorMessage();
                }
            } catch (error) {
                // alert("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
                ErrorMessage();
            }
        } else {
            ErrorMessage();
        }

    }
    return (
        <div className={'container'}>
            {/*<div className="header-register d-flex justify-content-between align-items-center">*/}
            {/*    <Link to={'/'} className={'text-black fs-3'} title={'Quay lại trang chủ'}><ArrowLeft></ArrowLeft></Link>*/}
            {/*    <h3 className={'text-center py-3'}>Đăng ký thành viên</h3>*/}
            {/*    <a href="#"></a>*/}
            {/*</div>*/}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-register-item">
                            <label htmlFor="firstName" className="form-label">Họ và tên đệm</label>
                            <input onChange={handleFirstNameChange} type="text" className="form-control is-valid"
                                   required
                                   id="firstName" value={firstName}/>
                        </div>
                        <div className="form-register-item">
                            <label htmlFor="lastName" className="form-label">Tên của bạn</label>
                            <input onChange={handleLastNameChange} type="text" className="form-control is-valid"
                                   required
                                   id="lastName" value={lastName}/>
                        </div>
                        <div className="form-register-item">
                            <label htmlFor="username" className="form-label">Tên tài khoản</label>
                            <input type="text"
                                   className={"form-control is-valid"}
                                   id="username"/>
                        </div>
                        <div className="form-register-item">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input onChange={handlePasswordChange} type="password"
                                   className={"form-control is-valid"}
                                   id="password" value={password}/>
                        </div>
                        <div className="form-register-item">
                            <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                            <input onChange={handleConfirmPasswordChange} type="password"
                                   className={"form-control" + (!isErrorConfirmPassword ? " is-valid" : " is-invalid")}
                                   id="confirmPassword" value={confirmPassword}/>
                            <div className="invalid-feedback">{errorConfirmPassword}</div>
                        </div>

                    </div>
                    <div className="col-md-6">

                        <div className="form-register-item">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input onChange={handleEmailChange} type="email"
                                   className={"form-control" + (!isErrorEmail ? " is-valid" : " is-invalid")} required
                                   id="email" value={email}/>
                            <div className="invalid-feedback">{errorEmail}</div>
                        </div>

                        <div className="form-register-item">
                            <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                            <input onChange={handlePhoneChange} type="text"
                                   className={"form-control" + (!isErrorPhone ? " is-valid" : " is-invalid")} required
                                   id="phoneNumber" value={phone}/>
                            <div className="invalid-feedback">{errorPhone}</div>
                        </div>
                        <div className="form-register-item">
                            <label htmlFor="address" className="form-label">Địa chỉ</label>
                            <input onChange={handleAddressChange} type="text" className="form-control is-valid" required
                                   id="address" value={address}/>
                        </div>
                        <div className="form-register-item">
                            <label htmlFor="email" className="form-label" style={{marginTop: '5px'}}>Giới tính</label>
                            <br/>
                            <div className="gender-wrapper d-flex">
                                <div className="form-check" style={{marginRight: '50px'}}>
                                    <input onChange={handleGenderChange} className="form-check-input" type="radio"
                                           name="flexRadioDefault" id="male" value={'Nam'} checked={gender === 'Nam'}/>
                                    <label className="form-check-label" htmlFor="male">Nam</label>
                                </div>
                                <div className="form-check">
                                    <input onChange={handleGenderChange} className="form-check-input" type="radio"
                                           name="flexRadioDefault" id="female" value={'Nu'} checked={gender === 'Nu'}/>
                                    <label className="form-check-label" htmlFor="female">Nữ</label>
                                </div>
                            </div>

                        </div>

                        <button type={'submit'} className={'btn btn-success my-3'} style={{float: 'right'}}>Đăng ký
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )

}

export default Register