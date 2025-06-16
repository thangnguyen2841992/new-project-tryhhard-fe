import UserToken from "../model/UserToken";
import {jwtDecode} from "jwt-decode";

export async function myRequest(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Không thể kết nối đến URL: " + url);
    }

    return response.json();
}

export function getUserToken(): UserToken {
    const token = localStorage.getItem('token');
    if (token) {
        return jwtDecode(token) as UserToken;
    } else {
        return {};
    }
}