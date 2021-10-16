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

    function fetMax(): number {
        const { innerWidth: width, innerHeight: height } = window;
        return  ( width > height ? height : width ) -  100;
    }

    let cellSyle: React.CSSProperties = {
        height: fetMax() / matrix.height + "px",
        width: fetMax() / matrix.height + "px",
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