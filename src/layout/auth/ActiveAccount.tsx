import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function ActiveAccount() {
    const {email} = useParams();
    const {activeCode} = useParams();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        if (email && activeCode) {
            activeAcc().then(r => {

            }).catch(error => {
                console.log(error);
            });
        }
    }, []);
    const activeAcc = async () => {
        console.log(email, activeCode)
        const url = `http://localhost:8080/account/activeAccount?email=${email}&activeCode=${activeCode}`;
        try {
            const response = await fetch(url, {method: 'POST'});
            if (response.ok) {
                setIsActive(true);
            }
        } catch (e) {
            console.log('Lỗi khi kích hoat', e);
        }
    }

    return (
        <div className={'text-align-center '}><h1 className={'text-center'}>Kích hoạt tài khoản</h1>

            <div>
                {
                    isActive ?
                        <p className={'text-center fs-5'}>Tài khoản đã kích hoạt thành công, bạn có thể đăng nhập để mua
                            hàng</p>

                        : <p className={'text-center fs-5'}>Kích hoạt tài khoản không thành công</p>
                }
            </div>
        </div>
    )
}

export default ActiveAccount