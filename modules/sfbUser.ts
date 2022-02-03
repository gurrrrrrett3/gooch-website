import fs from 'fs';
import path from 'path';
import User from "./user";

export default class extends User {

    public mcUsername: string;
    public lastUpload: number;


    constructor(user: User, mcUsername: string, lastUpload: number) {
        super(user.id, user.username, user.avatar);
        this.mcUsername = mcUsername;
        this.lastUpload = lastUpload;
    }

    public save() {
        const filePath = path.resolve(`data/sfb/users/${this.id}.json`);
    }

    public static getUser(id: string) {
        if (fs.existsSync(`./data/sfb/users/${id}.json`)) {
            return JSON.parse(fs.readFileSync(`./data/sfb/users/${id}.json`, "utf8"));
        } else {
            return undefined;
        }
    }

    



}