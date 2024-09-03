import React, {useState, useEffect} from 'react';
import './rowVals.css';

interface RowValsProps {
    numRows: number;
    onRowValuesChange: (values: string[]) => void;
}

const RowVals: React.FC<RowValsProps> = ({ numRows, onRowValuesChange }) => {
    const [rowValues, setRowValues] = useState<string[]>(Array(numRows).fill(''));

    useEffect(() => {
        onRowValuesChange(rowValues);
    }, [rowValues, onRowValuesChange]);

    const handleInputChange = (index: number, value: string) => {
        const newRowValues = [...rowValues];
        if (newRowValues.length > numRows) {
            newRowValues.splice(numRows, newRowValues.length - numRows);
        }
        newRowValues[index] = value;
        setRowValues(newRowValues);
    };
    const generateTextInputs = () => {
        const inputs = [];
        console.log(window.innerWidth);
        let height = ((window.innerWidth * 0.42) / numRows) * 0.9;
        if (height > window.innerWidth * 0.02) {
            height = window.innerWidth * 0.02;
        }
        const margin = ((window.innerWidth * 0.42) / numRows - height) / 2
        console.log(margin)
        for (let i = 0; i < numRows; i++) {
            inputs.push(
                <input
                    key={i}
                    type="text"
                    className="row-val-input"
                    value={rowValues[i]}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    style={{margin: `${margin}px 0`, height: `${height}px`}}
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
