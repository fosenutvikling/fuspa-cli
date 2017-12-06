export const baseJs = () =>

    `
const chalk = require('chalk');

// Set up color fonts for printing
const error = msg => process.stdout.write(chalk.bold.red(msg));
const warning = msg => process.stdout.write(chalk.keyword('orange')(msg));
const success = msg => process.stdout.write(chalk.keyword('green')(msg));
const info = msg => process.stdout.write(chalk.keyword('cyan')(msg));
const print = msg => process.stdout.write(chalk.keyword('white')(msg));


module.exports = {
    error,
    warning,
    success,
    info,
    print
}
`;