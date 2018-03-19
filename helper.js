'use script';

const log4js = require('log4js');
log4js.configure({
    appenders: { e2e: { type: 'file', filename: './output/e2e.log' } },
    categories: { default: { appenders: ['e2e'], level: 'All' } }
});
global.logger = log4js.getLogger('e2e');

const ElementHelper = require('./elementHelper');
const BrowserHelper = require('./browserHelper');

class Helper {

    constructor () {

        this.browserHelper = new BrowserHelper();
        this.elementHelper = new ElementHelper();
    };

    setTextInputValue(text, element) {
        logger.info(`set text input ${element} value ${text}`);
        return helper.elementHelper.waitForVisibilityOf(element)
            .then(() => helper.elementHelper.focusOn(element))
            .then(() => helper.elementHelper.clear(element))
            .then(() => helper.elementHelper.typeTextIn(text, element));
    }

    scrollAndWaitAndClick(element) {

        return
    }
}

module.exports = new Helper();

