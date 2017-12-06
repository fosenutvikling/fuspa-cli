const addFiles = files => {
    let output = '';
    for (let i = 0; i < files.length; ++i)
        output += `mkdirp.sync('${files[i]}');`
        return output;
};

export const createFoldersJs = (files) =>
    'const mkdirp = require("mkdirp");' + addFiles(files);