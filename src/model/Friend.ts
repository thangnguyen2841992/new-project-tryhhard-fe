class Friend {
    friendId ?: number;

    formUserId ?: number;

    toUserId ?: number;

    dateCreated ?: Date;

    dateApproved ?: Date;

    isApproved ?: boolean;


    constructor(friendId: number, formUserId: number, toUserId: number, dateCreated: Date, dateApproved: Date, isApproved: boolean) {
        this.friendId = friendId;
        this.formUserId = formUserId;
        this.toUserId = toUserId;
        this.dateCreated = dateCreated;
        this.dateApproved = dateApproved;
        this.isApproved = isApproved;
    }
}
export default Friend