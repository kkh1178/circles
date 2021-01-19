/// <reference path="./vendor/babylon.d.ts" />

// https://www.babylonjs-playground.com/#1UGDQC#4

var createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // //Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -5,
        -5,
        5,
        BABYLON.Vector3.Zero(),
        scene
    );

    // Different camera angles

    // const camera = new BABYLON.ArcRotateCamera(
    //     "camera",
    //     -Math.PI / 2,
    //     Math.PI / 2.5,
    //     3,
    //     new BABYLON.Vector3(0, 0, 0),
    //     scene
    // );
    // const camera = new BABYLON.FreeCamera(
    //     "camera",
    //     new BABYLON.Vector3(0, 0, -10),
    //     scene
    // );

    //

    // This will keep the camera from zooming in too far and inside out
    camera.lowerRadiusLimit = 3;

    camera.attachControl(canvas, true);
    // camera.setPosition(new BABYLON.Vector3(-1, 10, 0));
    camera.upperRadiusLimit = 2000;
    // Add a lights to the scene

    const light = new BABYLON.HemisphericLight(
        "light",
        // light will be from above like a ceiling light
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    // Make the shapes

    // First planet
    const planet = BABYLON.MeshBuilder.CreateSphere(
        "planet",
        { radius: 10 },
        scene
    );
    // planet.position.x = 1;
    planet.position = new BABYLON.Vector3(0, 0, 0);
    // planet.scaling = new BABYLON.Vector3(5, 5, 5);
    console.log(planet.position.x);

    // Seedlings
    const seedling = BABYLON.MeshBuilder.CreateSphere(
        "seedling",
        { radius: 0.00001 },
        scene
    );
    seedling.position = new BABYLON.Vector3(0.2, 0.2, 0);
    seedling.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    console.log(seedling.position.x);

    // Making the orbits for the seedlings
    // seedling.orbit = {
    //     radius: planet.position.x,
    //     speed: 0.01,
    //     angle: 1,
    // };

    // Making trails for the seedlings - https://playground.babylonjs.com/#1F4UET#4
    scene.enablePhysics();
    seedling.physicsImpostor = new BABYLON.PhysicsImpostor(
        seedling,
        BABYLON.PhysicsImpostor.SphereImpostor,
        { mass: 1, restitution: 0.6 }
    );

    var trail = new BABYLON.TrailMesh(
        "seedling trail",
        seedling,
        scene,
        0.25,
        50,
        true
    );

    seedling.parent = planet;

    // Materials for the texture of the planets and seedlings

    // Adding a glow but only to the seedling and its trail
    // (https://playground.babylonjs.com/#LRFB2D#30)
    const gl = new BABYLON.GlowLayer("glow", scene, {
        mainTextureSamples: 4,
    });

    // Here I can change the intensity of the glow
    // gl.intensity = 2;

    // Adding the glow to the seedling and trail mesh
    gl.addIncludedOnlyMesh(seedling);
    gl.addIncludedOnlyMesh(trail);

    // more materials
    var planetMaterial = new BABYLON.StandardMaterial("material", scene);
    planetMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);

    // Creating a teal color for the seedling and trail
    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    material.emissiveColor = new BABYLON.Color3.Teal();
    seedling.material = material;
    trail.material = material;

    // Create leathery material for planet
    const material2 = new BABYLON.StandardMaterial("material2", scene);
    material2.diffuseTexture = new BABYLON.Texture("leather_test.png", scene);
    planet.material = material2;

    // Adding the orbits
    let alpha = 0;
    scene.beforeRender = function () {
        seedling.position = new BABYLON.Vector3(
            Math.sin(alpha),
            seedling.parent.position.y,
            Math.cos(alpha)
        );
        // speed of the seedling orbit
        alpha += 0.01;
    };

    return scene;
};
// Get the canvas element
const canvas = document.getElementById("renderCanvas");

// Generate the BABYLON 3D engine
const engine = new BABYLON.Engine(canvas, true);

//Call the createScene function; Register a render loop to repeatedly render the scene
const runScene = createScene();
engine.runRenderLoop(function () {
    runScene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});
