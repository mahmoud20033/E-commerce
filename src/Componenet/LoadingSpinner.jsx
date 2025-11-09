import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

const LoadingSpinner = ({ duration, color }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    },);

    if (!isVisible) return null;

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <FadeLoader color={color} />
        </div>
    );
};

export default LoadingSpinner;
