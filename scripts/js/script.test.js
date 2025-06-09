/**
 * @jest-environment jsdom
 */

// logic help from chatGPT to get my tests to run with jquery
const $ = require('jquery');
global.$ = $;
global.jQuery = $;

