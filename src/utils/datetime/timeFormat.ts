const handleDateTimeParse = (_date: string | Date | null | undefined): Date | undefined => {
    if (typeof _date === 'string') {
        return new Date(_date)
    } else if (_date) {
        return _date
    }
}

/**
 * 格式化日期时间
 * @param _date 日期时间
 * @param format 格式化模板字符串
 * @returns 格式化后的日期时间字符串
 */
export const formatDateTime = (_date: string | Date | null | undefined, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
    const date = handleDateTimeParse(_date)
    if (!date) return ""

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    const millisecond = String(date.getMilliseconds()).padStart(3, '0');

    return format
        .replace('YYYY', year.toString())
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second)
        .replace('SSS', millisecond);
}

export const formatDate = (date: string | Date | undefined) => formatDateTime(date, "YYYY-MM-DD")

export const formatTime = (date: string | Date | undefined) => formatDateTime(date, "HH:mm:ss")

export const formatTableColumnDate = (_row: any, _column: any, date: string | Date | undefined, _index: number) => {
    return formatDateTime(date, "YYYY-MM-DD")
}

export const formatTableColumnTime = (_row: any, _column: any, date: string | Date | undefined, _index: number) => {
    return formatDateTime(date, "HH:mm:ss")
}

export const formatTableColumnDateTime = (_row: any, _column: any, date: string | Date | undefined, _index: number) => {
    return formatDateTime(date, "YYYY-MM-DD HH:mm:ss")
}

/**
 * 格式化时间差
 * @param _date 日期时间
 * @returns 格式化后的时间差字符串
 */
export const formatDateTimeDiff = (_date: string | Date | undefined): string => {
    const date = handleDateTimeParse(_date)
    if (!date) return ""

    const currentDate = new Date();
    const diffMs = currentDate.getTime() - date.getTime();

    const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    if (diffYears > 0) {
        return `${diffYears}年前`;
    } else if (diffDays > 0) {
        return `${diffDays}天前`;
    } else if (diffHours > 0) {
        return `${diffHours}小时前`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes}分钟前`;
    } else if (diffSeconds > 0) {
        return `${diffSeconds}秒前`;
    } else {
        return '刚刚';
    }
}
