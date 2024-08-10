import React, { useState } from 'react';
import Grid from './components/Grid/Grid'
import GridInput from './components/gridInput/gridInput';
import './App.css'

const App: React.FC = () => {
    const [numRows, setNumRows] = useState<number>(5); // Default number of rows
    const [numCols, setNumCols] = useState<number>(5); // Default number of columns

    return (
        <div className="container">
            <GridInput onRowsChange={setNumRows} onColsChange={setNumCols} />
            <Grid numRows={numRows} numCols={numCols} />
        </div>
    );
};

export default App;
