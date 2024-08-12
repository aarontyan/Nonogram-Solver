import React from 'react';
import './colVals.css';

interface ColValsProps {
    numCols: number;
}

const ColVals: React.FC<ColValsProps> = ({ numCols }) => {
    const generateTextInputs = () => {
        const inputs = [];
        for (let i = 0; i < numCols; i++) {
            inputs.push(
                <input
                    key={i}
                    type="text"
                    className="col-val-input"
                    style={{ maxWidth: `calc(90% / ${numCols})`, margin: `0 calc(5% / ${numCols})`}}
                />
            );
        }
        return inputs;
    };

    return (
        <div className="col-vals-container">
            {generateTextInputs()}
        </div>
    );
};

export default ColVals;
