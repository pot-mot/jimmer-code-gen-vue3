import type {AllErrors} from "@/api/__generated";
import {sendMessage} from "@/components/message/messageApi.ts";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type Errors = {
    [E in AllErrors as E['family']]: {
        [C in Extract<AllErrors, { family: E['family'] }> as C['code']]:
            Extract<AllErrors, { family: E['family']; code: C['code'] }>
    }
}

/**
 * 处理非预期的错误
 * 弹出非预期消息，并继续抛出错误
 */
export const handleUnexpectError = (_uri: string, _method: Method, _response: Response, error: any) => {
    throw error
}

/**
 * 处理预期的错误
 * 验证输入的错误
 *  若是预期的错误，则直接抛出 EXPECT_ERROR，中断后续行为
 *  若不是预期的错误，则不进行任何操作
 */
export const handleExpectError = (_uri: string, _method: Method, _response: Response, error: any) => {
    if (typeof error === "object" && "family" in error && typeof error.family === "string") {
        switch (error.family) {
            // TODO
        }
    }
    throw error
}
