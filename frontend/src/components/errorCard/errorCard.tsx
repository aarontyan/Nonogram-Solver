import React from 'react';
import './errorCard.css';

interface ErrorCardProps {
    showCard: boolean;
    onClose: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ showCard, onClose }) => {
    if (!showCard) {
        return null;
    }
    return (
        <div className="error-overlay">
            <div className="error-card">
                <div className="error-card-header">
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="error-card-body">
                    <p>{"Error calculating answer. Please ensure that all inputs are numbers separated by commas, and check that the inputs lead to a valid solution (no solution or multiple solutions may cause an error)"}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorCard;
