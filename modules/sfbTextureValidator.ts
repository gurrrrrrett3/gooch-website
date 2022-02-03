import imageSize from 'image-size';
import path from 'path';
import fs from 'fs';

export default class sfbTextureValidator {
    public static validate(code: string): boolean {
        const texturePath = path.resolve(`data/images/${code}.png`);
        if (fs.existsSync(texturePath)) {
            const dimensions = imageSize(texturePath);
            if (!dimensions.width || !dimensions.height)  return false;
            if (dimensions.width != 16 || dimensions.height != 16) {
                return false;
            }
            return true;
        } else return false;
    }
}
