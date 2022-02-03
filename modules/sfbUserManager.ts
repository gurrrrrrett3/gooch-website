import fs from 'fs';
import path from 'path';
import { SFBUser } from './types';

export default class SfbUserManager {

    public static getUser(userID: string): SFBUser | undefined {
        const userPath = path.resolve(`data/sfb/users/${userID}.json`);
        if (fs.existsSync(userPath)) {
            return JSON.parse(fs.readFileSync(userPath, "utf8"));
        } else {
            return undefined;
        }
    }

}