import React from 'react';
import './rowVals.css';

interface RowValsProps {
    numRows: number;
}

const RowVals: React.FC<RowValsProps> = ({ numRows }) => {
    const generateTextInputs = () => {
        const inputs = [];
        console.log(window.innerWidth)
        const margin = ((window.innerWidth * 0.42) / numRows - window.innerWidth * 0.02) / 2
        const height = (window.innerWidth * 0.42)
        console.log(margin)
        for (let i = 0; i < numRows; i++) {
            inputs.push(
                <input
                    key={i}
                    type="text"
                    className="row-val-input"
                    style={{margin: `${margin}px 0`}}
                />
            );
        }
        return inputs;
    };

    return (
        <div className="row-vals-container">
            {generateTextInputs()}
        </div>
    );
};

export default RowVals;
