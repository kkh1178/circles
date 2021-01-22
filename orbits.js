/// <reference path="./vendor/babylon.d.ts" />

// https://www.babylonjs-playground.com/#1UGDQC#4

var createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // //Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -5,
        -5,
        20,
        BABYLON.Vector3.Zero(),
        scene
    );

    // This will keep the camera from zooming in too far and inside out
    camera.lowerRadiusLimit = 15;

    camera.attachControl(canvas, true);

    // keeps camera from zooming too far out
    camera.upperRadiusLimit = 200;

    // Add a light to the scene
    const light = new BABYLON.HemisphericLight(
        "light",
        // light will be from above like a ceiling light
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    // MAKING THE PLANETS AND SEEDLINGS

    // will return a random whole number between the min and the max
    function genNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // function to build a planet
    function buildPlanet(planetName, diameter) {
        const planet = BABYLON.MeshBuilder.CreateSphere(
            planetName,
            { diameter },
            scene
        );
        // randomly generate positioning for the planet
        planet.position = new BABYLON.Vector3(genNum(2, 10), genNum(2, 10), 0);

        // Adding materials for the planet
        const materialPlanet = new BABYLON.StandardMaterial(
            "materialPlanet",
            scene
        );
        materialPlanet.diffuseTexture = new BABYLON.Texture(
            "leather_test.png",
            scene
        );
        planet.material = materialPlanet;

        return planet;
    }

    // Building a seedling
    function buildSeedling(planet, seedlingName) {
        // Making the first seedling
        const seedling = BABYLON.MeshBuilder.CreateSphere(
            seedlingName,
            { diameter: 0.15 },
            scene
        );

        // Setting the planet as the seedling0s parent
        seedling.parent = planet;
        seedling.position = new BABYLON.Vector3(1, 1, 0);

        // Creating the trail for the seedling
        var trail = new BABYLON.TrailMesh(
            seedlingName + "Trail",
            seedling,
            scene,
            0.08,
            40,
            true
        );

        // Creating a glow layer
        const gl = new BABYLON.GlowLayer("glow", scene, {
            mainTextureSamples: 4,
        });

        // Here I can change the intensity of the glow
        gl.intensity = 2;

        // Adding the glow to the seedling and trail mesh
        gl.addIncludedOnlyMesh(seedling);
        gl.addIncludedOnlyMesh(trail);

        // Creating a teal color for the seedling and trail
        const material = new BABYLON.StandardMaterial("material", scene);
        material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        material.emissiveColor = new BABYLON.Color3.Teal();
        seedling.material = material;
        trail.material = material;
        return seedling;
    }

    function buildSeedlings(planet, numberSeedlings) {
        for (let i = 0; i < numberSeedlings; i++) {
            seedlings.push(buildSeedling(planet, `seedling{i}`));
        }
    }

    planetNames = ["p1", "p2"];
    seedlings = [];

    const planets = planetNames.map((name) => {
        const planet = buildPlanet(name, 1);
        console.log(planet.position);

        buildSeedlings(planet, 1);

        return planet;
    });

    let alpha = 0;

    // console.log(seedling.parent.position.y);
    scene.beforeRender = function () {
        seedlings.forEach((seedling, i) => {
            // Adding the orbits
            seedling.position = new BABYLON.Vector3(
                Math.sin(alpha + i),
                0,
                Math.cos(alpha + i)
                // 0
            );
            // speed of the seedling orbit
        });
        alpha += 0.01;
    };
    // Function to create the planets and seedlings
    // function createPlanetsSeedlings(num) {
    //     // limit the number of planets
    //     if (num < 10) {
    //         for (let i = 1; i < num; i++) {
    //             // Testing to see if I can clone based on an array
    //             let name = "planet" + i;
    //             planetNames.push(name);

    //             let seedlingName = "seedling" + i;
    //             seedlingNames.push(seedlingName);
    //         }

    //         // Making the first planet
    //         let radius = 1;
    //         const planet0 = BABYLON.MeshBuilder.CreateSphere(
    //             "planet0",
    //             { diameter: radius },
    //             scene
    //         );
    //         // put the first planet at all zero coordinates
    //         planet0.position = new BABYLON.Vector3(0, 0, 0);

    //         // Adding materials for the planet
    //         const materialPlanet = new BABYLON.StandardMaterial(
    //             "materialPlanet",
    //             scene
    //         );
    //         materialPlanet.diffuseTexture = new BABYLON.Texture(
    //             "leather_test.png",
    //             scene
    //         );
    //         planet0.material = materialPlanet;

    //         // cloning the planet meshes
    //         planetNames.map(function (planetName) {
    //             planetName = planet0.clone({ planetName });
    //             planetName.position = new BABYLON.Vector3(
    //                 genNum(2, 20),
    //                 genNum(2, 20),
    //                 0
    //             );
    //         });

    //         // Making the first seedling
    //         const seedling0 = BABYLON.MeshBuilder.CreateSphere(
    //             "seedling0",
    //             { diameter: 0.15 },
    //             scene
    //         );

    //         // Setting the planet as the seedling0s parent
    //         seedling0.parent = planet0;
    //         seedling0.position = new BABYLON.Vector3(1, 1, 0);

    //         // Creating the trail for the seedling
    //         var trail0 = new BABYLON.TrailMesh(
    //             "seedlingTrail0",
    //             seedling0,
    //             scene,
    //             0.08,
    //             40,
    //             true
    //         );

    //         // Creating a glow layer
    //         const gl = new BABYLON.GlowLayer("glow", scene, {
    //             mainTextureSamples: 4,
    //         });

    //         // Here I can change the intensity of the glow
    //         gl.intensity = 2;

    //         // Adding the glow to the seedling and trail mesh
    //         gl.addIncludedOnlyMesh(seedling0);
    //         gl.addIncludedOnlyMesh(trail0);

    //         // Creating a teal color for the seedling and trail
    //         const material = new BABYLON.StandardMaterial("material", scene);
    //         material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    //         material.emissiveColor = new BABYLON.Color3.Teal();
    //         seedling0.material = material;
    //         trail0.material = material;

    //         // cloning the seedlings
    //         seedlingNames.map(function (seedlingName, index) {
    //             seedlingName = seedling0.clone({ seedlingName });
    //             parentName = planetNames[index];
    //             seedlingName.parent = window[parentName];
    //             // console.log(seedlingName.parent);
    //             // seedlingName.position =
    //         });

    //         console.log(seedling0.parent);
    //         // Adding the orbits
    //         let alpha = 0;
    //         // console.log(seedling.parent.position.y);
    //         scene.beforeRender = function () {
    //             seedling0.position = new BABYLON.Vector3(
    //                 Math.sin(alpha),
    //                 seedling0.parent.position.y,
    //                 Math.cos(alpha)
    //             );
    //             // speed of the seedling orbit
    //             alpha += 0.01;
    //         };
    //     }
    // }

    // createPlanetsSeedlings(5);

    // console.log(seedling.parent.position.y);
    // scene.beforeRender = function () {
    //     seedlingNames.forEach((seedling) => {
    //         seedling.position = new BABYLON.Vector3(
    //             Math.sin(alpha),
    //             seedling.position.y,
    //             Math.cos(alpha)
    //         );
    //     });

    //     // speed of the seedling orbit
    //     alpha += 0.01;
    // };
    // console.log(seedlingNames);
    // console.log(planetNames);

    // TESTING STUFF

    // // First planet
    // const planet = BABYLON.MeshBuilder.CreateSphere(
    //     "planet",
    //     { diameter: 1.5 },
    //     scene
    // );

    // planet.position = new BABYLON.Vector3(0, 0, 0);
    // // planet.scaling = new BABYLON.Vector3(5, 5, 5);

    // const planet2 = planet.clone("planet2");
    // planet2.position = new BABYLON.Vector3(genNum(2, 5), genNum(2, 5), 0);

    // // Seedlings
    // const seedling = BABYLON.MeshBuilder.CreateSphere(
    //     "seedling",
    //     { diameter: 0.15 },
    //     scene
    // );
    // // seedling.position = new BABYLON.Vector3(1, 1, 0);

    // // seedling.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);

    // // Making trails for the seedlings - https://playground.babylonjs.com/#1F4UET#4
    // // scene.enablePhysics();
    // // seedling.physicsImpostor = new BABYLON.PhysicsImpostor(
    // //     seedling,
    // //     BABYLON.PhysicsImpostor.SphereImpostor,
    // //     { mass: 1, restitution: 0.6 }
    // // );

    // const trail = new BABYLON.TrailMesh(
    //     "seedling trail",
    //     seedling,
    //     scene,
    //     0.08,
    //     40,
    //     true
    // );

    // seedling.parent = planet;

    // // cloning the seedling
    // const seedling2 = seedling.clone("seedling2");
    // const trail2 = new BABYLON.TrailMesh(
    //     "seedling trail 2",
    //     seedling2,
    //     scene,
    //     0.08,
    //     40,
    //     true
    // );
    // // const trail2 = trail.clone("trail2");
    // seedling2.parent = planet2;

    // console.log(seedling2.parent);
    // // Materials for the texture of the planets and seedlings

    // // Adding a glow but only to the seedling and its trail
    // // (https://playground.babylonjs.com/#LRFB2D#30)
    // const gl = new BABYLON.GlowLayer("glow", scene, {
    //     mainTextureSamples: 4,
    // });

    // // Here I can change the intensity of the glow
    // gl.intensity = 1;

    // // Adding the glow to the seedling and trail mesh
    // gl.addIncludedOnlyMesh(seedling);
    // gl.addIncludedOnlyMesh(trail);

    // gl.addIncludedOnlyMesh(seedling2);
    // gl.addIncludedOnlyMesh(trail2);

    // // Creating a teal color for the seedling and trail
    // const material = new BABYLON.StandardMaterial("material", scene);
    // material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    // material.emissiveColor = new BABYLON.Color3.Teal();
    // seedling.material = material;
    // trail.material = material;
    // seedling2.material = material;
    // trail2.material = material;

    // // Create leathery material for planet
    // const material2 = new BABYLON.StandardMaterial("material2", scene);
    // material2.diffuseTexture = new BABYLON.Texture("leather_test.png", scene);
    // planet.material = material2;
    // planet2.material = material2;

    // // Adding the orbits
    // let alpha = 0;
    // scene.beforeRender = function () {
    //     seedling.position = new BABYLON.Vector3(
    //         Math.sin(alpha),
    //         seedling.parent.position.y,
    //         Math.cos(alpha)
    //     );

    //     seedling2.position = new BABYLON.Vector3(
    //         Math.sin(alpha),
    //         seedling2.parent.position.y,
    //         Math.cos(alpha)
    //     );
    //     // speed of the seedling orbit
    //     alpha += 0.01;
    // };

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
