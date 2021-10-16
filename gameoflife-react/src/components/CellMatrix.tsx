import React from "react";
import Matrix from '../classLibrary/Matrix';

interface IProps {
    matrix: Matrix,
    setMatrix: React.Dispatch<React.SetStateAction<Matrix>>
}

let CellMatrix: React.FC<IProps> = ({ matrix, setMatrix }) => {

    const updateCell = (x: number, y: number): void => {
        console.log("CLICK: " + x + ", " + y);
        let mat = matrix.clone();
        mat.inverCell(x, y);
        setMatrix(mat);
    }

    const renderMatrix = () => {
        let list = [];
        for (let i = 0; i < matrix.height; i++) {
            for (let j = 0; j < matrix.width; j++) {
                list.push(
                    <div
                        className={"cell " + (matrix.get(i, j) === true ? "alive" : "dead")}
                        style={cellSyle}
                        onClickCapture={() => { updateCell(i, j) }}
                    >
                    </div>
                )
            }
        }
        return list;

    }

    let continerSyle: React.CSSProperties = {
        height: 'max-content',
        width: 'max-content',
        display: 'grid',
        gridTemplateColumns: 'repeat(' + matrix.width + ', 1fr)',
        // gridTemplateRows: 'minmax(100px, auto);'
    };

    let cellSyle: React.CSSProperties = {
        height: '50px',
        width: '50px',
    };

    return (
        <div
            className="App"
            style={continerSyle}
        >
            {renderMatrix()}
        </div>
    );
}

export default CellMatrix;