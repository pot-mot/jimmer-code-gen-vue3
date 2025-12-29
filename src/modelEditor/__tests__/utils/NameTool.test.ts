import {describe, it, expect} from 'vitest'
import { nameTool } from '@/modelEditor/utils/NameTool'

describe('NameTool', () => {
    describe('splitCamel', () => {
        it('should split camel case names correctly', () => {
            expect(nameTool.splitCamel('camelCase')).toEqual(['camel', 'Case'])
            expect(nameTool.splitCamel('XMLHttpRequest')).toEqual(['XML', 'Http', 'Request'])
            expect(nameTool.splitCamel('HTMLElement')).toEqual(['HTML', 'Element'])
            expect(nameTool.splitCamel('iPhone')).toEqual(['i', 'Phone'])
            expect(nameTool.splitCamel('simple')).toEqual(['simple'])
        })
    })

    describe('splitSnake', () => {
        it('should split snake case names correctly', () => {
            expect(nameTool.splitSnake('snake_case')).toEqual(['snake', 'case'])
            expect(nameTool.splitSnake('UPPER_CASE')).toEqual(['UPPER', 'CASE'])
            expect(nameTool.splitSnake('simple')).toEqual(['simple'])
        })
    })

    describe('splitKebab', () => {
        it('should split kebab case names correctly', () => {
            expect(nameTool.splitKebab('kebab-case')).toEqual(['kebab', 'case'])
            expect(nameTool.splitKebab('UPPER-CASE')).toEqual(['UPPER', 'CASE'])
            expect(nameTool.splitKebab('simple')).toEqual(['simple'])
        })
    })

    describe('toUpperCamel', () => {
        it('should convert parts to upper camel case', () => {
            expect(nameTool.toUpperCamel(['upper', 'camel', 'case'])).toBe('UpperCamelCase')
            expect(nameTool.toUpperCamel(['simple'])).toBe('Simple')
            expect(nameTool.toUpperCamel([])).toBe('')
        })
    })

    describe('toLowerCamel', () => {
        it('should convert parts to lower camel case', () => {
            expect(nameTool.toLowerCamel(['lower', 'camel', 'case'])).toBe('lowerCamelCase')
            expect(nameTool.toLowerCamel(['Simple', 'Case'])).toBe('simpleCase')
            expect(nameTool.toLowerCamel([])).toBe('')
        })
    })

    describe('toUpperSnake', () => {
        it('should convert parts to upper snake case', () => {
            expect(nameTool.toUpperSnake(['upper', 'snake', 'case'])).toBe('UPPER_SNAKE_CASE')
            expect(nameTool.toUpperSnake(['simple'])).toBe('SIMPLE')
            expect(nameTool.toUpperSnake([])).toBe('')
        })
    })

    describe('toLowerSnake', () => {
        it('should convert parts to lower snake case', () => {
            expect(nameTool.toLowerSnake(['Lower', 'Snake', 'Case'])).toBe('lower_snake_case')
            expect(nameTool.toLowerSnake(['SIMPLE'])).toBe('simple')
            expect(nameTool.toLowerSnake([])).toBe('')
        })
    })

    describe('toUpperKebab', () => {
        it('should convert parts to upper kebab case', () => {
            expect(nameTool.toUpperKebab(['upper', 'kebab', 'case'])).toBe('UPPER-KEBAB-CASE')
            expect(nameTool.toUpperKebab(['simple'])).toBe('SIMPLE')
            expect(nameTool.toUpperKebab([])).toBe('')
        })
    })

    describe('toLowerKebab', () => {
        it('should convert parts to lower kebab case', () => {
            expect(nameTool.toLowerKebab(['Lower', 'Kebab', 'Case'])).toBe('lower-kebab-case')
            expect(nameTool.toLowerKebab(['SIMPLE'])).toBe('simple')
            expect(nameTool.toLowerKebab([])).toBe('')
        })
    })

    describe('convert', () => {
        it('should convert between different naming strategies', () => {
            // Camel to Snake
            expect(nameTool.convert('camelCase', 'LOWER_CAMEL', 'LOWER_SNAKE')).toBe('camel_case')
            expect(nameTool.convert('CamelCase', 'UPPER_CAMEL', 'UPPER_SNAKE')).toBe('CAMEL_CASE')

            // Snake to Camel
            expect(nameTool.convert('snake_case', 'LOWER_SNAKE', 'LOWER_CAMEL')).toBe('snakeCase')
            expect(nameTool.convert('SNAKE_CASE', 'UPPER_SNAKE', 'UPPER_CAMEL')).toBe('SnakeCase')

            // Kebab to Camel
            expect(nameTool.convert('kebab-case', 'LOWER_KEBAB', 'LOWER_CAMEL')).toBe('kebabCase')
            expect(nameTool.convert('KEBAB-CASE', 'UPPER_KEBAB', 'UPPER_CAMEL')).toBe('KebabCase')

            // Camel to Kebab
            expect(nameTool.convert('camelCase', 'LOWER_CAMEL', 'LOWER_KEBAB')).toBe('camel-case')
            expect(nameTool.convert('CamelCase', 'UPPER_CAMEL', 'UPPER_KEBAB')).toBe('CAMEL-CASE')

            // Snake to Kebab
            expect(nameTool.convert('snake_case', 'LOWER_SNAKE', 'LOWER_KEBAB')).toBe('snake-case')
            expect(nameTool.convert('SNAKE_CASE', 'UPPER_SNAKE', 'UPPER_KEBAB')).toBe('SNAKE-CASE')
        })
    })
})
