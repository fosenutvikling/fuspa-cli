export const tsconfig = mainFile => {
    return `
    {
        "compilerOptions": {
            "target": "es5",
            "module": "commonjs"
        },
        "files": [
            "./${mainFile}"
        ]
    }
    `;
};
