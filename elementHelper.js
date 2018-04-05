'use strict';

const EC = protractor.ExpectedConditions;

class ElementHelper {

    constructor() {

    };

    /**
     * wait for visibility of element in DOM
     * @param {ElementFinder} element - link on element from DOM
     * @return {Promise} waiting for visibility of element action
     */
    waitForVisibilityOf(element) {
        logger.info(`wait for visibility of element ${element}`);
        return browser.wait(EC.visibilityOf(element));
    }

    /**
     * wait until element is clickable
     * @param {ElementFinder} element - link on element from DOM
     * @return {Promise} wait element to be clickable action
     */
    waitForClickabilityOf(element) {
        logger.info(`wait for clickability of element ${element}`);
        return browser.wait(EC.elementToBeClickable(element));
    }

    /**
     * click on element
     * @param {ElementFinder} element - link on element from DOM
     * @return {Promise} click action
     */
    clickOn(element) {
        logger.info(`click on element ${element}`);
        return element.click();
    }

    /**
     * get coordinates of element
     * @param {ElementFinder} element - link on element from DOM
     * @return {Promise} get coordinates action
     */
    getCoordinatesOf(element) {
        logger.info(`get coordinates of element ${element}`);
        return element.getLocation();
    }

    /**
     * focus on given element
     * @param {ElementFinder} element - link on element from DOM
     * @return {Promise} focus on element action
     */
    focusOn(element) {
        logger.info(`focus on element ${element}`);
        return browser.switchTo().activeElement(element.getWebElement());
    }

    /**
     * type given text in text field
     * @param {ElementFinder} element - link on element from DOM
     * @param {string} text - text for typing
     * @return {Promise} typing text action
     */
    typeTextIn(element, text) {
        logger.info(`type ${text} in element ${element}`);
        return element.sendKeys(text);
    }

    /**
     * clear text field
     * @param {ElementFinder} element - link on element from DOM
     * @return {Promise} clear action
     */
    clear(element) {
        logger.info(`clear element ${element}`);
        return element.clear();
    }

    /**
     * get value of given attribute of element
     * @param {ElementFinder} element - link on element from DOM
     * @param {string} attribute - attribute of element
     * @return {Promise} get attribute action
     */
    getAttribute(element, attribute) {
        logger.info(`attribute ${attribute} of ${element} is `);
        return element.getAttribute(attribute);
    }

    /**
     * check is value of given attribute of element equal to given value
     * @param {ElementFinder} element - link on element from DOM
     * @param {string} attribute - attribute of element
     * @param {string} value - value which should be
     * @return {Promise} is value of attribute of element equal given value
     */
    checkAttribute(element, attribute, value) {
        logger.info(`is attribute ${attribute} of element ${element} equal ${value}`);
        return this.getAttribute(element, attribute)
            .then((result) => {
                return result === value;
            });
    }

    /**
     * check is element visible on screen
     * @param {ElementFinder} element - link on element from DOM
     * @return {Promise} is element visible on screen
     */
    isElementOnScreen(element) {
        logger.info(`is element ${element} on screen`);
        return this.getCoordinatesOf(element)
            .then((result) => {
                return element.getSize().then((param) => {
                    return {x: result.x + param.width, y: result.y + param.height};
                });
            })
            .then((result) => {
                if (result.y > browser.driver.manage().window().getSize().getHeight() || result.x > browser.driver.manage().window().getSize().getWidth())
                    return false;
                else
                    return true;
            });
    }
}

module.exports = ElementHelper;