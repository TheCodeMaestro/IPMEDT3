let camera, tools, fossils;

document.addEventListener("DOMContentLoaded", () => {
  cameraRig.setAttribute("position", { x: 0, y: 0.1, z: 0 });
  camera = document.getElementById("js--camera");

  tools = document.getElementsByClassName("tools");
  fossils = document.getElementsByClassName("fossils");

  movePlayer();
  randomizePositionFossils();
  setPosTools();
  loopCollision();
  playSound();
  setStateFossil();
});

function setPosTools() {
  for (let i = 0; i < tools.length; i++) {
    tools[0].object3D.position.set("-10", "1", "-17");
    tools[1].object3D.position.set("-9", "0.9", "-17");
  }
}

function setStateFossil(fossilTarget) {

}

function randomizePositionFossils() {
  for (let i = 0; i < fossils.length; i++) {
    fossilsPosX = getRandomInt(-9, 10);
    fossilsPosY = getRandomInt(-9, 10);

    fossils[i].object3D.position.set(fossilsPosX, "0", fossilsPosY);
  }
}

function loopCollision() {
  for (let i = 0; i < tools.length; i++) {
    for (let j = 0; j < fossils.length; j++) {
      if (collision(tools[i], fossils[j])) {
        fossils[j].remove();
        break;
      }
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