'use strict';

const EC = protractor.ExpectedConditions;

class ElementHelper {

    constructor() {

    };

    waitForVisibilityOf(element) {
        logger.info(`wait for visibility of element ${element}`);
        return browser.wait(EC.visibilityOf(element));
    }

    waitForClickabilityOf(element) {
        logger.info(`wait for clickability of element ${element}`);
        return browser.wait(EC.elementToBeClickable(element));
    }

    clickOn(element) {
        logger.info(`click on element ${element}`);
        return element.click();
    }

    getCoordinatesOf(element) {
        logger.info(`get coordinates of element ${element}`);
        return element.getLocation();
    }

    focusOn(element) {
        logger.info(`focus on element ${element}`);
        return browser.switchTo().activeElement(element.getWebElement());
    }

    typeTextIn(element, text) {
        logger.info(`type ${text} in element ${element}`);
        return element.sendKeys(text);
    }

    clear(element) {
        logger.info(`clear element ${element}`);
        return element.clear();
    }

    checkAttribute(element, attribute, value) {
        logger.info(`attribute ${attribute} of ${element} should be ${value}`);
        return expect(element.getAttribute(attribute)).toBe(value);
    }
}

module.exports = ElementHelper;