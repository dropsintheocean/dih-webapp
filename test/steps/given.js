/* eslint-disable new-cap */
import { getUserObject } from '../helpers';
module.exports = function () { // eslint-disable-line
    this.Given(/^I open the page "(.*)"$/, (page) => {
        const object = require(`../pages/${page}.page`);
        this.currentPage = object;
        object.open();
    });

    this.Given(/^I open the page "(.*)" as "(.*)"$/, (page, role) => {
        const object = require(`../pages/${page}.page`);
        this.currentUser = getUserObject(role);
        this.currentPage = object;
        object.open();
    });

    this.Given(/^I open the url "(.*)"$/, (page) => {
        browser.url(browser.options.baseUrl + page);
    });
};
