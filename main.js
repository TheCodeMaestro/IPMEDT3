// x 	Negative X axis extends left. Positive X Axis extends right.
// y 	Negative Y axis extends down. Positive Y Axis extends up.
// z 	Negative Z axis extends in. Positive Z Axis extends out.

let camera;
let numberOfEarthQuakes = 5;

window.onload = () => {
  camera = document.getElementById('js--camera');
  let sky = document.getElementById("background");

  createBoxes();
  randomizePositionFossils();

  setTimeout(() => {
    earthQuake();
  }, 3200)

  setTimeout(() => {
    sky.setAttribute("src", "#sky-errupt");
  }, 3000)
}

function createBoxes() {
  const scene = document.querySelector("a-scene");

  for (let z = -5; z <= 5; z++) { // left right
    for (let y = 0; y >= -2; y--) { // layers deep
      for (let x = -5; x <= 5; x++) { // front behind
        const cube = document.createElement("a-box");
        cube.classList.add("js--cube", "js--clickable");
        cube.setAttribute("position", `${x} ${y} ${z}`);
        cube.setAttribute("color", "#daa46d")
        scene.appendChild(cube);
      }
    }
  }
}

function randomizePositionFossils() {
  const fossils = document.getElementsByClassName("fossils");

  for (let i = 0; i < fossils.length; i++) {
    const fossilEl = fossils[i];
    let fossilElID = fossilEl.getAttribute("gltf-model");

    fossilsPosX = getRandomInt(-5, 6);
    fossilsPosY = getRandomInt(-5, 6);
    
    if (fossilElID == "#fossil-1") {
      fossilEl.setAttribute("position", `${fossilsPosX} 0.6 ${fossilsPosY}`);
    } if (fossilElID == "#fossil-2") {
      fossilEl.setAttribute("position", `${fossilsPosX} -0.4 ${fossilsPosY}`);
    }
  }
}

function earthQuake() {
  let i = 0;
  const quakeDuration = 400;
  const displacement = 0.02;
  const initialPosition = camera.getAttribute("position");
  const directions = [
    { x: -displacement, y: 0, z: 0 },
    { x: displacement, y: 0, z: 0 },
    { x: 0, y: displacement, z: 0 },
    { x: 0, y: -displacement, z: 0 }
  ];

  const startTime = performance.now();

  function animate() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;
    const progress = (elapsedTime % quakeDuration) / quakeDuration;

    const currentDirection = directions[Math.floor(progress * directions.length)];
    const newPosition = {
      x: initialPosition.x + currentDirection.x,
      y: initialPosition.y + currentDirection.y,
      z: initialPosition.z + currentDirection.z
    };

    camera.setAttribute("position", `${newPosition.x} ${newPosition.y} ${newPosition.z}`);

    if (elapsedTime < numberOfEarthQuakes * quakeDuration) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

function getRandomInt(min, max) {
  min = Math.ceil(min); //inclusive
  max = Math.floor(max); //exclusive
  return Math.floor(Math.random() * (max - min) + min);
}