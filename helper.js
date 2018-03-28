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


    scrollIfItNecessary(element) {
        if (!this.elementHelper.isElementOnScreen(element))
            return this.browserHelper.scrollTo(this.elementHelper.getCoordinatesOf(element));
        return;
    }

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
     *
     * @param {ElementFinder} element - link on element from DOM
     * @param {boolean} scrollFlag - show needs of scrolling
     * @param {string} title - page title that is expected
     * @return
     */

    scrollAndWaitAndClickAndWaitTitleIs(element, scrollFlag, title) {
        logger.info(`scroll and wait and click ${element} and wait until title is ${title}`);
        return this.scrollAndWaitAndClick(element, scrollFlag)
            .then(() => this.browserHelper.waitTitleIs(title));
    }

    getValueOfSelectedItemFromList(select) {
        return this.scrollIfItNecessary(select)
            .then(() => select.element(by.css(`option :selected="selected"`)).isPresent())
            .then((result) => {
                if (result)
                    return this.elementHelper.getAttribute(select.element(by.css(`option :selected="selected"`)), 'value');
                else
                    return 'this dropdown list have no selected elements';
            });
    }

    selectElementByValueFromList(select, value) {
        return this.scrollIfItNecessary(select)
            .then(() => select.element(by.css(`option :value="${value}"`)).isPresent())
                .then((result) => {
                    if (result)
                        return this.elementHelper.clickOn(select.element(by.css(`option :value="${value}"`)));
                    else
                        return select.element(by.css(`option :value*="${value}"`)).isPresent()
                            .then((result) => {
                                if (result)
                                    return this.elementHelper.clickOn(select.element(by.css(`option :value*="${value}"`)));
                                else
                                    return `element with value ${value} is not exist in this dropdown list`;
                            });
                });
    }

    getValueOfSelectedItemFromRadiogroup(radiogroup) {
        return this.scrollIfItNecessary(radiogroup)
            .then(() => radiogroup.element(by.css('input :checked')).isPresent())
            .then((result) => {
                if (result)
                    return this.elementHelper.getAttribute(radiogroup.element(by.css('input :checked')), 'value');
                else
                    return 'this radiogroup have no selected elements';
            });
    }

    selectElementByValueOfFromRadiogroup(radiogroup, value) {
        return this.scrollIfItNecessary(radiogroup)
            .then(() => radiogroup.element(by.css(`input :value="${value}"`)).isPresent())
                .then((result) => {
                    if (result)
                        return this.elementHelper.clickOn(radiogroup.element(by.css(`input :value="${value}"`)));
                    else
                        return radiogroup.element(by.css(`input :value*="${value}"`)).isPresent()
                            .then((result) => {
                                if (result)
                                    return this.elementHelper.clickOn(radiogroup.element(by.css(`input :value*="${value}"`)));
                                else
                                    return `element with value ${value} is not exist in this radiogroup`;
                            });
                });
    }

}

module.exports = new Helper();

