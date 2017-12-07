import * as fs from 'fs';

export const envSlash = () => {
    return process.platform == 'win32' ? '\\' : '/';
}

export const createFolder = (path) => {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    return fs.existsSync(path);
}

export interface IFileContent {
    filename: string;
    textContent: string;
}