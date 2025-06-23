import React, { useEffect, useState } from 'react';


interface DateCreated {
    dateCreated: Date;
}
const CalculateTime: React.FC<DateCreated> = ({ dateCreated }) => {
// Component hiển thị thời gian chênh lệch cho một bài viết
    const [timeDiff, setTimeDiff] = useState<string>('');

    // @ts-ignore
    const calculateTimeDifference = (date1: Date): string => {
        const now = new Date();
        const dateCreatedNew = new Date(date1);
        const diffInSeconds = Math.floor((dateCreatedNew.getTime() - now.getTime()) / 1000);

        const hours = Math.floor(Math.abs(diffInSeconds) / 3600);
        const minutes = Math.floor((Math.abs(diffInSeconds) % 3600) / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);


        if (diffInSeconds < 0) {
            // Nếu thời gian trước
            if (Math.abs(diffInSeconds) < 60) {
                return 'Vừa xong';
            } else if (hours < 1) {
                return `${minutes} phút trước`;
            } else if (days < 1) {
                return `${hours} giờ trước`;
            } else if (months < 1) {
                return `${days} ngày trước`;
            } else if (years < 1) {
                return `${months} tháng trước`;
            } else {
                return `${years} năm trước`;
            }
        }
    }

    useEffect(() => {
            setTimeDiff(calculateTimeDifference(dateCreated));
    }, [dateCreated]);

    return (
        <div>
            <p style={{color : '#7a809b', fontSize : '14px', marginLeft : '5px'}}>{timeDiff}</p>
        </div>
    );
};
export default CalculateTime;
