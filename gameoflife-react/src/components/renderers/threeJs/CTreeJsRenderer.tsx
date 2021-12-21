import React from "react";
import { ICMatrixRenderer } from "../../../models/Matrix";
import TreeJsRenderer from "./TreeJsRenderer";

const CTreeJsRenderer: React.FC<ICMatrixRenderer> = ({ matrix, onCellClickCallback }) => {

    const [treeMatrix, steTreeMatrix] = React.useState<TreeJsRenderer>();

    React.useEffect(() => {

        const newThreeMatrix =  new TreeJsRenderer({
            matrix: matrix,
            clickCallback: onCellClickCallback
        });

        steTreeMatrix(
            newThreeMatrix
        );

        return () => {
            newThreeMatrix.destructor();
        };

    }, []);
        
    treeMatrix?.update();

    return (
        <div
            id="canvasRoot"
        >
        </div>
    );
};

export default CTreeJsRenderer;