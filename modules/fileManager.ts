import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import sfbTextureValidator from "./sfbTextureValidator";
import SfbUserManager from "./sfbUserManager";

export default class FileManager {
  public static manageUpload(
    code: string,
    data: {
      username: string;
      itemName: string;
      ip?: string;
    }
  ) {
    this.checkForFolders();

    const fileData = {
      code: code,
      username: data.username,
      ip: data.ip,
      item: data.itemName,
      date: Date.now(),
    };

    if (!sfbTextureValidator.validate(code)) {
      return {
        success: false,
        message: "Invalid texture, image needs to be 16x16.",
      };
    }

    fs.writeFileSync(path.resolve(`data/info/${code}.json`), JSON.stringify(fileData));
    fs.copyFile(path.resolve(`temp/${code}.png`), path.resolve(`data/images/${code}.png`), (err: any) => {
      if (err) {
        console.error(err);
      } else {
        fs.unlinkSync(path.resolve(`temp/${code}.png`));
      }
    });

    return {
      success: true,
      message: `File uploaded! Code: ${code}`,
    };
  }

  public static async manageBotUpload(
    code: string,
    data: {
      id: string;
      itemName: string;
      url: string;
    }
  ) {

    console.log(data)

    const response = await fetch(data.url);
    const buffer = await response.arrayBuffer();
    const file = Buffer.from(buffer);

    fs.writeFileSync(path.resolve(`temp/${code}.png`), file);

    const user = SfbUserManager.getUser(data.id);

    if (!user) return {
        success: false,
        message: "User not found",
    };

    return this.manageUpload(code, {
      username: user.username,
      itemName: data.itemName,
      ip: "DISCORD",
    });
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
