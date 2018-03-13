'use script';

const ElementHelper = require('./elementHelper');
const BrowserHelper = require('./browserHelper');

class Helper {

    constructor () {

        this.browserHelper = new BrowserHelper();
        this.elementHelper = new ElementHelper();
    };
}

module.exports = new Helper();

