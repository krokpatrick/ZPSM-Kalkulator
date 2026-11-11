import {test, describe } from "node:test";
import assert from "node:assert/strict";

import { evaluate, ExpressionError } from "./evaluate.ts";

describe('operator precedence', () => {
    test('multiplication binds tighter than addition', () => {
        assert.equal(evaluate('2+2x2'), 6);
    });

    test('parentheses change the order of operations', () => {
        assert.equal(evaluate('(2+2)x2'), 8);
    });

    test('division happens before substraction', () => {
        assert.equal(evaluate('10-6÷2'), 7);
    });

    test('operations are evaluated from left to right', () => {
        assert.equal(evaluate('10-3-2'), 5);
    });
});

describe('operators', () => {
    test('multiplication symbol works', () => {
        assert.equal(evaluate('3x4'), 12);
    });

    test('division symbol works', () => {
        assert.equal(evaluate('6÷2'), 3);
    });
});

describe('number handling', () => {
    test('decimal comma works', () => {
        assert.equal(evaluate('1.5+1'), 2.5);
    });

    test('leading minus works', () => {
        assert.equal(evaluate('-5+3'), -2);
    });

    test('decimal numbers are calculated correctly', () => {
        assert.ok(Math.abs(evaluate('0,1+0,2') - 0.3) < 1e-9);
    });
});

describe('what has to fail', () => {
    test('division by zero is an error, not Infinity', () => {
        assert.throws(() => evaluate('1÷0'), ExpressionError);
    });

    test('empty expression throws an error', () => {
        assert.throws(() => evaluate(''), ExpressionError);
    });

    test('unfinished expression throws an error', () => {
        assert.throws(() => evaluate('2+'), ExpressionError);
    });

    test('unclosed parenthesis throws an error', () => {
        assert.throws(() => evaluate('(2+2'), ExpressionError);
    });
});