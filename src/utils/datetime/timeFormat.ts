import dayjs from 'dayjs';

/**
 * 格式化日期时间
 * @param date 日期时间
 * @param format 格式化模板字符串
 * @returns 格式化后的日期时间字符串
 */
export const formatDateTime = (
    date: string | Date | null | undefined,
    format: string = 'YYYY-MM-DD HH:mm:ss',
): string => {
    if (!date) return '';
    return dayjs(date).format(format);
};

export const formatDate = (date: string | Date | undefined) => formatDateTime(date, 'YYYY-MM-DD');

export const formatTime = (date: string | Date | undefined) => formatDateTime(date, 'HH:mm:ss');

export const formatTableColumnDate = (
    _row: any,
    _column: any,
    date: string | Date | undefined,
    _index: number,
) => {
    return formatDateTime(date, 'YYYY-MM-DD');
};

export const formatTableColumnTime = (
    _row: any,
    _column: any,
    date: string | Date | undefined,
    _index: number,
) => {
    return formatDateTime(date, 'HH:mm:ss');
};

export const formatTableColumnDateTime = (
    _row: any,
    _column: any,
    date: string | Date | undefined,
    _index: number,
) => {
    return formatDateTime(date, 'YYYY-MM-DD HH:mm:ss');
};

/**
 * 格式化时间差
 * @param _date 日期时间
 * @returns 格式化后的时间差字符串
 */
export const formatDateTimeDiff = (_date: string | Date | undefined): string => {
    if (!_date) return '';

    const diff = dayjs().diff(dayjs(_date));

    const diffYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

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
};
