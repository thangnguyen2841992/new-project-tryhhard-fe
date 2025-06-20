import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        // @ts-ignore
        <div style={styles.spinner}></div>
    );
};

const styles = {
    spinner: {
        border: '8px solid #f3f3f3', /* Màu nền */
        borderTop: '8px solid #3498db', /* Màu chỉ */
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
        position : 'absolute',
        top : '20%',
        left : '45%'
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
};

export default LoadingSpinner;