import React from "react";
import * as THREE from "three"


const CReactTreeJsRenderer = () => {

    const [renderer, setRenderer] = React.useState( new THREE.WebGLRenderer() );

    React.useEffect( () => {

        let navdiv = document.getElementById("canvasRoot");
        let canvas = renderer.domElement;
        navdiv?.appendChild(renderer.domElement);
        renderer.setSize( window.innerWidth, window.innerHeight );

        const fov = 45;
        const aspect =  window.innerWidth / window.innerHeight; 
        const near = 0.00001;
        const far = 10_000;
        let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        let AMOUNT = 500;
        camera.position.set( 60, 0, AMOUNT*1.3 );

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
                // let material = ( ( i + j ) % 2 === 0 ) ? gray_material : green_material;
                let cube = new THREE.Mesh(square_geometry, material);
                cube.position.x = i;
                cube.position.y = j;
                cube.callback = () => {
                    console.log( `Click: ${i}, ${j}` );
                    cube.material = ( cube.material === material_black ) ? material_white : material_black
                    // if( cube.material === material_black )
                    // {
                    //     cube.material = material_white;
                    // }
                    // else
                    // {
                    //     cube.material = material_black;
                    // }
                    
                    var startTime = performance.now()
                    renderer.render(scene, camera);
                    var endTime = performance.now();
                    console.log(`Call to RENDER took ${endTime - startTime} milliseconds`);
                    console.log("                ");

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

        group_matrix.position.set( -AMOUNT/2, -AMOUNT/2, 0 )

        scene.add(group_matrix);
        // ###########

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
    
        const onDocumentMouseDown = ( event ) => {
            var startTime = performance.now()
            mouse.x = ( (event.clientX - canvas.getBoundingClientRect().top ) / renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ( ( event.clientY - canvas.getBoundingClientRect().left ) / renderer.domElement.clientHeight ) * 2 + 1;
            // console.log("MOUSE-XY:");
            // console.log(mouse)
            raycaster.setFromCamera( mouse, camera );
    
            var intersects = raycaster.intersectObjects( group_matrix.children );
      
            for (let i = 0; i < intersects.length; i++) {
                // console.log( intersects[i] );
               intersects[i].object.callback();
               let pox = intersects[i].object.getPositionC();
            //    console.log( "POSITION: X: " + pox.x + " Y: " + pox.y );
            }
            // var startTime = performance.now()
            // console.log(`Call to RAYCAST took ${endTime - startTime} milliseconds`)
            var endTime = performance.now()
    
        }
        document.addEventListener('click', onDocumentMouseDown, false);

        // ###########
        // const onResize = () => {
        //     // console.log("Resized");
        //     canvas.height = window.innerHeight;
        //     canvas.width = window.innerWidth;
        //     let newAscpec = ( window.innerWidth / window.innerHeight ) //.toFixed(3); 
    
        //     let curentCamPos = camera.position;
        //     camera = new THREE.PerspectiveCamera(fov, newAscpec, near, far);
        //     // camera.position = curentCamPos;
        //     camera.position.set( 60, 50, 150 );
        //     navdiv.removeChild( canvas );
        //     navdiv?.appendChild(renderer.domElement);
        //     renderer.render(scene, camera);
        // };
        // window.addEventListener('resize', onResize, false);
        
        renderer.render(scene, camera);

        const render = () => {
            // const time = Date.now() * 0.001;

            // group_matrix.rotation.x = time * 0.05;
            // group_matrix.rotation.y = time * 0.5;

				renderer.render( scene, camera );
        };

        const animate = () => {

            requestAnimationFrame( animate );
            render();
            // stats.update();
            // console.log("___animate___");

        }

        // animate();
        render();

    },[]);
    

    return(
        <div
        id="canvasRoot"
        >
            
        </div>
    );
};

export default CReactTreeJsRenderer;