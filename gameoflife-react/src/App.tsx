import React from 'react';
import Matrix from './models/Matrix';
import CellMatrix from './components/CellMatrix';
import CHowTo from './components/CHowTo';

let newDefaultMatrix = () => new Matrix({ width: 50, height: 50});


function App() {

    const [matrix, setMatrix] = React.useState<Matrix>( () => 
        {
            return newDefaultMatrix();
        }
    );

    React.useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            switch( e.key ){

                case " ":
                    setMatrix(prevMatrix => prevMatrix.getNextGenInstace());
                break;
                case 'R':
                    setMatrix(newDefaultMatrix());
                break;

                default:
            }
        });
    }, []);

    return (
        <div
            className="App"
        >
            <CellMatrix
                matrix={matrix}
                setMatrix={setMatrix}
            />
            <CHowTo/>
        </div>
    );

}

export default App;
