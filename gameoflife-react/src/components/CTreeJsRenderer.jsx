import React from "react";
import * as THREE from "three"


const CTreeJsRenderer = () => {

    const [renderer, setRenderer] = React.useState( new THREE.WebGLRenderer() );

    React.useEffect( () => {
        
        let AMOUNT = 50;

        let canvRoot = document.getElementById("canvasRoot");
        canvRoot?.appendChild(renderer.domElement);

        let canvas = renderer.domElement;
        renderer.setSize( window.innerWidth, window.innerHeight );

        const fov = 55;
        const aspect =  window.innerWidth / window.innerHeight; 
        const near = 0.00001;
        const far = 10_000;
        let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        // camera.posiion.set( 0, 0, AMOUNT*1.3 );
        camera.position.set( 0, 0, AMOUNT );

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x154575);

        // ############
        const width = 1.0;
        const height = 1.0;
        const square_geometry = new THREE.PlaneGeometry(width, height);

        const material_black = new THREE.MeshBasicMaterial({ color: 0x000000 });  // greenish blue
        const material_white = new THREE.MeshBasicMaterial({ color: 0xffffff });  // gray

        const group_matrix = new THREE.Group();

        for (let i = 0; i < AMOUNT; i++) {
            for (let j = 0; j < AMOUNT; j++) {
                let material = material_black;
                let cube = new THREE.Mesh(square_geometry, material);
                cube.position.x = i;
                cube.position.y = j;
                cube.callback = () => {

                    console.log( `Click: ${i}, ${j}` );
                    cube.material = ( cube.material === material_black ) ? material_white : material_black
      
                    renderer.render(scene, camera);
                };
                cube.getPositionC = () => {
                    return {
                        x: i,
                        y: j
                    }
                }
                group_matrix.add(cube);
            }
        }

        group_matrix.position.set( -AMOUNT/2, -AMOUNT/2, 0 );

        scene.add(group_matrix);

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        const onDocumentMouseDown = ( event ) => {

            mouse.x = ( (event.clientX - canvas.getBoundingClientRect().top ) / renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ( ( event.clientY - canvas.getBoundingClientRect().left ) / renderer.domElement.clientHeight ) * 2 + 1;
            raycaster.setFromCamera( mouse, camera );
    
            var intersects = raycaster.intersectObjects( group_matrix.children );
      
            for (let i = 0; i < intersects.length; i++) {
               intersects[i].object.callback();
               let pox = intersects[i].object.getPositionC();
            
            }
        }
        document.addEventListener('click', onDocumentMouseDown, false);
        
        const render = () => {
            renderer.render( scene, camera );
        };

        render();
    },[]);
    

    return(
        <div
        id="canvasRoot"
        >
            
        </div>
    );
};

export default CTreeJsRenderer;