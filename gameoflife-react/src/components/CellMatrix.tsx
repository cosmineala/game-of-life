import React from "react";
import Matrix, {IMatrix} from '../models/Matrix';

interface IProps {
    state: {
        matrix: IMatrix
    }
    onCellClickCallback( x: number, y: number ): void
}

let CellMatrix: React.FC<IProps> = ({ state, onCellClickCallback}) => {

    const matrix = state.matrix;

    const renderMatrix = () => {
        let list = [];
        for (let i = 0; i < matrix.height; i++) {
            for (let j = 0; j < matrix.width; j++) {
                list.push(
                    <div
                        className={"cell " + (matrix.getCell(i, j) === true ? "alive" : "dead")}
                        style={cellSyle}
                        onClickCapture={() => { onCellClickCallback(i, j) }}
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