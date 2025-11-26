export const createTemplateBuilder = (
    options: TemplateOptions
): TemplateBuilder => {
    let lines: string[] = []
    let currentIndentLevel: number = 0
    let currentLine: string = ""

    const getCurrentIndent = () => {
        return options.indent.repeat(currentIndentLevel)
    }

    const addLine = (line: string) => {
        lines.push(getCurrentIndent() + line)
    }

    return {
        append: (content: string) => {
            if (content.length > 0) {
                if (currentLine.length === 0) {
                    currentLine = getCurrentIndent()
                }
                currentLine += content
            }
        },
        appendLine: (line?: string) => {
            if (line !== undefined && line.length > 0) {
                if (currentLine.length === 0) {
                    currentLine = getCurrentIndent()
                }
                currentLine += line
            }
            lines.push(currentLine)
            currentLine = ""
        },
        appendBlock: (block) => {
            if (currentLine.length > 0) {
                lines.push(currentLine)
                currentLine = ""
            }
            if (typeof block === "string") {
                for (const line of block.split("\n")) {
                    addLine(line)
                }
            } else {
                for (const item of block) {
                    for (const line of item.split("\n")) {
                        addLine(line)
                    }
                }
            }
        },
        startScope: (start) => {
            addLine(start ?? options.scope.start)
            currentIndentLevel++
        },
        endScope: (end) => {
            if (currentLine.length > 0) {
                lines.push(currentLine)
                currentLine = ""
            }
            currentIndentLevel--
            addLine(end ?? options.scope.end)
        },
        build: (options?: Partial<TemplateBuildOptions>) => {
            if (currentLine.length > 0) {
                lines.push(currentLine)
                currentLine = ""
            }
            if (options?.cleanEmptyLineIndent) {
                return lines.map(line => {
                    if (line.trim().length > 0) {
                        return line
                    } else {
                        return ""
                    }
                }).join("\n")
            } else {
                return lines.join("\n")
            }
        },
        clean: () => {
            lines = []
            currentIndentLevel = 0
            currentLine = ""
        }
    }
}
