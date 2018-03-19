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
        return this.elementHelper.waitForVisibilityOf(element)
            .then(() => this.elementHelper.focusOn(element))
            .then(() => this.elementHelper.clear(element))
            .then(() => this.elementHelper.typeTextIn(text, element));
    }

    scrollAndWaitAndClick(element, scrollFlag) {
        logger.info(`scroll and wait and click ${element}`);
        return this.elementHelper.waitForVisibilityOf(element)
            .then(() => scrollFlag ? this.browserHelper.scrollTo(this.elementHelper.getCoordinatesOf(element)) : {})
            .then(() => this.elementHelper.waitForClickabilityOf(element))
            .then(() => this.elementHelper.clickOn(element));
    }

    scrollAndWaitAndClickAndCheckTitle(element, scrollFlag, title) {
        logger.info(`scroll and wait and click ${element} and checked title should be ${title}`);
        return this.scrollAndWaitAndClick(element, scrollFlag)
            .then(() => this.browserHelper.checkTitle(title));
    }

    scrollAndWaitAndClickAndWaitTitleIs(element, scrollFlag, title) {
        logger.info(`scroll and wait and click ${element} and checked title should be ${title}`);
        return this.scrollAndWaitAndClick(element, scrollFlag)
            .then(() => this.browserHelper.waitTitleIs(title));
    }
}

module.exports = new Helper();

