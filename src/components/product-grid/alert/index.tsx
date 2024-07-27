import { useState, useEffect } from 'react';
import './index.css';

export const AddToCartAlert = ({ message, duration } : { message: string, duration: number}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    if (!visible) return null;

    return (
        <div className="alert">
            {message}
        </div>
    );
};
