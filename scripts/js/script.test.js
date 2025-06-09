/**
 * @jest-environment jsdom
 */

// logic help from chatGPT to get my tests to run with jquery
const $ = require('jquery');
global.$ = $;
global.jQuery = $;

const { game, nextColor, nextRound } = require('./script.js');

// load html into test environment
beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});
