import {ParserRuleContext, CommonTokenStream} from 'antlr4ng';

export const getRawTextByCtx = (tokenStream: CommonTokenStream, ctx: ParserRuleContext): string => {
    if (!ctx || !ctx.start || !ctx.stop) return '';
    const startToken = ctx.start;
    const stopToken = ctx.stop;

    // 从输入流中获取原始文本
    const inputStream = tokenStream.tokenSource?.inputStream;
    if (inputStream) {
        return inputStream.getTextFromRange(startToken.start, stopToken.stop);
    }

    // 降级方案：使用 tokenStream 的 getText
    return tokenStream.getTextFromContext(ctx);
};
