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

    /**
     * @param {ElementFinder} element - link on element from DOM
     * @param {string} text - text for typing in element
     */
    setTextInputValue(element, text) {
        logger.info(`set text input ${element} value ${text}`);
        return this.elementHelper.waitForVisibilityOf(element)
            .then(() => this.elementHelper.focusOn(element))
            .then(() => this.elementHelper.clear(element))
            .then(() => this.elementHelper.typeTextIn(element, text))
            .then(() => this.browserHelper.focusOnCurrentWindow());
    }

    /**
     * @param {ElementFinder} element - link on element from DOM
     * @param {boolean} scrollFlag - show needs of scrolling
     */
    scrollAndWaitAndClick(element, scrollFlag) {
        logger.info(`scroll and wait and click ${element}`);
        return this.elementHelper.waitForVisibilityOf(element)
            .then(() => scrollFlag ? this.browserHelper.scrollTo(this.elementHelper.getCoordinatesOf(element)) : {})
            .then(() => this.elementHelper.waitForClickabilityOf(element))
            .then(() => this.elementHelper.clickOn(element));
    }

    /**
     * @param {ElementFinder} element - link on element from DOM
     * @param {boolean} scrollFlag - show needs of scrolling
     * @param {string} title - page title that is expected
     */

    scrollAndWaitAndClickAndWaitTitleIs(element, scrollFlag, title) {
        logger.info(`scroll and wait and click ${element} and wait until title is ${title}`);
        return this.scrollAndWaitAndClick(element, scrollFlag)
            .then(() => this.browserHelper.waitTitleIs(title));
    }

    getValueOfSelectedItemFromList(list) {
        return list.filter((element) => {
           return this.elementHelper.getAttribute(element, 'selected')
               .then((result) => {
                   if (result === 'selected')
                       return this.elementHelper.getAttribute(element, 'value');
               });
        })[0];
    }

    setValueOfSelectedItemFromList(list, value) {
        return list.filter((element) => {
            return this.elementHelper.getAttribute(element, 'value')
                .then((result) => {
                    if (result === 'value')
                        return this.elementHelper.clickOn(element);
                });
        })[0];
    }

    radioInputIsSelected(radiogroup, value) {
        return
    }

    radioInputValueOfSelected(radiogroup, value) {
        return
    }
}

module.exports = new Helper();

