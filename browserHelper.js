'use strict';

const EC = protractor.ExpectedConditions;

class BrowserHelper {

    constructor() {

    };

    openPage(url) {

        return browser.get(url);
    }

    CheckTitle(title) {

        return expect(browser.getTitle()).toBe(title);
    }
}

module.exports = BrowserHelper;