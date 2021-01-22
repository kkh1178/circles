// https://www.babylonjs-playground.com/#1UGDQC#4

var createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // //Add a camera to the scene and attach it to the canvas
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -5,
        -55,
        60,
        BABYLON.Vector3(10, 10, 10),
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
    //Select the myCanvas element
    const c = document.getElementById("renderCanvas");

    // Set the canvas width and height to the window objects width and height
    c.width = window.innerWidth - 5;
    c.height = window.innerHeight - 5;

    // will return a random whole number between the min and the max
    function genNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Calculate the Euclidean distance
    function dist(x1, y1, z1, x2, y2, z2) {
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
    }

    // Function to create non-overlapping planets
    function createPlanetPositions(num, diameter) {
        const positions = [];

        // While the length of the array is less than what we want, randomly generate circle paramaters
        while (positions.length < num) {
            const vector = {
                x: genNum(0, 20),
                y: genNum(0, 20),
                z: genNum(0, 20),
                diameter: diameter,
            };
            // Set the overlap to false
            let overlap = false;

            // Iterate through the array and generate the Euclidean distant in 3D
            for (let i = 0; i < positions.length; i++) {
                const test = positions[i];
                const d = dist(
                    vector.x,
                    vector.y,
                    vector.z,
                    test.x,
                    test.y,
                    test.z
                );

                // if eucledean distance is less than the sum of two radius (plus a buffer to keep the circles from
                // partially disappearing), push to the array
                if (d < vector.diameter + test.diameter + 1) {
                    overlap = true;
                }
            }
            if (!overlap) {
                positions.push(vector);
            }
        }
        return positions;
    }

    // function to build a planet
    function buildPlanet(planetName, diameter) {
        const planet = BABYLON.MeshBuilder.CreateSphere(
            planetName,
            { diameter },
            scene
        );
        // // randomly generate positioning for the planet
        // planet.position = new BABYLON.Vector3(genNum(2, 10), genNum(2, 10), 0);

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
    function buildSeedling(planet, seedlingName, planetDiameter) {
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

    function numberOfPlanets(num, diameter) {
        let planets = createPlanetPositions(num, diameter);
        for (let i = 0; i < num; i++) {
            let name = "planet" + i;
            planets[i].name = name;
        }
        // console.log(names);
        return planets;
    }

    let planetsObj = numberOfPlanets(4, 1);
    console.log(planetsObj);

    //
    let seedlings = [];

    // build the planets
    for (let i = 0; i < planetsObj.length; i++) {
        const planet = buildPlanet(planetsObj[i].name, planetsObj[i].diameter);

        planet.position.x = planetsObj[i].x;
        planet.position.y = planetsObj[i].y;
        planet.position.z = planetsObj[i].z;

        buildSeedlings(planet, 3, planetsObj[i].diameter);

        // return planet;
    }

    // const planets = planetObj.map((name, index) => {
    //     const planet = buildPlanet(name, planetPositions[index].diameter);

    //     planet.position.x = planetPositions[index].x;
    //     planet.position.y = planetPositions[index].y;
    //     planet.position.z = planetPositions[index].z;

    //     buildSeedlings(planet, 3);

    //     return planet;
    // });

    // Orbits for the seedlings
    let alpha = 0;
    scene.beforeRender = function () {
        seedlings.forEach((seedling, i) => {
            // Adding the orbits
            seedling.position = new BABYLON.Vector3(
                Math.sin(alpha + i),
                0,
                Math.cos(alpha + i)
                // 0
            );
        });
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
