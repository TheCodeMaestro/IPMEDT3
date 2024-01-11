let camera;
let numberOfEarthQuakes = 5;

window.onload = () => {
  camera = document.getElementById('js--camera');
  let sky = document.getElementById("background");
  cameraRig.setAttribute('position', { x: 0, y: 0, z: 1.8 });

  createBoxes();
  randomizePositionFossils();

  setTimeout(() => {
    earthQuake();
  }, 3200)

  setTimeout(() => {
    sky.setAttribute("src", "#sky-errupt");
  }, 3000)

  movePlayer();
};

function movePlayer() {
  AFRAME.registerComponent('thumbstick-logging', {
    init: function () {
      this.el.addEventListener('thumbstickmoved', this.movePlayer.bind(this));
    },
    movePlayer: function (evt) {
      // Adjust the player's position based on thumbstick movement
      const cameraRig = this.el;
      const speed = 0.01; // Adjust the speed as needed

      const newPosition = {
        x: cameraRig.getAttribute('position').x + evt.detail.x * speed,
        y: cameraRig.getAttribute('position').y,
        z: cameraRig.getAttribute('position').z + evt.detail.y * speed
      };

      cameraRig.setAttribute('position', newPosition);
    }
  });
}

function collision() {
  console.log('1');
  AFRAME.registerComponent('collision-listener', {
    init: function () {
      this.el.addEventListener('collide', this.onCollide.bind(this));
      console.log('2');
    },
    onCollide: function (event) {
      console.log('3');
      // Check if the collision is with the collisionPlane
      if (event.detail.body.el.id === 'collisionPlane') {
        console.log('4');
        // Change the body type of the dynamicEntity to static-body
        document.getElementById('dynamicEntity').setAttribute('static-body', '');
      }
    }
  });
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