import fs from 'fs';
import { DiscordToken } from './types';
export default class TokenManager {

    public static storeToken(data: DiscordToken) {
        data.expires_in = Date.now() + (data.expires_in * 1000);
        const tokens = this.openFile();
        
        const index = tokens.findIndex(token => token.access_token === data.access_token);
        if (index > -1) {
            tokens[index] = data;
        } else {
            tokens.push(data);
        }

        this.saveFile(tokens);
    }


    private static openFile(): DiscordToken[] {
        return JSON.parse(fs.readFileSync("./data/auth/tokens.json", "utf8"));
    }

    private static saveFile(data: DiscordToken[]) {
        fs.writeFileSync("./data/auth/tokens.json", JSON.stringify(data));
    }

}

