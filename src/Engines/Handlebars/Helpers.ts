export const Helpers = `
/**
* Helpers for Handlebars templates
* Refer to a helper, using its name i.e. {{helpername data-1 data-2 ... data-n}}
*/

import * as moment from 'moment';

const defaultDateFormat = 'YYYY-MM-DD';

export = function (Handlebars) {
let globalVariables = {};

var helpers = {      
    concat: function () {
        var arg = Array.prototype.slice.call(arguments, 0);
        arg.pop(); // Remove options parameter
        return arg.join('');
    },
    array: function (...parameters) {
        parameters.pop(); // Remove option parameter
        return parameters;
    },
    date: function (date, options) {
        return moment(date, options.hash.parse || moment.ISO_8601).format(options.hash.format || defaultDateFormat);
    },
    ago: function (date) {
        return moment(date, options.hash.parse || moment.ISO_8601).fromNow();
    }
};

if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (let prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
} else { // return helper object if registration of helper can't complete
    return helpers;
}
}`;
