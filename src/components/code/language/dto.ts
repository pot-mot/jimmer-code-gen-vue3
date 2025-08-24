export const dtoLanguage = {
    comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?\*\//,
        greedy: true
    },
    keyword: /\b(?:export|package|import|this|as|class|implements)\b/,
    macro: /#allScalars/,
    qualifier: /\b(?:input|specification|abstract|unsafe|fixed|static|dynamic|fuzzy)\b/,
    qbeFunction: /\b(?:eq|ne|gt|ge|lt|le|like|notLike|null|notNull|valueIn|valueNotIn|associatedIdEq|associatedIdNe|associatedIdIn|associatedIdNotIn)\b/,
    identifier: /[$A-Za-z_][$\w]*/,
    constant: /\b(?:true|false|null)\b|\d+\.\d+|\d+|"[^"]*"|'[^']+'/,
    punctuation: /[.,;:(){}[\]<>]/,
    operator: /[=+\-*/^$@#->]/,
    propExplicit: /[+?!*]/,
}