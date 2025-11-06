export const createTemplateBuilder = (
    options: TemplateOptions
): TemplateBuilder => {
    const lines: string[] = []
    let currentIndentLevel = 0

    const addLine = (line: string) => {
        lines.push(options.indent.repeat(currentIndentLevel) + line)
    }

    return {
        append: (block) => {
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
            currentIndentLevel--
            addLine(end ?? options.scope.end)
        },
        build: () => {
            return lines.join("\n")
        }
    }
}