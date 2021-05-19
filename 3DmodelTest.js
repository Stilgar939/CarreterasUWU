const socket = io.connect('http://localhost:3000', { transports: ['websocket'] });

let scene, camera, renderer;
var x = 0.01, y = 0.01, z = 0.01, modelo, scoreVal = 0, createdCars = [];

socket.on('accelerometer', function (data) {
    let arr = []
    data.forEach(element => {
        //let el = element >= 0 ? -Math.abs(element / 100) : Math.abs(element / 100);
        //let el = element >= 0 ? -Math.abs(element) : Math.abs(element);
        arr.push(element * 1.5)
    });
    x = arr[0];
    y = arr[1];
    z = arr[2];
})

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
    light.intensity = 0.9;
    /*     light.castShadow = true;
        light.shadowCameraVisible = true;
        light.castShadow = true;
        light.shadowDarkness = 0.5;
    
        light.shadowCameraNear = 0;
        light.shadowCameraFar = 15;
    
        light.shadowCameraLeft = -5;
        light.shadowCameraRight = 5;
        light.shadowCameraTop = 5;
        light.shadowCameraBottom = -5; */

    scene.add(light);

    light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, 0);
    light2.intensity = 0.9;


    scene.add(light2);

    light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    light3.intensity = 0.9;

    scene.add(light3);

    light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 500);
    light4.intensity = 0.9;

    scene.add(light4);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    /* renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true; */

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);

    document.body.appendChild(renderer.domElement);

    var cancel = setInterval(createVehicles, 5000);

    let loader = new THREE.GLTFLoader();
    loader.load('models/ford-f150-2018-raptor/scene.gltf', function (gltf) {
        modelo = gltf.scene;

        modelo.castShadow = true;

        modelo.position.x = -100;
        modelo.position.y = -43;
        //camera.lookAt(gltf.scene.position);
        car = gltf.scene.children[0];
        //car.scale.set(0.5, 0.5, 0.5);
        scene.add(gltf.scene);
        animate();
    });
}

function createVehicles() {
    //todo create vehicles
    let loader = new THREE.GLTFLoader();

    let rand = Math.floor((Math.random() * 3) + 1);
    let randX = Math.floor(Math.random() * (35 - (-200)) + -(200));
    console.log(randX); 
     switch (rand) {
        case 1:
            loader.load('models/my_favorite_suv_-_suv_number_1/scene.gltf', function (gltf) {
                let model = gltf.scene;

                model.position.x = randX;
                model.position.y = -43;
                model.position.z = 680;
                //camera.lookAt(gltf.scene.position);
                //car.scale.set(0.5, 0.5, 0.5);
                createdCars.push(model);
                scene.add(gltf.scene);
            });
            break;
        case 2:
            loader.load('models/suv_1/scene.gltf', function (gltf) {
                let model = gltf.scene;

                model.position.x = randX;
                model.position.y = -43;
                model.position.z = 680;

                //camera.lookAt(gltf.scene.position);
                //car.scale.set(0.5, 0.5, 0.5);
                createdCars.push(model);

                scene.add(gltf.scene);
            });

            break;
        case 3:
            loader.load('models/suv_vr_rover_3d_model/scene.gltf', function (gltf) {
                let model = gltf.scene;

                model.position.x = randX;
                model.position.y = -43;
                model.position.z = 680;
                //camera.lookAt(gltf.scene.position);
                //car.scale.set(0.5, 0.5, 0.5);
                createdCars.push(model);

                scene.add(gltf.scene);
            });

            break;
    } 
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

    createdCars.forEach(element => {
        element.position.z -= 10;
    });

    if (modelo.position.x <= 41 && modelo.position.x >= -230) {
        modelo.position.x += x;
    } else if (modelo.position.x > 41) {
        modelo.position.x -= Math.abs(x);
    } else {
        modelo.position.x += Math.abs(x)
    }

    if (modelo.position.z > 640) {
        modelo.position.z = 640;
    } else if (modelo.position.z < -215) {
        modelo.position.z = -215;
    } else {
        modelo.position.z += z;
    }
    //-215
    modelo.position.z += z;
    modelo.position.x += x;
    /*     if(x > 0 && modelo.rotation.y < 0.1){
            modelo.rotation.y += 0.01;
        }else if(x < 0 && modelo.rotation.y > -0.1){
            modelo.rotation.y -= 0.01;
        }else{
            modelo.rotation.y = 0;
        }
     */
    //console.log({x : modelo.position.x, y: modelo.position.y, z: modelo.position.z});
    //console.log({x : modelo.rotation.x, y: modelo.rotation.y, z: modelo.rotation.z});

    let score = document.getElementById("score");
    scoreVal += 0.1;
    score.innerHTML = "Score: " + Math.trunc(scoreVal);
    //modelo.position.y += y;

}


init();