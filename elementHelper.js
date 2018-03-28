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

    getAttribute(element, attribute) {
        logger.info(`attribute ${attribute} of ${element} is `);
        return element.getAttribute(attribute);
    }

    checkAttribute(element, attribute, value) {
        logger.info(`is attribute ${attribute} of element ${element} equal ${value}`);
        return this.getAttribute(element, attribute)
            .then((result) => {
                return result === value;
            });
    }

    checkIsElementSelected(element) {
        logger.info(`is element ${element} selected`);
        return EC.elementToBeSelected(element);
    }

    isElementOnScreen(element) {
        logger.info(`is element ${element} on screen`);
        return this.getCoordinatesOf(element)
            .then((result) => {
                if (result.y > driver.manage().window().getSize().getHeight() || result.x > driver.manage().window().getSize().getWidth())
                    return false;
                else
                    return true;
            });
    }
}

module.exports = ElementHelper;