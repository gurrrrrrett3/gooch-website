import PageUtils from "./pageUtils";

export default class UserPageBuilder {
    public static Build(data: {
        id: string,
        username: string,
        avatar: string
    }) {

        return PageUtils.buildPage("userPage", {
            Username: data.username,
            Avatar: data.avatar,
            ID: data.id
        });

    }
}