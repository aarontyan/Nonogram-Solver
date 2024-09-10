import React, { useState } from 'react';
import './submitButton.css';

interface SubmitButtonProps {
    numRows: number;
    numCols: number;
    rowValues: string[];
    colValues: string[];
    onBoardUpdate: (newBoard: number[][] | null) => void;
    onHasSolutionUpdate: (hasSolution: boolean) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    numRows,
    numCols,
    rowValues,
    colValues,
    onBoardUpdate,
    onHasSolutionUpdate,
}) => {
    const [error, setError] = useState<string | null>(null);

    const sendInfoToBackend = async (numRows: number, numCols: number, rowValues: number[][], colValues: number[][]) => {
        try {
            const response = await fetch("http://localhost:5000/api/solve-nonogram", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rows: numRows,
                    cols: numCols,
                    row_data: rowValues,
                    col_data: colValues,
                }),
            });

            const data = await response.json();

            if (data.solution === null) {
                onBoardUpdate(null);
                onHasSolutionUpdate(false);
            } else {
                onBoardUpdate(data.solution);
                onHasSolutionUpdate(true)
            }

        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred while processing the input.");
        }
    };

    

    const handleSubmit = () => {
        const parsedRows = rowValues.map(val =>
            val.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))
        );
        const parsedCols = colValues.map(val =>
            val.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num))
        );
        sendInfoToBackend(numRows, numCols, parsedRows, parsedCols);
    };

    return (
        <>
            {error && <div className="error-message">{error}</div>}
            <button className='submit-button' onClick={handleSubmit}>
                Submit
            </button>
        </>
    );
};

export default SubmitButton;