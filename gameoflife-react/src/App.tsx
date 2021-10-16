import React from 'react';
import Matrix from './classLibrary/Matrix';
import CellMatrix from './components/CellMatrix';

function App() {

    let [matrix, setMatrix] = React.useState<Matrix>( () => 
        {
            return new Matrix(50, 50);
        }
    );

    React.useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === " ") {
                setMatrix(prevMatrix => prevMatrix.nextGen());
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
        </div>
    );

}

export default App;
