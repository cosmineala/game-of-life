
export interface ICMatrixRenderer {
    matrix: IMatrix
    onCellClickCallback(x: number, y: number): void
}

// Functional rule  ------------------------------------------------- 
export interface FFunctionalRule {
    (isCellAlive: boolean, numberOfNeighbors: number): boolean
}

const clasicRuleFunction: FFunctionalRule = (curent: boolean, neighbors: number): boolean => {
    if (curent) {
        return neighbors >= 2 && neighbors <= 3;
    }
    else {
        return neighbors === 3;
    }
}

// Declarative rule ------------------------------------------------
export interface IJRule {
    nsr?: number, // neighbor Search Radius
    scenarios: {
        requiredState: boolean,
        isEnabled: boolean,
        requierments: {
            min: number,
            max: number,
        }[],
        setOnTrue: boolean,
        enableOnTrue: boolean,

        setOnFalse: boolean,
        enableOnFalse: boolean,
    }[]
}

export const genJRule = () => {
    return {
        nsr: 1,
        scenarios: [
            {
                requiredState: true,
                isEnabled: true,
                requierments: [
                    {
                        min: 2,
                        max: 3,
                    }
                ],
                setOnTrue: true,
                enableOnTrue: true,

                setOnFalse: false,
                enableOnFalse: true,
            },
            {
                requiredState: false,
                isEnabled: true,
                requierments: [
                    {
                        min: 3,
                        max: 3,
                    }
                ],
                setOnTrue: true,
                enableOnTrue: true,

                setOnFalse: false,
                enableOnFalse: true,
            }
        ]
    }
}

const originalIJRule: IJRule = genJRule();

// Matrix -----------------------------------------------------------

export interface IJRuleUser {
    ijRule: IJRule
}

export interface IMatrix {
    width: number,
    height: number,
    matrix: boolean[][],

    getCell(x: number, y: number): boolean,
    inverCell(x: number, y: number): void,
    // getCloneInstance(): Matrix
}

interface IConstrArgs {
    width: number,
    height: number,
    matrix?: boolean[][],
}

export default class Matrix implements IMatrix, IJRuleUser {

    width: number;
    height: number;

    matrix: boolean[][];

    ijRule: IJRule = originalIJRule;
    FRule: FFunctionalRule = clasicRuleFunction;

    constructor({
        height = 0,
        width = 0,
        matrix = Array(height).fill(false).map(() => Array(width).fill(false)),
    }: IConstrArgs) {

        this.height = height;
        this.width = width;
        this.matrix = matrix;
    }

    newEmptyMatrix(width: number, height: number): boolean[][] {
        return Array(height).fill(false).map(() => Array(width).fill(false));
    }

    getCell(x: number, y: number): boolean {
        return this.matrix[x][y];
    }
    setCell(x: number, y: number, val: boolean): void {
        this.matrix[x][y] = val;
    }
    inverCell(x: number, y: number,): void {
        this.matrix[x][y] = !this.matrix[x][y];
    }

    getCloneInstance(): Matrix {
        return new Matrix({ height: this.height, width: this.width, matrix: this.matrix });
    }

    isInMatrix(x: number, y: number): boolean {
        if (
            x >= this.height ||
            x < 0 ||
            y >= this.width ||
            y < 0
        ) {
            return false;
        }
        return true;
    }

    getNeighborsAlive(x: number, y: number, r: number = 1): number {
        let count = 0;
        for (let i = -1 * r; i <= r; i++) {
            for (let j = -1 * r; j <= r; j++) {
                if (
                    this.isInMatrix(x + i, y + j) &&
                    !(i === 0 && j === 0) // is not itself
                ) {
                    if (this.getCell(x + i, y + j) === true) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    // Executes functional rule
    getCellNextState_fRule(x: number, y: number): boolean {

        let cellIsAvlive = this.getCell(x, y);
        let neighbors = this.getNeighborsAlive(x, y);

        return this.FRule(cellIsAvlive, neighbors);
    }

    // Interprets declarative rule
    getCellNextState_dRule(x: number, y: number): boolean {

        let rule = this.ijRule;

        let cellState = this.getCell(x, y);
        let neighbors = this.getNeighborsAlive(x, y, rule.nsr);

        for (let i = 0; i < rule.scenarios.length; i++) {
            const scen = rule.scenarios[i];

            if (scen.requiredState === cellState && scen.isEnabled) {
                let passes = false;

                for (let j = 0; j < scen.requierments.length; j++) {
                    const req = scen.requierments[j];

                    if (req.min <= neighbors && neighbors <= req.max)
                        passes = true;
                };

                if ( passes && scen.enableOnTrue ){
                    return scen.setOnTrue;
                }

                if ( !passes && scen.enableOnFalse ){
                    return scen.setOnFalse;
                }

            }
        }
        return cellState;
    }

    computeNextGen(): boolean[][] {
        let newMatrix: boolean[][] = [];
        for (let i = 0; i < this.height; i++) {
            let row: boolean[] = [];
            for (let j = 0; j < this.width; j++) {
                row.push(this.getCellNextState_dRule(i, j));
                // row.push( this.getCellNextState_fRule(i,j) );
            }
            newMatrix.push(row);
        }
        return newMatrix;
    }

    nextGen(): void {
        this.matrix = this.computeNextGen();
    }

    getNextGenInstace(): Matrix {
        return new Matrix({ height: this.height, width: this.width, matrix: this.computeNextGen() });
    }



}