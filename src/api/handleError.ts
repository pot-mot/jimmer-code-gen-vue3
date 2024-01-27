import {AllErrors} from "@/api/__generated";
import {sendMessage} from "@/message/message.ts";

export const handleError = (url: string, error: AllErrors) => {
    sendMessage(
        formatErrorMessage(error),
        'warning',
        {url, error}
    )
}

const formatErrorMessage = (error: AllErrors): string => {
    return `${parseFamilyAndCode(error)}，请及时查看后台报错信息`
}

const parseFamilyAndCode = (error: AllErrors): string => {
    let familyStr

    let codeStr

    if (error.family == "DATA_SOURCE") {
        familyStr = "数据源"
        if (error.code == "CONNECT_FAIL") {
            codeStr = "连接失败"
        }
    } else if (error.family == "MODEL_LOAD") {
        familyStr = "模型加载"
        if (error.code == "TABLE") {
            codeStr = "表"
        } else if (error.code == "COLUMN") {
            codeStr = "列"
        } else if (error.code == "ASSOCIATION") {
            codeStr = "关联"
        } else if (error.code == "INDEX") {
            codeStr = "索引"
        } else if (error.code == "ENUM") {
            codeStr = "枚举"
        }
    } else if (error.family == "DATA_SOURCE_LOAD") {
        familyStr = "数据源加载"
        if (error.code == "TABLE") {
            codeStr = "表"
        } else if (error.code == "COLUMN") {
            codeStr = "列"
        } else if (error.code == "ASSOCIATION") {
            codeStr = "关联"
        } else if (error.code == "INDEX") {
            codeStr = "索引"
        }
    } else if (error.family == "CONVERT_ENTITY") {
        familyStr = "转换实体"
        if (error.code == "ASSOCIATION") {
            codeStr = "关联"
        }
    } else if (error.family == "COLUMN_TYPE") {
        familyStr = "列类型"
        if (error.code == "MISS_REQUIRED_PARAM") {
            codeStr = "缺失必要条件"
        }
    } else if (error.family == "GENERATE_TABLE_DEFINE") {
        familyStr = "生成表定义"
        if (error.code == "TABLE") {
            codeStr = "表"
        } else if (error.code == "COLUMN") {
            codeStr = "列"
        } else if (error.code == "INDEX") {
            codeStr = "索引"
        }
    } else if (error.family == "GENERATE_ENTITY") {
        familyStr = "生成实体"
        if (error.code == "TABLE") {
            codeStr = "表"
        } else if (error.code == "COLUMN") {
            codeStr = "列"
        } else if (error.code == "ASSOCIATION") {
            codeStr = "关联"
        } else if (error.code == "ENUM") {
            codeStr = "枚举"
        }
    }

    return `${familyStr ? familyStr : error.family} ${codeStr ? codeStr : error.code}`
}
