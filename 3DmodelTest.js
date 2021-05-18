const socket = io.connect('http://localhost:3000', { transports: ['websocket'] });

socket.on('accelerometer', function (data) {
    let arr = []
    data.forEach(element => {
        //let el = element >= 0 ? -Math.abs(element / 100) : Math.abs(element / 100);
        //let el = element >= 0 ? -Math.abs(element) : Math.abs(element);
        arr.push(element)
    });
    x = arr[0];
    y = arr[1];
    z = arr[2];
})


let scene, camera, renderer;
var x = 0.01, y = 0.01, z = 0.01, modelo;

function init() {
    scene = new THREE.Scene();
    scene.background = null;

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    //camera.rotation.y = 45 / 180 * Math.PI;
    //camera.position.x = 800;
    //camera.position.y = 100;
    //camera.position.z = 1000;
    camera.position.x = 5.5;
    camera.position.y = 126.5;
    camera.position.z = -458.5;
    camera.rotation.x = -3;
    camera.rotation.y = 1;
    camera.rotation.z = 3;


    light = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 300, 500);
    light.intensity = 0.8;
    scene.add(light);

    light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, 0);
    light2.intensity = 0.8;
    scene.add(light2);

    light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    light3.intensity = 0.8;
    scene.add(light3);

    light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 500);
    light4.intensity = 0.8;
    scene.add(light4);

    renderer = new THREE.WebGLRenderer({ antialias: true , alpha : true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0x000000, 0 );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);

    document.body.appendChild(renderer.domElement);

    let loader = new THREE.GLTFLoader();
    loader.load('models/ford-f150-2018-raptor/scene.gltf', function (gltf) {
        modelo = gltf.scene;
        modelo.position.x = -100;
        modelo.position.y = -43;
        //camera.lookAt(gltf.scene.position);
        car = gltf.scene.children[0];
        //car.scale.set(0.5, 0.5, 0.5);
        scene.add(gltf.scene);
        animate();
    });
}

function animate() {
    renderer.render(scene, camera);
    update();
    requestAnimationFrame(animate);
}

function update() {
    //console.log("moving");
    //console.log(modelo);
    //115, -230
    if(modelo.position.x <= 41 && modelo.position.x >= -230 ){
        modelo.position.x += x;
    }else if(modelo.position.x > 41){
        modelo.position.x = 41;
    }else{
        modelo.position.x = -230
    }
    /* if(x > 1){
        modelo.rotation.y += 0.01;
    }else{
        modelo.rotation.y -= 0.01;
    }
     */
    console.log(camera);
    console.log(modelo.position.x);
    //modelo.position.y += y;


}


init();