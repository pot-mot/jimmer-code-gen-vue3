import {describe, it, expect} from "vitest";
import {checkLowerCamelName, checkNoBlank, checkUpperCamelName} from "@/utils/name/nameCheck.ts";

// 测试用例
describe('nameCheck', () => {
    describe('checkUpperCamelName', () => {
        it('UpperCamelName pass', () => {
            expect(checkUpperCamelName('UserName')).toBe(true);
            expect(checkUpperCamelName('User_Name')).toBe(true);
            expect(checkUpperCamelName('XMLHttpRequest')).toBe(true);
            expect(checkUpperCamelName('UserId')).toBe(true);
            expect(checkUpperCamelName('UserProfileSettings')).toBe(true);
        });

        it('UpperCamelName fail', () => {
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
        it('LowerCamelName pass', () => {
            expect(checkLowerCamelName('userName')).toBe(true);
            expect(checkLowerCamelName('user_name')).toBe(true);
            expect(checkLowerCamelName('xmlHttpRequest')).toBe(true);
            expect(checkLowerCamelName('userId')).toBe(true);
            expect(checkLowerCamelName('userProfileSettings')).toBe(true);
        });

        it('LowerCamelName fail', () => {
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

    describe('checkNoBlank', () => {
        it('NoBlank pass', () => {
            expect(checkNoBlank('username')).toBe(true)
            expect(checkNoBlank('user_name')).toBe(true)
            expect(checkNoBlank('userName')).toBe(true)
            expect(checkNoBlank('123abc')).toBe(true)
            expect(checkNoBlank('USER_NAME_123')).toBe(true)
            expect(checkNoBlank('')).toBe(false) // 空字符串
        })

        it('NoBlank fail', () => {
            expect(checkNoBlank('user name')).toBe(false) // 包含空格
            expect(checkNoBlank(' username')).toBe(false) // 开头有空格
            expect(checkNoBlank('username ')).toBe(false) // 结尾有空格
            expect(checkNoBlank('user  name')).toBe(false) // 多个空格
            expect(checkNoBlank('user\tname')).toBe(false) // 包含制表符
            expect(checkNoBlank('user\nname')).toBe(false) // 包含换行符
            expect(checkNoBlank('user\rname')).toBe(false) // 包含回车符
            expect(checkNoBlank(null as any)).toBe(false) // null值
            expect(checkNoBlank(undefined as any)).toBe(false) // undefined值
            expect(checkNoBlank(123 as any)).toBe(false) // 非字符串值
        })
    })
});
