import Account from "../model/Account";
import {myRequest} from "./PublicApi";

export async function getAccountByAccountId(accountId: number): Promise<Account> {
    const url = `http://localhost:8080/account/findAccountByAccountId/${accountId}`;
    const response = await myRequest(url);

    let user: Account = {};

    user = {
        accountId: response.accountId,
        firstName: response.firstName,
        fullName : response.fullName,
        lastName: response.lastName,
        email: response.email,
        phone: response.phone,
        password: response.password,
        gender: response.gender,
        birthDate: response.birthDate,
        avatar: response.avatar,
        address : response.address,
        jobTitle : response.jobTitle,
        country : response.country,
        city : response.city,
        username : response.username
    }
    return user;
}