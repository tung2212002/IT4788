function convertTimeAgo(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);

    const timeDifference = currentDate - targetDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} năm trước`;
    } else if (months > 0) {
        return `${months} tháng trước`;
    } else if (weeks > 0) {
        return `${weeks} tuần trước`;
    } else if (days > 0) {
        return `${days} ngày trước`;
    } else if (hours > 0) {
        return `${hours} giờ trước`;
    } else if (minutes > 0) {
        return `${minutes} phút trước`;
    } else {
        return 'vừa xong';
    }
}

export default convertTimeAgo;

function convertTimeMonthYear(timestamp) {
    const targetDate = new Date(timestamp);
    const month = targetDate.getMonth() + 1;
    const year = targetDate.getFullYear();

    return `Tháng ${month} ${year}`;
}

function convertTimeNoti(timestamp) {
    const targetDate = new Date(timestamp);
    const currentDate = new Date();
    const month = targetDate.getMonth() + 1;
    const year = targetDate.getFullYear();
    const date = targetDate.getDate();
    const hour = targetDate.getHours();
    const minute = targetDate.getMinutes();

    const diff = currentDate - targetDate;
    const diffSeconds = Math.floor(diff / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
        return `Ngày ${date} tháng ${month} năm ${year}`;
    } else {
        if (year > currentDate.getFullYear()) {
            return `Ngày ${date} tháng ${month} năm ${year}`;
        } else {
            if (diffMonths > 0) {
                return `Th ${month} ${date} lúc ${hour}:${minute}`;
            } else {
                if (diffDays > 0) {
                    return `Th ${month} ${date} lúc ${hour}:${minute}`;
                } else {
                    if (diffHours > 0) {
                        return `${diffHours} giờ trước`;
                    } else {
                        if (diffMinutes > 0) {
                            return `${diffMinutes} phút trước`;
                        } else {
                            return `${diffSeconds} giây trước`;
                        }
                    }
                }
            }
        }
    }
}

export { convertTimeMonthYear };
