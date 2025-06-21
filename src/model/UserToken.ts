
class UserToken {
    isAdmin?: boolean;
    isUser?: boolean;
    fullName?: string;
    avatar?: string;
    sub?: string;
    iat?: number;
    exp?: number;
    accountId?: number;


    constructor(isAdmin: boolean, isUser: boolean, fullName: string, avatar: string, sub: string, iat: number, exp: number, accountId: number) {
        this.isAdmin = isAdmin;
        this.isUser = isUser;
        this.fullName = fullName;
        this.avatar = avatar;
        this.sub = sub;
        this.iat = iat;
        this.exp = exp;
        this.accountId = accountId;
    }
}

export default UserToken