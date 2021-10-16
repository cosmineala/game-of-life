import React from 'react';
import Matrix from './classLibrary/Matrix';
import CellMatrix from './components/CellMatrix';



function App() {

  let [matrix, setMatrix] = React.useState<Matrix>( 
    new Matrix( 15, 20 )
  );

  let nextGen = () => {
    setMatrix( matrix.nextGen() );
  }
  
  return (
    <div
      className="App"
    >
      <CellMatrix 
        matrix = {matrix}
        setMatrix = {setMatrix}
      />
      <button
        onClick={ () => { nextGen() } }
      >
        Next
      </button>
    </div>
  );


}




export default App;
