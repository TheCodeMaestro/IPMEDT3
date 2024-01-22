let camera, tools, fossils, earthLayer, stoneLayer;

document.addEventListener("DOMContentLoaded", () => {
  cameraRig.setAttribute("position", { x: 0, y: 0.1, z: 0 });
  camera = document.getElementById("js--camera");

  tools = document.getElementsByClassName("tool");
  fossils = document.getElementsByClassName("fossil");
  earthLayer = document.getElementsByClassName("earth");
  stoneLayer = document.getElementsByClassName("stone");

  movePlayer();
  randomizePositionFossilsAndRocks();
  setPosTools();
  loopCollision();
  playSound();
});

function setPosTools() {
  for (let i = 0; i < tools.length; i++) {
    tools[0].object3D.position.set("-13", "1", "3.6");
    tools[1].object3D.position.set("-13", "1", "2.6");
  }
}

function randomizePositionFossilsAndRocks() {
  for (let i = 0; i < fossils.length; i++) {
    posX = getRandomInt(-9, 10);
    posY = getRandomInt(-9, 10);

    fossils[i].object3D.position.set(posX, "0", posY);
    earthLayer[i].object3D.position.set(posX, "-0.05", posY);
    stoneLayer[i].object3D.position.set(posX, "-0.05", posY);
  }
}

function loopCollision() {
  // tool[0] = pickaxe

  for (let i = 0; i < stoneLayer.length; i++) {
    if (collision(tools[0], stoneLayer[i])) {
      stoneLayer[i].remove();
      break;
    }
  }
  for (let j = 0; j < earthLayer.length; j++) {
    if (collision(tools[1], earthLayer[j])) {
      earthLayer[j].remove();
      break;
    }
  }
  setTimeout(loopCollision, 10);
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

  return distance < 1; // 1m
}

function getRandomInt(min, max) {
  let randomValue;
  min = Math.ceil(min); //inclusive
  max = Math.floor(max); //exclusive

  do {
    randomValue = Math.floor(Math.random() * (max - min) + min);
  } while (randomValue === 0);

  return randomValue;
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

function movePlayer() {
  AFRAME.registerComponent("thumbstick-logging", {
    init: function () {
      this.el.addEventListener("thumbstickmoved", this.movePlayer.bind(this));
    },
    movePlayer: function (evt) {
      const cameraRig = this.el;
      const speed = 0.04;
      const newPosition = {
        x: cameraRig.getAttribute("position").x + evt.detail.x * speed,
        y: cameraRig.getAttribute("position").y,
        z: cameraRig.getAttribute("position").z + evt.detail.y * speed,
      };

      cameraRig.object3D.position.set(newPosition.x, newPosition.y, newPosition.z);
    },
  });
}