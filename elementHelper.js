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

    typeTextIn(text, element) {
        logger.info(`type ${text} in element ${element}`);
        return element.sendKeys(text);
    }

    clear(element) {
        logger.info(`clear element ${element}`);
        return element.clear();
    }

    focusAndClearAndTypeText(text, element) {

        return
    }

    scrollAndWaitAndClick(element) {

        return
    }
}

module.exports = ElementHelper;