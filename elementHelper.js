'use strict';

const EC = protractor.ExpectedConditions;

class ElementHelper {

    constructor() {

    };

    waitForVisibilityOf(element) {

        return browser.wait(EC.visibilityOf(element));
    }

    waitForClickabilityOf(element) {

        return browser.wait(EC.elementToBeClickable(element));
    }

    clickOn(element) {

        return element.click();
    }

    getCoordinatesOf(element) {

        return element.getLocation();
    }

    focusOn(element) {

        return broser.switchTo().activeElement(element.getWebElement());
    }

    typeTextIn(text, element) {

        return element.sendKeys(text);
    }

    clear(element) {

        return element.clear();
    }


}

module.exports = ElementHelper;