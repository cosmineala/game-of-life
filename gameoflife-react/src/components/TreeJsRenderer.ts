import * as THREE from "three";
import { IMatrix } from "../models/Matrix";

interface ICube extends THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> {
    getPositionInMatrix(): { x: number, y: number }
}

//

interface IConstrArgs {
    matrix: IMatrix,
    clickCallback(x: number, y: number): void
}

export default class TreeJsRenderer implements IConstrArgs {

    matrix;
    canvRoot;
    renderer = new THREE.WebGLRenderer();
    clickCallback;

    canvas = this.renderer.domElement;

    camera: THREE.PerspectiveCamera;
    scene = new THREE.Scene();
    group_matrix = new THREE.Group();

    material_black = new THREE.MeshBasicMaterial({ color: 0x000000 });  // greenish blue
    material_white = new THREE.MeshBasicMaterial({ color: 0xffffff });

    constructor({
        matrix,
        clickCallback
    }: IConstrArgs) {

        this.matrix = matrix;
        this.clickCallback = clickCallback;

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // render canvas
        this.canvRoot = document.getElementById("canvasRoot");
        this.canvRoot?.appendChild(this.canvas);

        // config camera
        const fov = 55;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.00001;
        const far = 10_000;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(0, 0, this.matrix.width);

        this.scene.background = new THREE.Color(0x154575);

        this.renderInitialMatrix();

        this.configRaycast();
        this.confOnResize();

        this.render();

    }

    renderInitialMatrix() {
        const { width, height } = this.matrix;

        const widthSize = 1.0;
        const heightSize = 1.0;
        const square_geometry = new THREE.PlaneGeometry(widthSize, heightSize);

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {

                let material = this.compMaterial( this.matrix.getCell(i, j));
                let cube = new THREE.Mesh(square_geometry, material) as ICube;
                // let material = ( ( i + j ) % 2 === 0 ) ? this.material_black : this.material_white;

                cube.position.x = i;
                cube.position.y = j;
                cube.getPositionInMatrix = () => {
                    return {
                        x: i,
                        y: j
                    }
                }

                this.group_matrix.add(cube);
            }
        }

        this.group_matrix.position.set(-width / 2, -height / 2, 0);

        this.scene.add(this.group_matrix);
    }

    configRaycast() {
        const onDocumentMouseDown = (event: any) => {
            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector2();

            const { top, left } = this.canvas.getBoundingClientRect();
            const { clientWidth, clientHeight } = this.renderer.domElement;

            mouse.x =   ( ( event.clientX - top )  / clientWidth  ) * 2 - 1;
            mouse.y = - ( ( event.clientY - left ) / clientHeight ) * 2 + 1;
            raycaster.setFromCamera(mouse, this.camera);

            var intersects = raycaster.intersectObjects(this.group_matrix.children);

            for (let i = 0; i < intersects.length; i++) {
                let cube = intersects[i].object as ICube;
                let { x, y } = cube.getPositionInMatrix();
                this.clickCallback(x, y);
            }
        }
        document.addEventListener('click', onDocumentMouseDown, false);
    }

    confOnResize(){
        const onDocumentresize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.render();
        }
        window.addEventListener( 'resize', onDocumentresize, false );
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    update() {
        let list = this.group_matrix.children;
        list.forEach(element => {

            let cube = element as ICube;
            let { x, y } = cube.getPositionInMatrix();

            let material = this.compMaterial(this.matrix.getCell(x, y));
            cube.material = material;

        });
        this.render();
    }

    compMaterial(state: boolean): THREE.MeshBasicMaterial {
        return state ? this.material_white : this.material_black;
    }


}