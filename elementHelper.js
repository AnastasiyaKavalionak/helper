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

    scrollTo(element) {

        return browser.executeScript(element.scrollIntoView());
    }
}

module.exports = ElementHelper;