import exp from "constants";
import Matrix from "./Matrix";

let convToBool = ( intMat: number[][] ): boolean[][] => {

    let boolMat: boolean[][] = [];
    for (let i = 0; i < intMat.length; i++) {
        const row = intMat[i];
        const boolrow: boolean[] = [];
        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            boolrow.push( ( element === 1 ) );
        }
        boolMat.push(boolrow);
    }
    return boolMat;
}

let compMat = ( m1: boolean[][], m2: boolean[][] ): boolean => {
    for (let i = 0; i < m1.length; i++) {
        const row = m1[i];
        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            if( m1[i][j] !== m2[i][j] ) {
                return false;
            }
        }
    }
    return true;
}

test( "Mtarix.js -> nextGen()", () => {
    
    
    let data = convToBool([
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0,0],
        [0,0,1,0,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ]);

    let expected = convToBool([
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,1,0,0,0,0],
        [0,0,0,0,1,1,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ]);

    let matrix = new Matrix( { width: 8, height: 8, matrix: data } );
    matrix.nextGen();
    expect( matrix.matrix ).toStrictEqual( expected );
});