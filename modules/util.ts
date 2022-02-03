import StateManager from "./stateManager";

export default class Util {

    public static genCode(): string {

        //generate a random 6 character (A-Z) string
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        }
        return code;
    }

    public static buildDiscordAuthURL(clientID: string, redirectURI: string, scope: string) {
        const state = StateManager.genSatate();
        return `https://discordapp.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}&state=${state}`;
    }

}