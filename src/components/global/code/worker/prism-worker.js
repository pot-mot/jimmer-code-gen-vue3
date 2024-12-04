function Token(type, content, alias, matchedStr) {
    this.type = type;
    this.content = content;
    this.alias = alias;
    this.length = (matchedStr || '').length | 0;
}

Token.stringify = function stringify(o, language) {
    if (typeof o == 'string') {
        return o;
    }
    if (Array.isArray(o)) {
        let s = '';
        o.forEach(function (e) {
            s += stringify(e, language);
        });
        return s;
    }

    let env = {
        type: o.type,
        content: stringify(o.content, language),
        tag: 'span',
        classes: ['token', o.type],
        attributes: {},
        language: language
    };

    let aliases = o.alias;
    if (aliases) {
        if (Array.isArray(aliases)) {
            Array.prototype.push.apply(env.classes, aliases);
        } else {
            env.classes.push(aliases);
        }
    }

    let attributes = '';
    for (let name in env.attributes) {
        attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
    }

    return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
};

function matchPattern(pattern, pos, text, lookbehind) {
    pattern.lastIndex = pos;
    let match = pattern.exec(text);
    if (match && lookbehind && match[1]) {
        // change the match to remove the text matched by the Prism lookbehind group
        let lookbehindLength = match[1].length;
        match.index += lookbehindLength;
        match[0] = match[0].slice(lookbehindLength);
    }
    return match;
}

function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
    for (let token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
        }

        let patterns = grammar[token];
        patterns = Array.isArray(patterns) ? patterns : [patterns];

        for (let j = 0; j < patterns.length; ++j) {
            if (rematch && rematch.cause === token + ',' + j) {
                return;
            }

            let patternObj = patterns[j];
            let inside = patternObj.inside;
            let lookbehind = !!patternObj.lookbehind;
            let greedy = !!patternObj.greedy;
            let alias = patternObj.alias;

            if (greedy && !patternObj.pattern.global) {
                // Without the global flag, lastIndex won't work
                let flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
            }

            /** @type {RegExp} */
            let pattern = patternObj.pattern || patternObj;

            for ( // iterate the token list and keep track of the current token/string position
                let currentNode = startNode.next, pos = startPos;
                currentNode !== tokenList.tail;
                pos += currentNode.value.length, currentNode = currentNode.next
            ) {

                if (rematch && pos >= rematch.reach) {
                    break;
                }

                let str = currentNode.value;

                if (tokenList.length > text.length) {
                    // Something went terribly wrong, ABORT, ABORT!
                    return;
                }

                if (str instanceof Token) {
                    continue;
                }

                let removeCount = 1;
                let match;

                if (greedy) {
                    match = matchPattern(pattern, pos, text, lookbehind);
                    if (!match || match.index >= text.length) {
                        break;
                    }

                    let from = match.index;
                    let to = match.index + match[0].length;
                    let p = pos;

                    // find the node that contains the match
                    p += currentNode.value.length;
                    while (from >= p) {
                        currentNode = currentNode.next;
                        p += currentNode.value.length;
                    }
                    // adjust pos (and p)
                    p -= currentNode.value.length;
                    pos = p;

                    // the current node is a Token, then the match starts inside another Token, which is invalid
                    if (currentNode.value instanceof Token) {
                        continue;
                    }

                    // find the last node which is affected by this match
                    for (
                        let k = currentNode;
                        k !== tokenList.tail && (p < to || typeof k.value === 'string');
                        k = k.next
                    ) {
                        removeCount++;
                        p += k.value.length;
                    }
                    removeCount--;

                    // replace with the new match
                    str = text.slice(pos, p);
                    match.index -= pos;
                } else {
                    match = matchPattern(pattern, 0, str, lookbehind);
                    if (!match) {
                        continue;
                    }
                }

                // eslint-disable-next-line no-redeclare
                let from = match.index;
                let matchStr = match[0];
                let before = str.slice(0, from);
                let after = str.slice(from + matchStr.length);

                let reach = pos + str.length;
                if (rematch && reach > rematch.reach) {
                    rematch.reach = reach;
                }

                let removeFrom = currentNode.prev;

                if (before) {
                    removeFrom = addAfter(tokenList, removeFrom, before);
                    pos += before.length;
                }

                removeRange(tokenList, removeFrom, removeCount);

                let wrapped = new Token(token, inside ? tokenize(matchStr, inside) : matchStr, alias, matchStr);
                currentNode = addAfter(tokenList, removeFrom, wrapped);

                if (after) {
                    addAfter(tokenList, currentNode, after);
                }

                if (removeCount > 1) {
                    // at least one Token object was removed, so we have to do some rematching
                    // this can only happen if the current pattern is greedy

                    let nestedRematch = {
                        cause: token + ',' + j,
                        reach: reach
                    };
                    matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

                    // the reach might have been extended because of the rematching
                    if (rematch && nestedRematch.reach > rematch.reach) {
                        rematch.reach = nestedRematch.reach;
                    }
                }
            }
        }
    }
}

function LinkedList() {
    let head = {value: null, prev: null, next: null};
    let tail = {value: null, prev: head, next: null};
    head.next = tail;

    this.head = head;
    this.tail = tail;
    this.length = 0;
}

function addAfter(list, node, value) {
    let next = node.next;

    let newNode = {value: value, prev: node, next: next};
    node.next = newNode;
    next.prev = newNode;
    list.length++;

    return newNode;
}

function removeRange(list, node, count) {
    let next = node.next;
    let i
    for (i = 0; i < count && next !== list.tail; i++) {
        next = next.next;
    }
    node.next = next;
    next.prev = node;
    list.length -= i;
}

function toArray(list) {
    let array = [];
    let node = list.head.next;
    while (node !== list.tail) {
        array.push(node.value);
        node = node.next;
    }
    return array;
}

function encode(tokens) {
    if (tokens instanceof Token) {
        return new Token(tokens.type, encode(tokens.content), tokens.alias);
    } else if (Array.isArray(tokens)) {
        return tokens.map(encode);
    } else {
        return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
    }
}

function highlight(text, grammar, language) {
    const env = {
        code: text,
        grammar: grammar,
        language: language
    };
    if (!env.grammar) {
        throw new Error('The language "' + env.language + '" has no grammar.');
    }
    env.tokens = tokenize(env.code, env.grammar);
    return Token.stringify(encode(env.tokens), env.language);
}

function tokenize(text, grammar) {
    let rest = grammar.rest;
    if (rest) {
        for (let token in rest) {
            grammar[token] = rest[token];
        }

        delete grammar.rest;
    }

    let tokenList = new LinkedList();
    addAfter(tokenList, tokenList.head, text);

    matchGrammar(text, tokenList, grammar, tokenList.head, 0);

    return toArray(tokenList);
}

onmessage = (e) => {
    if (e === undefined || e.data === undefined) return

    const data = e.data

    if (typeof data === 'string') {
        if (data === 'stop') {
            close()
        }
        return
    }

    if (typeof data === 'object' && 'code' in data && 'grammar' in data && 'language' in data) {
        const {code, grammar, language} = e.data
        postMessage(highlight(code, grammar, language))
    }
}
