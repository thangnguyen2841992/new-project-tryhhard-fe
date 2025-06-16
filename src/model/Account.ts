class Account {
    accountId ?: number;
    firstName ?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    gender?: boolean;
    birthDate ?: string
    avatar?: string;
    address ?: string;
    jobTitle ?: string;
    country ?: string;
    city ?: string;
    username ?: string;


    constructor(accountId: number, firstName: string, lastName: string, fullName: string, email: string, phone: string, password: string, gender: boolean, birthDate: string, avatar: string, jobTitle: string, city: string, country: string , username:string) {
        this.accountId = accountId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.gender = gender;
        this.birthDate = birthDate;
        this.avatar = avatar;
        this.jobTitle = jobTitle;
        this.country = country;
        this.city = city;
        this.username = username;
    }


}

export default Account