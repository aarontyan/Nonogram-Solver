import React, { useState } from 'react';
import './gridInput.css'

interface GridInputProps {
    onRowsChange: (rows: number) => void;
    onColsChange: (cols: number) => void;
}

const GridInput: React.FC<GridInputProps> = ({ onRowsChange, onColsChange }) => {
    const [rowsInput, setRowsInput] = useState<string>('5'); // Input state for rows as string
    const [colsInput, setColsInput] = useState<string>('5'); // Input state for columns as string

    // Handle changes to the rows input field
    const handleRowsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsInput(event.target.value);
    };

    // Handle changes to the columns input field
    const handleColsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColsInput(event.target.value);
    };

    // Handle the Enter key press for rows input
    const handleRowsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateRows();
        }
    };

    // Handle the Enter key press for columns input
    const handleColsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            updateCols();
        }
    };

    // Update rows when input loses focus
    const handleRowsBlur = () => {
        updateRows();
    };

    // Update columns when input loses focus
    const handleColsBlur = () => {
        updateCols();
    };

    // Update rows state and call callback
    const updateRows = () => {
        const newRows = parseInt(rowsInput, 10);
        if (!isNaN(newRows) && newRows > 0) {
            onRowsChange(newRows);
        }
    };

    // Update columns state and call callback
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
                    onBlur={handleRowsBlur} // Trigger update on blur
                    placeholder="Enter number of rows"
                    className="input"
                />
            <span className="separator">x</span>
                <input
                    type="text"
                    value={colsInput}
                    onChange={handleColsInputChange}
                    onKeyDown={handleColsKeyDown}
                    onBlur={handleColsBlur} // Trigger update on blur
                    placeholder="Enter number of columns"
                    className="input"
                />
        </div>
    );
};

export default GridInput;