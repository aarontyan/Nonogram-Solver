import React, { useState } from 'react';
import './gridInput.css'

interface GridInputProps {
    onRowsChange: (rows: number) => void;
    onColsChange: (cols: number) => void;
}

const GridInput: React.FC<GridInputProps> = ({ onRowsChange, onColsChange }) => {
    const [rowsInput, setRowsInput] = useState<string>('5');
    const [colsInput, setColsInput] = useState<string>('5');

    const handleRowsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsInput(event.target.value);
    };

    const handleColsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColsInput(event.target.value);
    };

    const handleRowsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateRows();
        }
    };

    const handleColsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateCols();
        }
    };

    const handleRowsBlur = () => {
        updateRows();
    };

    const handleColsBlur = () => {
        updateCols();
    };

    const updateRows = () => {
        const newRows = parseInt(rowsInput, 10);
        if (!isNaN(newRows) && newRows > 0) {
            onRowsChange(newRows);
        }
    };

    const updateCols = () => {
        const newCols = parseInt(colsInput, 10);
        if (!isNaN(newCols) && newCols > 0) {
            onColsChange(newCols);
        }
    };

    return (
        <div className="input-container">
                <input
                    type="text"
                    value={rowsInput}
                    onChange={handleRowsInputChange}
                    onKeyDown={handleRowsKeyDown}
                    onBlur={handleRowsBlur}
                    placeholder="Enter number of rows"
                    className="input"
                />
            <span className="separator">x</span>
                <input
                    type="text"
                    value={colsInput}
                    onChange={handleColsInputChange}
                    onKeyDown={handleColsKeyDown}
                    onBlur={handleColsBlur}
                    placeholder="Enter number of columns"
                    className="input"
                />
        </div>
    );
};

export default GridInput;