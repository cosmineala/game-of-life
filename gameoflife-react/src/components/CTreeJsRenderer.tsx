import React from "react";
import * as THREE from "three"
import { ICMatrixRenderer } from "../models/Matrix";
import TreeJsRenderer from "./TreeJsRenderer";

interface ICube extends THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> {
    getPositionInMatrix(): {x: number, y: number}
}


const CTreeJsRenderer: React.FC<ICMatrixRenderer> = ({ matrix, onCellClickCallback}) =>{

    const [ treeMatrix, steTreeMatrix ] = React.useState<TreeJsRenderer>();
    

    // React.useEffect( () => {
    //     treeMatrix.update( matrix );
    // }, [matrix]);

    React.useEffect( () => {
        steTreeMatrix(
            new TreeJsRenderer({
                matrix: matrix,
                canvRoot: document.getElementById("canvasRoot"),
                clickCallback: onCellClickCallback
            })
        )
    }, [] );

    treeMatrix?.update( matrix );

    return(
        <div
        id="canvasRoot"
        >
            
        </div>
    );
};

export default CTreeJsRenderer;