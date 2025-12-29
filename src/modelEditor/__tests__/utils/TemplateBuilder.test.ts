import {describe, it, expect} from 'vitest'
import {createTemplateBuilder} from '@/modelEditor/utils/TemplateBuilder.ts'

describe('TemplateBuilder', () => {
    it('append test', () => {
        const builder = createTemplateBuilder({
            indent: '',
            scope: {start: '', end: ''}
        })

        builder.append('Hello')
        builder.append('World')
        expect(builder.build()).toBe('HelloWorld')
        builder.clean()

        builder.append("    ")
        expect(builder.build()).toBe("    ")
        builder.clean()

        builder.append("")
        builder.append("     ")
        builder.append(" ")
        expect(builder.build()).toBe("      ")
    })

    it('append line test', () => {
        const builder = createTemplateBuilder({
            indent: '',
            scope: {start: '', end: ''}
        })

        builder.append('Hello')
        builder.append('World')
        builder.appendLine('Hello')
        builder.appendLine('World')
        builder.appendLine()
        expect(builder.build()).toBe('HelloWorldHello\nWorld\n')
        builder.clean()

        builder.appendLine('Hello\n')
        expect(builder.build()).toBe('Hello\n')
        builder.clean()

        builder.appendLine('Hello\n')
        builder.appendLine('World')
        expect(builder.build()).toBe('Hello\n\nWorld')
        builder.clean()

        builder.appendLine('Hello')
        builder.appendLine("")
        builder.appendLine('World')
        expect(builder.build()).toBe('Hello\n\nWorld')
    })

    it('append block test', () => {
        const builder = createTemplateBuilder({
            indent: '',
            scope: {start: '', end: ''}
        })

        builder.appendBlock("Hello\nWorld")
        expect(builder.build()).toBe('Hello\nWorld')
        builder.clean()

        builder.appendBlock([
            'Hello',
            'World'
        ])
        expect(builder.build()).toBe('Hello\nWorld')
        builder.clean()

        builder.appendBlock("\nHello\nWorld\n")
        expect(builder.build()).toBe('\nHello\nWorld\n')
        builder.clean()

        builder.appendBlock(new Set(["Hello", "World"]))
        expect(builder.build()).toBe('Hello\nWorld')
    })

    it('base scope test', () => {
        const builder = createTemplateBuilder({
            indent: '    ',
            scope: {start: '{', end: '}'}
        })

        builder.startScope()
        builder.appendLine('Hello')
        builder.appendLine('World')
        builder.endScope()
        expect(builder.build()).toBe('{\n    Hello\n    World\n}')
        builder.clean()

        builder.append("Hello ")
        builder.startScope()
        builder.append('World')
        builder.endScope()
        expect(builder.build()).toBe('Hello {\n    World\n}')
    })

    it('override scope test', () => {
        const builder = createTemplateBuilder({
            indent: '    ',
            scope: {start: '{', end: '}'}
        })

        builder.startScope("---")
        builder.appendLine('Hello')
        builder.appendLine('World')
        builder.endScope("---")
        expect(builder.build()).toBe('---\n    Hello\n    World\n---')
    })

    it('nested scope test', () => {
        const builder = createTemplateBuilder({
            indent: '    ',
            scope: {start: '{', end: '}'}
        })

        builder.appendLine()
        builder.startScope()
        builder.appendLine('Hello')
        builder.startScope()
        builder.appendLine('World')
        builder.appendLine('Hello')
        builder.endScope()
        builder.appendLine('World')
        builder.endScope()
        expect(builder.build()).toBe(`
{
    Hello
    {
        World
        Hello
    }
    World
}`)
    })

    it('indent with block', () => {
        const builder = createTemplateBuilder({
            indent: '    ',
            scope: {start: '{', end: '}'}
        })

        builder.appendLine()
        builder.startScope()
        builder.appendBlock([
            `
Hello
`
        ])
        builder.endScope()
        expect(builder.build()).toBe(`
{
    
    Hello
    
}`)
        expect(builder.build({cleanEmptyLineIndent: true})).toBe(`
{

    Hello

}`)
        builder.clean()

        builder.appendLine()
        builder.startScope()
        // 3 empty line
        builder.appendBlock([
`

`
        ])
        builder.endScope()
        // 3 empty line with indent
        expect(builder.build()).toBe(`
{
    
    
    
}`)
        // 3 empty line with indent
        expect(builder.build({cleanEmptyLineIndent: true})).toBe(`
{



}`)
        builder.clean()


    })
})
