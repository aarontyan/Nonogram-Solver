import React from 'react';
import './Grid.css'

interface GridProps {
    numRows: number;
    numCols: number;
}

const Grid: React.FC<GridProps> = ({ numRows, numCols }) => {
    const containerSize = window.innerWidth * 0.42
    // Calculate the size of each cell
    const cellWidth = containerSize / numCols;
    const cellHeight = containerSize / numRows;

    // Generate the grid
    const generateGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            const columns = [];
            for (let j = 0; j < numCols; j++) {
                let cellColor = 'white'
                columns.push(
                    <div
                        key={`${i}-${j}`}
                        className="grid-cell"
                        style={{
                            width: `${cellWidth}px`,
                            height: `${cellHeight}px`,
                            backgroundColor: `${cellColor}`
                        }}
                    >
                    </div>
                );
            }
            rows.push(
                <div key={i} className="grid-row">
                    {columns}
                </div>
            );
        }
        return rows;
    };

    return (
        <div className="grid-container">
            {generateGrid()}
        </div>
    );
};

export default Grid;
