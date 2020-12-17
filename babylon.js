// Using babylon.js to generate rotating points around the circles: https://www.babylonjs-playground.com/#2FPT1A#9
let scene = null;
const canvas = document.getElementById("myCanvas");

const createScene = async function (canvas) {
    //Select the myCanvas element

    const c = canvas.getContext("webgl");
    const engine = new BABYLON.Engine(c, true);
    const scene = new BABYLON.Scene(engine);
    const testCamera = new BABYLON.Vector3(0, 0, -0);
    const camera = new BABYLON.ArcRotateCamera(
        "camera1",
        0,
        0,
        0,
        testCamera,
        scene
    );
    camera.setPosition(new BABYLON.Vector3(0, 10, -50));
    camera.attachControl(canvas, true);

    const pl = new BABYLON.PointLight(
        "pl",
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    pl.diffuse = new BABYLON.Color3(1, 1, 1);
    pl.intensity = 1.0;

    const nb = 40;
    const fact = 30;

    const position = function (particle, i, s) {
        particle.position.x = 948 * fact;
        particle.position.y = 629 * fact;
        particle.position.z = 1 * fact;

        particle.rotation.x = 40 * 3.15;
        particle.position.y = 40 * 3.15;
        particle.position.z = 40 * 1.5;

        particle.color = new BABYLON.Color4(
            particle.position.x / fact + 0.5,
            particle.position.y / fact + 0.5,
            particle.position.z / fact + 0.5,
            1.0
        );
    };

    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", 32, 4, scene);

    const SPS = new BABYLON.SolidParticleSystem("SPS", scene);
    SPS.addShape(sphere, nb);
    const mesh = SPS.buildMesh();
    sphere.dispose();

    SPS.initParticles = function () {
        for (let i = 0; i < SPS.nbParticles; i++) {
            position(SPS.particles[i]);
        }
    };

    SPS.updateParticle = function (particle) {
        particle.rotation.x += particle.position.z / 100;
        particle.rotation.z += particle.position.x / 100;
    };

    SPS.initParticles();
    SPS.setParticles();

    SPS.computeParticleColor = false;
    SPS.computeParticleTexture = false;

    scene.registerBeforeRender(function () {
        pl.position = camera.position;
        SPS.mesh.rotation.y += 0.01;
        SPS.setParticles();
    });
    return scene;
};

createScene(canvas);
