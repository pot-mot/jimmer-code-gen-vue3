import {describe, it, expect} from 'vitest';
import {deepEquals} from '../deepEquals';

describe('deepEquals', () => {
    it('same primitive values', () => {
        expect(deepEquals(1, 1)).toBe(true);
        expect(deepEquals('hello', 'hello')).toBe(true);
        expect(deepEquals(true, true)).toBe(true);
        expect(deepEquals(false, false)).toBe(true);
        expect(deepEquals(null, null)).toBe(true);
        expect(deepEquals(undefined, undefined)).toBe(true);
    });

    it('different primitive values', () => {
        expect(deepEquals(1, 2)).toBe(false);
        expect(deepEquals('hello', 'world')).toBe(false);
        expect(deepEquals(true, false)).toBe(false);
        expect(deepEquals(null, undefined)).toBe(false);
        expect(deepEquals(1, '1')).toBe(false);
    });

    it('same object reference', () => {
        const obj = {a: 1};
        expect(deepEquals(obj, obj)).toBe(true);
    });

    it('equals object', () => {
        const obj1 = {a: 1, b: 2};
        const obj2 = {a: 1, b: 2};
        expect(deepEquals(obj1, obj2)).toBe(true);
    });

    it('different property value', () => {
        const obj1 = {a: 1, b: 2};
        const obj2 = {a: 1, b: 3};
        expect(deepEquals(obj1, obj2)).toBe(false);
    });

    it('different number of keys', () => {
        const obj1 = {a: 1};
        const obj2 = {a: 1, b: 2};
        expect(deepEquals(obj1, obj2)).toBe(false);
    });

    it('equals nested objects', () => {
        const obj1 = {a: {b: {c: 1}}};
        const obj2 = {a: {b: {c: 1}}};
        expect(deepEquals(obj1, obj2)).toBe(true);
    });

    it('different nested objects', () => {
        const obj1 = {a: {b: {c: 1}}};
        const obj2 = {a: {b: {c: 2}}};
        expect(deepEquals(obj1, obj2)).toBe(false);
    });

    it('equals arrays', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [1, 2, 3];
        expect(deepEquals(arr1, arr2)).toBe(true);
    });

    it('different array lengths', () => {
        const arr1 = [1, 2];
        const arr2 = [1, 2, 3];
        expect(deepEquals(arr1, arr2)).toBe(false);
    });

    it('different array elements', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [1, 2, 4];
        expect(deepEquals(arr1, arr2)).toBe(false);
    });

    it('different type', () => {
        const arr = [1, 2, 3];
        const obj = {0: 1, 1: 2, 2: 3};
        expect(deepEquals(arr, obj)).toBe(false);
    });

    it('empty', () => {
        expect(deepEquals({}, {})).toBe(true);
        expect(deepEquals([], [])).toBe(true);
    });
});
