import React, { useEffect, useState } from 'react';


interface LikePostInterface {
    postId: number;
}
const TotalLikePost: React.FC<LikePostInterface> = ({ postId }) => {
// Component hiển thị thời gian chênh lệch cho một bài viết
    const [totalLikePost, setToTalLikePost] = useState<number>(0);
    
    return (
        <div>
            <p>{totalLikePost}</p>
        </div>
    );
};
export default LikePostInterface;
