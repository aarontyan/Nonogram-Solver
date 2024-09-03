import React, {useState} from 'react'
import './errorCard.css'

interface ErrorCardProps {
    onClose: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ onClose }) => {
    return (
        <div className="error-overlay">
            <div className="error-card">
                <button className="error-close-button" onClick={onClose}>X</button>
                <h2>Default Title</h2>
                <div className="error-content">
                    <p>This is the default content of the popup card.</p>
                </div>
            </div>
        </div>
    );
}

export default ErrorCard;