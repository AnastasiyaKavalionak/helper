'use strict';

const EC = protractor.ExpectedConditions;

class BrowserHelper {

    constructor() {

    };

    /**
     * open page by given url
     * @param {string} url - url of webpage
     * @return {Promise} open page action
     */
    openPage(url) {
        logger.info(`open page ${url}`);
        return browser.get(url);
    }

    /**
     * check title of webpage
     * @param {string} title - title which should be
     * @return {jasmine.matcher} is title of webpage will be equal to given title
     */
    checkTitle(title) {
        logger.info(`check title ${title}`);
        return expect(browser.getTitle()).toBe(title);
    }

    /**
     * closing browser
     * @return {Promise} browser closing action
     */
    closeBrowser() {
        logger.info(`close browser`);
        return browser.close();
    }

    /**
     * scroll window to given coordinates
     * @param {Object} coordinates - given window coordinates x and y
     * @return {Promise} scrolling window to coordinates action
     */
    scrollTo(coordinates) {
        logger.info(`scroll to  coordinates ${coordinates.x}, ${coordinates.y}`);
        return browser.executeScript(`window.scrollTo(${coordinates.x}, ${coordinates.y})`);
    }

    /**
     * wait until title of webpage will be equal given title
     * @param {string} title - title which should be
     * @return {Promise} waiting title of webpage will be equal given title action
     */
    waitTitleIs(title) {
        logger.info(`wait until title is ${title}`);
        return browser.wait(EC.titleIs(title));
    }

    /**
     * focus on current window
     * @return {Promise} focus action
     */
    focusOnCurrentWindow() {
        logger.info('focus on current window');
        return browser.switchTo().window(browser.getWindowHandle());
    }
}

module.exports = BrowserHelper;