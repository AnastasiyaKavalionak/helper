'use script';

const log4js = require('log4js');
log4js.configure({
    appenders: {e2e: {type: 'file', filename: './output/e2e.log'}},
    categories: {default: {appenders: ['e2e'], level: 'All'}}
});
global.logger = log4js.getLogger('e2e');

const ElementHelper = require('./elementHelper');
const BrowserHelper = require('./browserHelper');

class Helper {

    constructor() {

        this.browserHelper = new BrowserHelper();
        this.elementHelper = new ElementHelper();
    };

    setTextInputValue(text, element) {
        logger.info(`set text input ${element} value ${text}`);
        helper.elementHelper.waitForVisibilityOf(element);
            helper.elementHelper.focusOn(element);
          helper.elementHelper.clear(element);
            helper.elementHelper.typeTextIn(text, element);
    }

    scrollAndWaitAndClick(element, scrollFlag) {
        logger.info(`scroll and wait and click ${element}`);
        return helper.elementHelper.waitForVisibilityOf(element)
            .then(() => scrollFlag ? helper.browserHelper.scrollTo(helper.elementHelper.getCoordinatesOf(element)) : {})
            .then(() => helper.elementHelper.waitForClickabilityOf(element))
            .then(() => helper.elementHelper.clickOn(element));
    }
}

module.exports = new Helper();

