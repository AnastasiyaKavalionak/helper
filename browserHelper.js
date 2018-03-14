'use strict';

const EC = protractor.ExpectedConditions;

class BrowserHelper {

    constructor() {

    };

    openPage(url) {

        return browser.get(url);
    }

    checkTitle(title) {

        return expect(browser.getTitle()).toBe(title);
    }

    closeBrowser() {
        return browser.close();
    }

    scrollTo(coordinates) {

        return browser.executeScript(global.window.scrollTo(coordinates.x, coordinates.y));
    }
}

module.exports = BrowserHelper;