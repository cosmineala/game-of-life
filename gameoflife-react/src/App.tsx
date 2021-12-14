import React from 'react';
import Matrix from './models/Matrix';
import CellMatrix from './components/CellMatrix';
import CHowTo from './components/CHowTo';


interface IMatrixReducer {
    ( 
        state: {
            matrix: Matrix
        },
        action: {
            type: string,
            args?: {
                x: number,
                y: number
            }
        }
        ): any;
}

let newDefaultMatrix = () => new Matrix({ width: 50, height: 50});

const matrixReducer: IMatrixReducer = ( state: any, action: any ): any => {
    switch( action.type ){
        case "invertCell":
            state.matrix.inverCell(action.args.x, action.args.y);
            return{  matrix: state.matrix }
        case "nextGen":
            state.matrix.nextGen();
            return{ matrix: state.matrix }
        case "newMatrix":
            return{ matrix: newDefaultMatrix() }
        default:
            console.log("___BUG___");
    }
}

function App() {
    
    const [state, dispatch] = React.useReducer(matrixReducer, { matrix: newDefaultMatrix() });
    
    let onCellClickCallback = (x: number, y: number): void => {
        dispatch({
            type: "invertCell",
            args: { x: x, y: y }
        });
    }

    React.useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            switch( e.key ){
                case " ":
                    dispatch({type: "nextGen"});
                    break;
                case 'R':
                    dispatch({type: "newMatrix"});
                    break;
            }
        });
    }, []);

    return (
        <div
            className="App"
        >
            <CellMatrix
                state={state}
                onCellClickCallback={onCellClickCallback}
            />
            <CHowTo/>
        </div>
    );

}

export default App;
