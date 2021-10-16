interface IMatrix{
    matrix: boolean[][],
    get( x: number, y: number ): boolean,
}

export default class Matrix implements IMatrix{

    height: number;
    width: number;

    matrix: boolean[][]

    constructor( height: number = 0, width: number = 0, matrix?: boolean[][] ){

        this.height = height;
        this.width = width;

        if( matrix === undefined ){
            this.matrix = Array( height ).fill(false).map(( )=>Array(width).fill(false));
        }else{
            this.matrix = matrix;
        }

    }

    get( x: number, y: number ): boolean{
        return this.matrix[x][y];
    }
    set( x: number, y: number, val: boolean ): void{
        this.matrix[x][y] = val;
    }
    inverCell( x: number, y: number, ): void{
        this.matrix[x][y] =  !this.matrix[x][y];
    }

    clone(): Matrix {
        return new Matrix( this.height, this.width, this.matrix );
    }

    isInMatrix( x: number, y: number ): boolean{
        if(
            x >= this.height ||
            x < 0 ||
            y >= this.width ||
            y < 0
        ){
            return false;
        }
        return true;
    }

    getNeighborsAlive( x: number, y: number ): number{
        let count = 0;
        for (let i = -1; i <= 1 ; i++) {
            for (let j = -1; j <= 1 ; j++) {
                if( this.isInMatrix( x+i, y+j ) ){
                    if( this.get(  x+i, y+j ) === true){
                        count++;
                    }
                }
            }
        }
        if( this.get(  x, y ) === true){
            count--;
        }
        // console.log("NEXT("+x+","+y+"): " + count);
        return count;
    }

    willItBeAvive( x: number, y: number ): boolean{
 
        let cellIsAvlive = this.get(x,y);
        let neighbors = this.getNeighborsAlive(x,y);

        if( cellIsAvlive )
        {
            return  neighbors >= 2 && neighbors <= 3;
        }
        else
        {
            return neighbors === 3;
        }
    }

    nextGen(): Matrix{

        let newMatric: boolean[][] = [];

        for (let i = 0; i < this.height ; i++) {
            let row: boolean[] = [];
            for (let j = 0; j < this.width ; j++) {
                row.push( this.willItBeAvive(i,j) );
            }
            newMatric.push( row );
        }

        return new Matrix( this.height, this.width, newMatric )
    }

}