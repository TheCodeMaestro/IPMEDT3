let camera;
let numberOfEarthQuakes = 5;

document.addEventListener("DOMContentLoaded", () => {
  cameraRig.setAttribute("position", { x: 0, y: 0.5, z: 0 });
  camera = document.getElementById("js--camera");

  movePlayer();
  createBoxes();
  randomizePositionFossils();
  // startEarthQuake(4000);
  playSound();
  loop();
  
  const tools = document.getElementsByClassName("tools");

  for (let i = 0; i < tools.length; i++) {
    tools[0].object3D.position.set("-10", "1", "-17");
    tools[1].object3D.position.set("-9", "0.9", "-17");

    tools[i].setAttribute("position", tools[i].object3D.position);

    console.log(tools[0].object3D.position);
    console.log(tools[1].object3D.position);
  }
});

function loop() {
  const fossils = document.getElementsByClassName("fossils");
  const tools = document.getElementsByClassName("tools");
  const dig = document.getElementById("sound-dig");
      dig.play();

  for (let i = 0; i < fossils.length; i++) {
    for (let j = 0; j < tools.length; j++) {
      if (collision(tools[j], fossils[i])) {
        document.getElementById("tekst").setAttribute("value", "MAGIE");
        break; // exit the inner loop once a collision is found
      } else {
        document.getElementById("tekst").setAttribute("value", "none"); // reset value if no collision
      }
    }
  }
  setTimeout(loop, 10);
}

function movePlayer() {
  AFRAME.registerComponent("thumbstick-logging", {
    init: function () {
      this.el.addEventListener("thumbstickmoved", this.movePlayer.bind(this));
    },
    movePlayer: function (evt) {
      const cameraRig = this.el;
      const speed = 0.03;
      const newPosition = {
        x: cameraRig.getAttribute("position").x + evt.detail.x * speed,
        y: cameraRig.getAttribute("position").y,
        z: cameraRig.getAttribute("position").z + evt.detail.y * speed,
        
  
      };

      cameraRig.object3D.position.set(
        newPosition.x,
        newPosition.y,
        newPosition.z
      );
    },
  });
}

function collision(obj1, obj2) {
  let xobj1 = obj1.object3D.position.x;
  let yobj1 = obj1.object3D.position.y;
  let zobj1 = obj1.object3D.position.z;
  let xobj2 = obj2.object3D.position.x;
  let yobj2 = obj2.object3D.position.y;
  let zobj2 = obj2.object3D.position.z;

  let distance = Math.sqrt(
    (xobj2 - xobj1) ** 2 + (yobj2 - yobj1) ** 2 + (zobj2 - zobj1) ** 2
  );

  return distance < 0.5; // 1m
}

function createBoxes() {
  const scene = document.querySelector("a-scene");

  for (let z = -5; z <= 5; z++) {
    // left right
    for (let y = 0; y >= -2; y--) {
      // layers deep
      for (let x = -5; x <= 5; x++) {
        // front behind
        const cube = document.createElement("a-box");
        cube.classList.add("js--cube", "js--clickable");
        cube.setAttribute("position", `${x} ${y} ${z}`);
        cube.setAttribute("color", "#daa46d");
        cube.setAttribute("id", `${y}`);
        scene.appendChild(cube);
      }
    }
  }
}

function randomizePositionFossils() {
  const fossils = document.getElementsByClassName("fossils");
  const tools = document.getElementsByClassName("tools");

  for (let i = 0; i < fossils.length; i++) {
    const fossilEl = fossils[i];
    let fossilElID = fossilEl.getAttribute("gltf-model");

    fossilsPosX = getRandomInt(-5, 6);
    fossilsPosY = getRandomInt(-5, 6);

    if (fossilsPosX == 0 || fossilsPosY == 0) {
      fossilsPosX = getRandomInt(-5, 6);
      fossilsPosY = getRandomInt(-5, 6);
    }

    // fossilPositions = array[0.6, -0.4, 0.4, 0.9];
    // fossilModels = array["#fossil-1", "#fossil-2", "#fossil-3", "#fossil-4"]

    // for (let i = 0; i < fossils.length; i++) {
    //   const element = array[i];

    //   if (fossilElID == "fossil-" + (i + 1)) {
    //   }

    if (fossilElID == "fossil-1") {
      fossilEl.object3D.position.set(fossilsPosX, 0.6, fossilsPosY);
    }
    if (fossilElID == "fossil-2") {
      fossilEl.object3D.position.set(fossilsPosX, -0.4, fossilsPosY);
    }
    if (fossilElID == "fossil-3") {
      fossilEl.object3D.position.set(fossilsPosX, 0.4, fossilsPosY);
    }
    if (fossilElID == "fossil-4") {
      fossilEl.object3D.position.set(fossilsPosX, 0.9, fossilsPosY);
    }
  }
}

function startEarthQuake(timeout) {
  let sky = document.getElementById("background");

  setTimeout(() => {
    earthQuake();
  }, timeout + 200);

  setTimeout(() => {
    sky.setAttribute("src", "#sky-errupt");
  }, timeout);
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
    { x: 0, y: -displacement, z: 0 },
  ];

  const startTime = performance.now();

  function animate() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - startTime;
    const progress = (elapsedTime % quakeDuration) / quakeDuration;

    const currentDirection =
      directions[Math.floor(progress * directions.length)];
    const newPosition = {
      x: initialPosition.x + currentDirection.x,
      y: initialPosition.y + currentDirection.y,
      z: initialPosition.z + currentDirection.z,
    };

    camera.object3D.position.set(newPosition.x, newPosition.y, newPosition.z);
    cameraRig.object3D.position.set(
      newPosition.x,
      newPosition.y,
      newPosition.z
    );

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

function playSound() {
  document.addEventListener("keydown", function (event) {
    if (event.key === "z" || event.key === "Z") {
      const mine = document.getElementById("sound-mine");
      mine.play();
    }
    if (event.key === "x" || event.key === "X") {
      const brush = document.getElementById("sound-brush");
      brush.play();
    }
    if (event.key === "c" || event.key === "C") {
      const dig = document.getElementById("sound-dig");
      dig.play();
    }
  });
}
