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
     * scroll to given element if it is not on screen
     * @param {ElementFinder} element - link on element from DOM
     * @return {Promise} scrolling function if element is not on screen or nothing in the another case
     */
    scrollIfItNecessary(element) {
        if (!this.elementHelper.isElementOnScreen(element))
            return this.browserHelper.scrollTo(this.elementHelper.getCoordinatesOf(element));
        return;
    }

    /**
     * wait for visibility of element, focus on it, clear input field, type text in it and lose focus
     * @param {ElementFinder} element - link on element from DOM
     * @param {string} text - text for typing in element
     * @return {Promise} sequence of actions
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
     * wait for visibility of element, scroll to element if it necessary, wait for clickability of it and click
     * @param {ElementFinder} element - link on element from DOM
     * @return {Promise} sequence of actions
     */
    scrollAndWaitAndClick(element) {
        logger.info(`scroll and wait and click ${element}`);
        return this.elementHelper.waitForVisibilityOf(element)
            .then(() => this.scrollIfItNecessary(this.elementHelper.getCoordinatesOf(element)))
            .then(() => this.elementHelper.waitForClickabilityOf(element))
            .then(() => this.elementHelper.clickOn(element));
    }

    /**
     * wait for visibility of element, scroll to element if it necessary, wait for clickability of it and click and then wait given title
     * @param {ElementFinder} element - link on element from DOM
     * @param {string} title - page title that is expected
     * @return {Promise} sequence of actions
     */
    scrollAndWaitAndClickAndWaitTitleIs(element, title) {
        logger.info(`scroll and wait and click ${element} and wait until title is ${title}`);
        return this.scrollAndWaitAndClick(element)
            .then(() => this.browserHelper.waitTitleIs(title));
    }

    /**
     * find selected element from dropdown list and return it value
     * @param {ElementFinder} select - link on dropdown list from DOM
     * @return {Promise} value of selected element from dropdown list or massage if no element was selected
     */
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

    /**
     * find element from dropdown list by value or part of value and select it
     * @param {ElementFinder} select - link on dropdown list from DOM
     * @param {string} value - value of element which should be selected
     * @return {Promise} select action or massage if element with given value of part of value was not found in dropdown list
     */
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

    /**
     * find selected element from radiogroup and return it value
     * @param {ElementFinder} radiogroup - link on radiogroup from DOM
     * @return {Promise} value of selected element from radiogroup or massage if no element was selected
     */
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

    /**
     * find element from radiogroup by value or part of value and select it
     * @param {ElementFinder} radiogroup - link on radiogroup from DOM
     * @param {string} value - value of element which should be selected
     * @return {Promise} select action or massage if element with given value of part of value was not found in radiogroup
     */
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

