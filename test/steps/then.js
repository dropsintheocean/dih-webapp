/* eslint-disable new-cap, no-console, func-names, prefer-arrow-callback */
import chai from 'chai';
chai.Should();

module.exports = function () { // eslint-disable-line
    this.Then(/^I expect that element "(.*)" does exist$/, (selector) => {
        const elements = browser.elements(selector);
        elements.waitForExist(2000);
        elements.value.length.should.be.gt(0);
    });

    this.Then(/^I expect that element "(.*)" is visible$/, (field) => {
        const elements = this.currentPage[field];
        elements.value.length.should.be.gt(0);
    });

    this.Then(/^I expect that inputfield "(.*)" contains "(.*)"$/, (field, text) => {
        const element = this.currentPage[field];
        const value = element.getValue();
        value.should.equal(text);
    });

    this.Then(/^I expect that "(.*)" contains "(.*)"$/, (field, text) => {
        this.currentPage[field].waitForText(text, 3000);
        const value = this.currentPage[field].getText();
        value.should.contain(text);
    });

    this.Then(/^I expect that element "(.*)" does not exist$/, (selector) => {
        const elements = browser.elements(selector);
        elements.waitForExist(2000, true);
        elements.value.length.should.equal(0);
    });

    this.Then(/^I expect that title is equal to "(.*)"$/, (title) => {
        browser.getTitle().should.equal(title);
    });
};
