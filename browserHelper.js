'use strict';

const EC = protractor.ExpectedConditions;

class BrowserHelper {

    constructor() {

    };

    openPage(url) {
        logger.info(`open page ${url}`);
        return browser.get(url);
    }

    checkTitle(title) {
        logger.info(`check title ${title}`);
        return expect(browser.getTitle()).toBe(title);
    }

    closeBrowser() {
        logger.info(`close browser`);
        return browser.close();
    }

    scrollTo(coordinates) {
        logger.info(`scroll to  coordinates ${coordinates.x}, ${coordinates.y}`);
        return browser.executeScript(`window.scrollTo(${coordinates.x}, ${coordinates.y})`);
    }
}

module.exports = BrowserHelper;