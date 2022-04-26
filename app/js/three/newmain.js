
if (document.querySelector('.main-page')) {
    let material;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    // {alpha: true }
    const renderer = new THREE.WebGLRenderer();
    const container = document.getElementById('box-model');
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);


    const ambientLight = new THREE.AmbientLight(0x9ECC00);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x000000);
    camera.add(pointLight);

    // // shadow

    const directionalLight = new THREE.DirectionalLight(0xffffff, .5);
    scene.add(directionalLight);


    const light = new THREE.PointLight(0xff0000, 0.1, 100);
    light.position.set(50, 500, 150);
    light.castShadow = true;
    scene.add(light);

    console.log(light.position);



    // // ==================

    camera.position.set(0, 0, 1500);
    // camera.position.z = 2500;
    // camera.position.y = 550;
    // camera.position.x = 2;
    // camera.scale.z = 0.9;


    console.log(camera);


    // method

    const Method = {
        INSTANCED: 'INSTANCED',
        MERGED: 'MERGED',
        NAIVE: 'NAIVE'
    };


    // api

    const api = {
        method: Method.INSTANCED,
        count: 10
    };

    function clean() {
        const meshes = [];

        scene.traverse(function (object) {
            if (object.isMesh) meshes.push(object);
        });


        for (let i = 0; i < meshes.length; i++) {

            const mesh = meshes[i];
            mesh.material.dispose();
            mesh.geometry.dispose();
            scene.remove(mesh);


        }

    }

    clean();
    const randomizeMatrix = function () {

        const position = new THREE.Vector3();
        const rotation = new THREE.Euler();
        const quaternion = new THREE.Quaternion();
        const scale = new THREE.Vector3();

        return function (matrix) {

            position.x = Math.random() * 40 - 20;
            position.y = Math.random() * 40 - 20;
            position.z = Math.random() * 40 - 20;

            rotation.x = Math.random() * 2 * Math.PI;
            rotation.y = Math.random() * 2 * Math.PI;
            rotation.z = Math.random() * 2 * Math.PI;

            quaternion.setFromEuler(rotation);

            scale.x = scale.y = scale.z = Math.random() * 1;

            console.log('matrix ', matrix);

            matrix.compose(position, quaternion, scale);

        };

    }();


    function makeInstanced(geometry) {

        const matrix = new THREE.Matrix4();

        const mesh = new THREE.InstancedMesh(geometry, material, api.count);

        for (let i = 0; i < api.count; i++) {

            randomizeMatrix(matrix);
            mesh.setMatrixAt(i, matrix);

        }

        scene.add(mesh);

      

        const geometryByteLength = getGeometryByteLength(geometry);
        console.log('geometryByteLength ', geometryByteLength);
        // guiStatsEl.innerHTML = [

        //     '<i>GPU draw calls</i>: 1',
        //     '<i>GPU memory</i>: ' + formatBytes(api.count * 16 + geometryByteLength, 2)

        // ].join('<br/>');

    }

    function getGeometryByteLength(geometry) {

        let total = 0;

        if (geometry.index) total += geometry.index.array.byteLength;

        for (const name in geometry.attributes) {

            total += geometry.attributes[name].array.byteLength;

        }

        return total;

    }


    // state

    const stats = new Stats();
    document.body.appendChild(stats.dom);




    // controls

    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;


    function initMesh() {
        clean();

        new THREE.OBJLoader().load(
            // resource URL
            '../models/log.obj',
            // called when resource is loaded
            function (object) {
                material = new THREE.MeshNormalMaterial();
                object.position.y = -500;
                object.position.x = -2000;
                object.position.z = -100;

                // makeInstanced(object);

                scene.add(object);

            },
            // called when loading is in progresses
            function (xhr) {

            },
            // called when loading has errors
            function (error) {

                console.log('error ', error);

            }
        );

    }

    initMesh();

    // gui 

    let gui = new GUI();
    gui.add(api, 'method', Method).onChange(initMesh);
    gui.add(api, 'count', 1, 200).step(1).onChange(initMesh);


    // load a resource


    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        stats.update();
        render();
    }

    function render() {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    animate();

console.log('start');
}