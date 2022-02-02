import fs from "fs"
import path from "path"

export default class FileManager {

    public static manageUpload(code: string, data: {
        username: string,
        itemName: string,
        ip?: string,
    }) {

        this.checkForFolders();

        const fileData = {
            code: code,
            username: data.username,
            ip: data.ip,
            item: data.itemName,
            date: Date.now()
        }

        fs.writeFileSync(path.resolve(`data/info/${code}.json`), JSON.stringify(fileData));
        fs.copyFile(path.resolve(`temp/${code}.png`), path.resolve(`data/images/${code}.png`), (err: any) => {
            if (err) {
                console.error(err)
            } else {
                fs.unlinkSync(path.resolve(`temp/${code}.png`));
            }
        })

    }

    private static checkForFolders() {
        if (!fs.existsSync(path.resolve("data"))) {
            fs.mkdirSync(path.resolve("data"));
        }
        if (!fs.existsSync(path.resolve("data/info"))) {
            fs.mkdirSync(path.resolve("data/info"));
        }
        if (!fs.existsSync(path.resolve("data/images"))) {
            fs.mkdirSync(path.resolve("data/images"));
        }
    }

}