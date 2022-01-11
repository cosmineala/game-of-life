import React from 'react';
import Matrix from './models/CellMatrix/Matrix';
import CReactMatrixRenderer from './components/renderers/CReactMatrixRenderer';
import CHowTo from './components/CHowTo';
import CTreeJsRenderer from './components/renderers/threeJs/CTreeJsRenderer';
import CDecRule from './components/CDecRule';

enum Renderers{
    react,
    threejs
}

enum MatrixAction {
    clickCell = "clickCell",
    nextgen = "nextgen",
    mewMatrix = "mewMatrix",
    resize = "matrixresize",
}

enum RendererAction{
    change = "changeRenderer"
}

interface IState{
    matrix: Matrix,
    renderer: Renderers
}

let newDefaultMatrix = () => {
    return new Matrix({ width: 100, height: 100 });
}
// react redux
const reducer = (state: any, action: any): any => {
    const matrix = state.matrix;
    const renderer = state.renderer; 

    switch (action.type) {
        // Matrix
        case MatrixAction.clickCell:
            matrix.inverCell(action.args.x, action.args.y);
            break;

        case MatrixAction.nextgen:
            matrix.nextGen();
            break;

        case MatrixAction.mewMatrix:
            state.matrix = newDefaultMatrix();
            break;

        case MatrixAction.resize:
            state.matrix.resize( action.args.x, action.args.y );
            break;

        // Renderer
        case RendererAction.change:
            state.renderer = ( renderer === 0 ) ? 1 : 0;
            break;

        default:
            console.log("___BUG___");
    }
    return { ...state };
}

function App() {

    const [state, dispatch] = React.useReducer(reducer, { matrix: newDefaultMatrix(), renderer: 0 });

    let onCellClickCallback = (x: number, y: number): void => {
        dispatch({
            type: MatrixAction.clickCell,
            args: { x: x, y: y }
        });
    }

    let onResize = (x: number, y: number): void => {
        const MAX = 500;
        if( x > MAX ) x = MAX;
        if( y > MAX ) y = MAX;
        dispatch({
            type: MatrixAction.resize,
            args: { x: x, y: y }
        });
    }

    let onChangeRenderer = () => {
        dispatch({
            type: RendererAction.change
        });
    };

    React.useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            switch (e.key) {
                case " ":
                    dispatch({ type: MatrixAction.nextgen });
                    break;
                case 'R':
                    dispatch({ type: MatrixAction.mewMatrix });
                    break;
            }
        });
    }, []);

    const renderRenderer = () => {
        switch ( state.renderer ) {
            case 0:
                return (
                    <CReactMatrixRenderer
                        matrix={state.matrix}
                        onCellClickCallback={onCellClickCallback}
                    />
                );
            case 1:
                return (
                    <CTreeJsRenderer
                        matrix={state.matrix}
                        onCellClickCallback={onCellClickCallback}
                    />
                );
        }
    };

    return (
        <div
            className="App"
        >
            {renderRenderer()}
            <CHowTo
                onChangeRenderer = { onChangeRenderer }
            />
            <CDecRule 
                ijUser={ state.matrix }
                mSize={  { x: state.matrix.width, y: state.matrix.height } }
                resize={ onResize }
            />
        </div>
    );

}

export default App;
