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
}

module.exports = BrowserHelper;