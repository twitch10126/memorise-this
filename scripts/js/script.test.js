/**
 * @jest-environment jsdom
 */

/* jshint esversion: 11 */

/* jshint -W079 */

// logic help from chatGPT to get my tests to run with jquery
const $ = require('jquery');
global.$ = $;
global.jQuery = $;

const { describe, beforeAll, test, expect } = require("@jest/globals");
const { game, nextColor, nextRound } = require('./script.js');

// load html into test environment
beforeAll(() => {
    const fs = require('fs');
    const fileContents = fs.readFileSync("index.html", "utf-8");
    document.body.innerHTML = fileContents;
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


    describe("nextColor tests", () => {
        test("nextColor pushes randomColor into gameSequence array ", () => {
            nextColor();
            expect(game.gameSequence.length).toBe(1);
        });
    });

    describe("nextRound tests", () => {
        test("nextRound increases round by 1 ", () => {
            game.round = 2;
            nextRound();
            expect(game.round).toBe(3);
        });

        test("nextRound sequence is reset to an empty array ", () => {
            nextRound();
            expect(game.userSequence).toEqual([]);
        });

        test("Score is updated with current round", () => {
            game.round = 4;
            nextRound();
            expect($("#score").text()).toEqual(game.round.toString());
        });
    });

});
