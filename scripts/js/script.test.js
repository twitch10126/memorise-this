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

describe("game tests", () => {

    describe("game object tests", () => {

        test("game speed is 1000ms", () => {
            expect(game.speed).toBe(1000);
        });

        test("game round is equal to 1", () => {
            expect(game.round).toBe(1);
        });

        test("game sequence is equal to an empty array", () => {
            expect(game.gameSequence).toEqual([]);
        });

        test("user sequence is equal to an empty array", () => {
            expect(game.userSequence).toEqual([]);
        });

        test("game colors array is ['red', 'blue', 'green', 'purple']", () => {
            expect(game.colors).toEqual(["red", "blue", "green", "purple"]);
        });

        test("active is set to false", () => {
            expect(game.active).toBe(false);
        });

        test("aiTurn is set to false", () => {
            expect(game.aiTurn).toBe(false);
        });

        test("restart is set to false", () => {
            expect(game.restart).toBe(false);
        });

        test("isMuted is set to true", () => {
            expect(game.isMuted).toBe(true);
        });

    });
});