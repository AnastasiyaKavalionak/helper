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

    waitTitleIs(title) {
        logger.info(`wait until title is ${title}`);
        return browser.wait(EC.titleIs(title));
    }

    focusOnCurrentWindow() {
        logger.info('focus on currwnt window');
        return browser.switchTo().window(browser.getWindowHandle());
    }
}

module.exports = BrowserHelper;