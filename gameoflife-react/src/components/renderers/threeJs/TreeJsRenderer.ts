import * as THREE from "three";
import { IMatrix } from "../../../models/CellMatrix/Matrix";

interface ICube extends THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> {
    getPositionInMatrix(): { x: number, y: number }
}

//
const NO_CELL: THREE.Vec2 = new THREE.Vector2( -1, -1 );

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
    material_coral = new THREE.MeshBasicMaterial({ color: 0xff7f50 });

    lastHover = NO_CELL ;
    cell_matrix: ICube[][] = [];

    onMouseClick: any;
    onMouseMove: any;
    onWindowResize: any;

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
        const fov = 58;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 0.00001;
        const far = 10_000;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera.position.set(0, 0, this.matrix.width);

        this.scene.background = new THREE.Color(0x161616);

        this.renderInitialMatrix();

        this.configOnClick();
        this.configOnHover();
        this.confOnResize();

        this.render();
        // console.log("C");
    }

    renderInitialMatrix() {

        const { width, height } = this.matrix;

        const widthSize = 1.0;
        const heightSize = 1.0;

        const square_geometry = new THREE.PlaneGeometry(widthSize, heightSize);

        const cell_matrix = [];

        for (let i = 0; i < width; i++) {
            const cell_row = [];
            for (let j = 0; j < height; j++) {

                let material = this.compMaterial( this.matrix.getCell(i, j) );
                let cell_mesh = new THREE.Mesh(square_geometry, material) as ICube;

                cell_mesh.position.x = j;
                cell_mesh.position.y = -i;
                cell_mesh.getPositionInMatrix = () => {
                    return {
                        x: i,
                        y: j
                    }
                }
                cell_row.push( cell_mesh );
                this.group_matrix.add(cell_mesh);
            }
            cell_matrix.push(cell_row);
        }
        this.cell_matrix = cell_matrix;

        this.group_matrix.position.set( -width/2 , height / 2, 0);

        this.scene.add(this.group_matrix);
    }

    configOnClick() {
        this.onMouseClick = (event: any) => {
            const hits = this.getCellByRay( event );

            for (let i = 0; i < hits.length; i++) {
                let { x, y } = hits[i];
                this.clickCallback(x, y);
            }
            // console.log("ThreeJs onClick");
        }
        document.addEventListener('click', this.onMouseClick);
    }
    configOnHover(){
        this.onMouseMove = (event: any) => {
            let hit = this.getCellByRay( event );
            if( hit.length > 0 ){
                this.heighliteCell(hit[0]);
            }
            else{
                this.heighliteCell(NO_CELL);
            }
            // console.log("ThreeJs onMove");
        }
        document.addEventListener('mousemove', this.onMouseMove);
    }
    confOnResize(){
        this.onWindowResize = () => {
            let { innerWidth, innerHeight } = window;

            this.camera.aspect = innerWidth / innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( innerWidth, innerHeight );

            this.render();
        }
        window.addEventListener( 'resize', this.onWindowResize );
    }

    heighliteCell( curent : THREE.Vec2 ): void{
        let update = false;
        if( this.lastHover !== NO_CELL ){
            let {x,y} = this.lastHover;
            this.cell_matrix[x][y].material = this.compMaterial( this.matrix.getCell(x,y) );
            update = true;
        }

        if( curent !== NO_CELL ){
            let {x,y} = curent;
            this.lastHover = curent;
            this.cell_matrix[x][y].material = this.material_coral;
            update = true;
        }

        if( update === true ) this.render()
    }

    getCellByRay( event: any ): THREE.Vec2[]{
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        const { top, left } = this.canvas.getBoundingClientRect();
        const { clientWidth, clientHeight } = this.renderer.domElement;

        mouse.x =   ( ( event.clientX - top )  / clientWidth  ) * 2 - 1;
        mouse.y = - ( ( event.clientY - left ) / clientHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, this.camera);

        var intersects = raycaster.intersectObjects(this.group_matrix.children);
        const hits: THREE.Vec2[] = [];

        for (let i = 0; i < intersects.length; i++) {
            let cube = intersects[i].object as ICube;
            hits.push( cube.getPositionInMatrix() );
        }
        return hits;
    }



    render() {
        this.renderer.render(this.scene, this.camera);
    }

    update() {
        const cell_matrix = this.cell_matrix;

        for (let i = 0; i < cell_matrix.length; i++) {
            const cell_row = cell_matrix[i];
            for (let j = 0; j < cell_row.length; j++) {
                const cell = cell_row[j];
                
                let { x, y } = cell.getPositionInMatrix();
                let material = this.compMaterial(this.matrix.getCell(x, y));
                cell.material = material;
            }
        }
        this.render();
    }

    compMaterial(state: boolean): THREE.MeshBasicMaterial {
        return state ? this.material_white : this.material_black;
    }

    destructor(){
        // console.log("D");
        document.removeEventListener('click', this.onMouseClick);
        document.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener( 'resize', this.onWindowResize );
    }

}