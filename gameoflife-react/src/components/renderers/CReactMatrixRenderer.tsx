import React from "react";
import  { ICMatrixRenderer} from '../../models/CellMatrix/Matrix';
import {debugSetings} from "../../debug/debugSetings"


let CReactMatrixRenderer: React.FC<ICMatrixRenderer> = ({ matrix, onCellClickCallback}) => {

    // Fit cell to screen
    const getMinHW = (): number => {
        const { innerWidth: width, innerHeight: height } = window;
        return (width > height ? height : width);
    }

    const [cellSyle, setCellSyle] = React.useState<React.CSSProperties>( 
        {
            height: getMinHW() / matrix.height + "px",
            width: getMinHW() / matrix.height + "px",
            color: "red",
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

    const continerSyle: React.CSSProperties = {
        height: 'max-content',
        width: 'max-content',
        display: 'grid',
        gridTemplateColumns: 'repeat(' + matrix.width + ', 1fr)',
    };

    const debugPosition = ( i: number, j: number ) => {
        if( debugSetings.isDebug === false ) return;
        return(
            <div style={{ width: "100%", height: "100%" ,border: "1px solid red" ,paddingLeft: "10px", color: "red" }}>
                {`${i} - ${j}`}
            </div>
        );
    };

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
                        {debugPosition(i,j)}
                    </div>
                )
            }
        }
        return list;
    }

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

export default CReactMatrixRenderer;