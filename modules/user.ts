export default class User {

    public id: string;
    public username: string;
    public avatar: string;

    constructor(id: string, username: string, avatar: string) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
    }

}