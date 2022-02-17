import fs from "fs"
import path from "path"
import { PageBuilderData } from "../types";

export default class PageUtils {

    private static generatePage(input: string, replace: PageBuilderData) {

        let output = input;

        Object.keys(replace).forEach(key => {
            const regex = new RegExp(`%%${key}`, "g");
            console.log(regex)
            output = output.replace(regex, replace[key]);
        });

        return output;
    }

    public static buildPage(template: string, data: PageBuilderData) {
            const page = fs.readFileSync(path.resolve("./modules/pageBuilders/templates/" + template + ".html"), "utf8");
            return this.generatePage(page, data);
    }
}