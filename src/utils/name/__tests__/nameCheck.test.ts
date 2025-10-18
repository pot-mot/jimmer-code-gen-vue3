import {describe, it, expect} from "vitest";
import {checkLowerCamelName, checkUpperCamelName} from "@/utils/name/nameCheck.ts";

// 测试用例
describe('nameCheck', () => {
    describe('checkUpperCamelName', () => {
        it('应该返回true - 有效的大驼峰命名', () => {
            expect(checkUpperCamelName('UserName')).toBe(true);
            expect(checkUpperCamelName('User_Name')).toBe(true);
            expect(checkUpperCamelName('XMLHttpRequest')).toBe(true);
            expect(checkUpperCamelName('UserId')).toBe(true);
            expect(checkUpperCamelName('UserProfileSettings')).toBe(true);
        });

        it('应该返回false - 无效的大驼峰命名', () => {
            expect(checkUpperCamelName('')).toBe(false);
            expect(checkUpperCamelName('userName')).toBe(false); // 小写字母开头
            expect(checkUpperCamelName('123Name')).toBe(false); // 数字开头
            expect(checkUpperCamelName('_Name')).toBe(false); // 下划线开头
            expect(checkUpperCamelName('User-Name')).toBe(false); // 包含连字符
            expect(checkUpperCamelName('User Name')).toBe(false); // 包含空格
            expect(checkUpperCamelName(null as any)).toBe(false); // null值
            expect(checkUpperCamelName(undefined as any)).toBe(false); // undefined值
        });
    });

    describe('checkLowerCamelName', () => {
        it('应该返回true - 有效的小驼峰命名', () => {
            expect(checkLowerCamelName('userName')).toBe(true);
            expect(checkLowerCamelName('user_name')).toBe(true);
            expect(checkLowerCamelName('xmlHttpRequest')).toBe(true);
            expect(checkLowerCamelName('userId')).toBe(true);
            expect(checkLowerCamelName('userProfileSettings')).toBe(true);
        });

        it('应该返回false - 无效的小驼峰命名', () => {
            expect(checkLowerCamelName('')).toBe(false);
            expect(checkLowerCamelName('UserName')).toBe(false); // 大写字母开头
            expect(checkLowerCamelName('123name')).toBe(false); // 数字开头
            expect(checkLowerCamelName('_name')).toBe(false); // 下划线开头
            expect(checkLowerCamelName('user-name')).toBe(false); // 包含连字符
            expect(checkLowerCamelName('user name')).toBe(false); // 包含空格
            expect(checkLowerCamelName(null as any)).toBe(false); // null值
            expect(checkLowerCamelName(undefined as any)).toBe(false); // undefined值
        });
    });
});
