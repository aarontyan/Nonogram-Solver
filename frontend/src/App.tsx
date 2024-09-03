import React, { useState } from 'react';
import GridInput from './components/gridInput/gridInput'
import ColVals from './components/colVals/colVals';
import Grid from './components/Grid/Grid';
import RowVals from './components/rowVals/rowVals'
import SubmitButton from './components/submitButton/submitButton'
import ErrorCard from './components/errorCard/errorCard';
import './App.css'

const App: React.FC = () => {
    const [numRows, setNumRows] = useState(5);
    const [numCols, setNumCols] = useState(5);
    const [colValues, setColValues] = useState<string[]>([]);
    const [rowValues, setRowValues] = useState<string[]>([]);
    const [board, setBoard] = useState<Array<Array<number>> | null>(null);
    const [hasSolution, setHasSolution] = useState<boolean>(true);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const handleColValuesChange = (newValues: string[]) => {
        setColValues(newValues);
    };

    const handleRowValuesChanges = (newValues: string[]) => {
        setRowValues(newValues);
    };

    const handleRowsChange = (rows: number) => {
        setNumRows(rows);
        setBoard(null);
    };

    const handleColsChange = (cols: number) => {
        setNumCols(cols);
        setBoard(null);
    };

    const updateBoard = (newBoard: Array<Array<number>> | null) => {
        setBoard(newBoard);
    };

    const handleHasSolutionChange = (hasSolution : boolean) => {
        setHasSolution(hasSolution);
    }

    return (
        <div className="container">
            <GridInput onRowsChange={handleRowsChange} onColsChange={handleColsChange} />
            <div className="grid-and-vals-container">
                <RowVals numRows={numRows} onRowValuesChange={handleRowValuesChanges}/>
                <div style={{ width: '42vw', height: '42vw' }}>
                    <ColVals numCols={numCols} onColValuesChange={handleColValuesChange}/>
                    <Grid numRows={numRows} numCols={numCols} board={board}/>
                </div>
            </div>
            <SubmitButton numRows={numRows} numCols={numCols} rowValues={rowValues} colValues={colValues} onBoardUpdate={updateBoard} onHasSolutionUpdate={handleHasSolutionChange}/>
        </div>
    );
};

export default App;
