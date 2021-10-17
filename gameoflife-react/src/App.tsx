import React from 'react';
import Matrix from './classLibrary/Matrix';
import CellMatrix from './components/CellMatrix';
import CHowTo from './components/CHowTo';

function App() {

    const [matrix, setMatrix] = React.useState<Matrix>( () => 
        {
            return new Matrix(50, 50);
        }
    );

    React.useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            switch( e.key ){

                case " ":
                    setMatrix(prevMatrix => prevMatrix.nextGen());
                break;
                case 'R':
                    setMatrix(new Matrix(50, 50));
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
