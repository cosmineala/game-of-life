import React from "react";
import Matrix from '../models/Matrix';

interface IProps {
    matrix: Matrix,
    setMatrix: React.Dispatch<React.SetStateAction<Matrix>>
}

let CellMatrix: React.FC<IProps> = ({ matrix, setMatrix }) => {

    const updateCell = (x: number, y: number): void => {
        let newMatrix = matrix.clone();
        newMatrix.inverCell(x, y);
        setMatrix(newMatrix);
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
    };

    let getMinHW = (): number => {
        const { innerWidth: width, innerHeight: height } = window;
        return (width > height ? height : width);
    }

    let [cellSyle, setCellSyle] = React.useState<React.CSSProperties>( 
        {
            height: getMinHW() / matrix.height + "px",
            width: getMinHW() / matrix.height + "px",
        }
    );

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setCellSyle(
                {
                    height: getMinHW() / matrix.height + "px",
                    width: getMinHW() / matrix.height + "px",
                }
            );
        });
    }, []);

    return (
        <div
            className="cell-continer"
        >
            <div
                style={continerSyle}
            >
                {renderMatrix()}
            </div>
        </div>
    );
}

export default CellMatrix;