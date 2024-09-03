import React, { useState, useEffect } from 'react';
import './colVals.css';

interface ColValsProps {
    numCols: number;
    onColValuesChange: (values: string[]) => void;
}

const ColVals: React.FC<ColValsProps> = ({ numCols, onColValuesChange }) => {
    const [colValues, setColValues] = useState<string[]>(Array(numCols).fill(''));

    useEffect(() => {
        onColValuesChange(colValues);
    }, [colValues, onColValuesChange]);

    const handleInputChange = (index: number, value: string) => {
        const newColValues = [...colValues];
        if (newColValues.length > numCols) {
            newColValues.splice(numCols, newColValues.length - numCols);
        }
        newColValues[index] = value;
        setColValues(newColValues);
    };

    const generateTextInputs = () => {
        return Array.from({ length: numCols }, (_, i) => (
            <input
                key={i}
                type="text"
                className="col-val-input"
                value={colValues[i]}
                onChange={(e) => handleInputChange(i, e.target.value)}
                style={{ maxWidth: `calc(90% / ${numCols})`, margin: `0 calc(5% / ${numCols})` }}
            />
        ));
    };

    return <div className="col-vals-container">{generateTextInputs()}</div>;
};

export default ColVals;
