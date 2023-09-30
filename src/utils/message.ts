/**
 * 向用户发送消息
 * @param msg 消息体
 * @param type 消息类型
 * @param data 额外数据，例如报错
 */
export const sendMessage = (msg: string, type: "Info" | "Success" | "Warning" | "Error" = "Info", data?: any ) => {
    if (type == "Success") {
        alert(msg)
        console.log(msg)
        if (data) console.log(data)
    } else if (type == "Error") {
        alert(msg)
        console.log(msg)
        if (data) console.error(data)
    } else if (type == "Info") {
        console.log(msg)
        if (data) console.log(data)
    } else if (type == "Warning") {
        alert(msg)
        console.log(msg)
        if (data) console.warn(data)
    }
}

export const saveLog = (msg: string) => {
    console.log(msg)
}