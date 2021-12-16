import React from 'react';
import Matrix from './models/Matrix';
import CellMatrix from './components/CReactMatrixRenderer';
import CHowTo from './components/CHowTo';

enum MatrixAction {
    clickCell,
    nextgen,
    mewMatrix
}

interface IMatrixReducer {
    (
        state: {
            matrix: Matrix
        },
        action: {
            type: MatrixAction,
            args?: {
                x: number,
                y: number
            }
        }
    ): any;
}

let newDefaultMatrix = () =>{
    return new Matrix({ width: 50, height: 50});
}
// react redux
const reducer: IMatrixReducer = ( state: any, action: any ): any => {
    const matrix =  state.matrix;
    let change: any;
    switch( action.type ){

        case MatrixAction.clickCell:
            matrix.inverCell(action.args.x, action.args.y);
            break;

        case MatrixAction.nextgen:
            matrix.nextGen();
            break;

        case MatrixAction.mewMatrix:
            state.matrix = newDefaultMatrix();
            break;

        default:
            console.log("___BUG___");
    }
    return { ...state };
}

function App() {
    
    const [state, dispatch] = React.useReducer(reducer, { matrix: newDefaultMatrix() });
    
    let onCellClickCallback = (x: number, y: number): void => {
        dispatch({
            type: MatrixAction.clickCell,
            args: { x: x, y: y }
        });
    }

    React.useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            switch( e.key ){
                case " ":
                    dispatch({type: MatrixAction.nextgen});
                    break;
                case 'R':
                    dispatch({type: MatrixAction.mewMatrix});
                    break;
            }
        });
    }, []);

    return (
        <div
            className="App"
        >
            <CellMatrix
                matrix={state.matrix}
                onCellClickCallback={onCellClickCallback}
            />
            <CHowTo/>
        </div>
    );

}

export default App;
