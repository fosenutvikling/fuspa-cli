export interface ICopy {
    source: string,
    output: string
}
export const copyJs = (images: ICopy, fonts: ICopy) =>
    `
const ncp = require('ncp').ncp;
const base = require('./base');

base.info('Copying Files:');

ncp('${fonts.source}', '${fonts.output}', function (error) {
    base.print('Static Fonts: ');
    if (error) {
        base.error('Error: ');
        return console.error(error);
    }
    base.success('Success');
});

ncp('${images.source}', '${images.output}', function (error) {
    base.print('Static Images: ');
    if (error) {
        base.error('Error: ');
        return console.error(error);
    }
    base.success('Success');
});
`