export interface SFBUser {
    id: string;
    username: string;
    joinDate: number;
    lastLogin: number;
    
}

    export interface DiscordToken {
    access_token: string,
    expires_in: number,
    refresh_token: string,
    scope: string,
    token_type: string
}

export interface PageBuilderData {
    [key: string]: string;
}

