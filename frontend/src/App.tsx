import React, { useState } from 'react';
import GridInput from './components/gridInput/gridInput'
import ColVals from './components/colVals/colVals';
import Grid from './components/Grid/Grid';
import RowVals from './components/rowVals/rowVals'
import './App.css'

const App: React.FC = () => {
    const [numRows, setNumRows] = useState(5);
    const [numCols, setNumCols] = useState(5);

    const handleRowsChange = (rows: number) => {
        setNumRows(rows);
    };

    const handleColsChange = (cols: number) => {
        setNumCols(cols);
    };

    return (
        <div className="container">
            <GridInput onRowsChange={handleRowsChange} onColsChange={handleColsChange} />
            <div className="grid-and-vals-container">
                <RowVals numRows={numRows} />
                <div style={{ width: '42vw', height: '42vw' }}>
                    <ColVals numCols={numCols} />
                    <Grid numRows={numRows} numCols={numCols} />
                </div>
            </div>
        </div>
    );
};

export default App;
