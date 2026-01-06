import {describe, it, expect} from 'vitest';
import {commonDiffKey} from '../commonDiffKey';

describe('commonDiffKey', () => {
    it('null', () => {
        expect(commonDiffKey(null)).toBe(' null ');
    });

    it('undefined', () => {
        expect(commonDiffKey(undefined)).toBe(' undefined ');
    });

    it('primitive values', () => {
        expect(commonDiffKey(123)).toBe(' num:123 ');
        expect(commonDiffKey('hello')).toBe(' str:hello ');
        expect(commonDiffKey(true)).toBe(' bool:true ');
        expect(commonDiffKey(false)).toBe(' bool:false ');
    });

    it('different objects', () => {
        const obj1 = {a: 1};
        const obj2 = {b: 2};
        const key1 = commonDiffKey(obj1);
        const key2 = commonDiffKey(obj2);

        expect(key1).not.toBe(key2);
        expect(key1).toContain(' obj:');
        expect(key2).toContain(' obj:');
    });

    it('same object reference', () => {
        const obj = {a: 1};
        const key1 = commonDiffKey(obj);
        const key2 = commonDiffKey(obj);

        expect(key1).toBe(key2);
    });

    it('array', () => {
        const arr = [1, 'hello', true];
        const key = commonDiffKey(arr);

        expect(key).toStrictEqual(" array:[ num:1 , str:hello , bool:true ] ")
    });

    it('nested array', () => {
        const nestedArr = [1, [2, 3]];
        const key = commonDiffKey(nestedArr);

        expect(key).toStrictEqual(" array:[ num:1 , array:[ num:2 , num:3 ] ] ")
    });

    it('array inner object', () => {
        const arr = [{a: 1}, {b: 2}];
        const key = commonDiffKey(arr);

        expect(key).toContain(' array:[ obj:')
    });

    it('equals object but different references', () => {
        const obj1 = {a: 1, b: 2};
        const obj2 = {a: 1, b: 2};
        const key1 = commonDiffKey(obj1);
        const key2 = commonDiffKey(obj2);

        expect(key1).not.toBe(key2);
    });

    it('nested circular references', () => {
        const obj1: any = {a: {b: 1}};
        obj1.a.self = obj1; // Create nested circular reference

        const obj2: any = {a: {b: 2}};
        obj2.a.self = obj2; // Create nested circular reference

        const key1 = commonDiffKey(obj1);
        const key2 = commonDiffKey(obj2);
        expect(key1).not.toBe(key2);
    })
});
