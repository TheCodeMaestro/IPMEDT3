let camera;
let numberOfEarthQuakes = 5;

document.addEventListener("DOMContentLoaded", () => {
  cameraRig.setAttribute("position", { x: 0, y: 0.1, z: 0 });
  camera = document.getElementById("js--camera");

  movePlayer();
  randomizePositionFossils();
  setPosTools();
  loopCollision();
  randomizePositionCactus();
  playSound();
  const oldPickaxeLocation = oldPickaxe.getAttribute("position");
  const oldPshovelLocation = oldPshovel.getAttribute("position");
});

function setPosTools() {
  const tools = document.getElementsByClassName("tools");

  for (let i = 0; i < tools.length; i++) {
    tools[0].object3D.position.set("-10", "1", "-17");
    tools[1].object3D.position.set("-9", "0.9", "-17");
  }
}

function loopCollision() {
  const fossils = document.getElementsByClassName("fossils");
  const tools = document.getElementsByClassName("tools");

  for (let i = 0; i < fossils.length; i++) {
    for (let j = 0; j < tools.length; j++) {
      if (collision(tools[j], fossils[i])) {
        document.getElementById("tekst").setAttribute("value", "MAGIE");
        break;
      } else {
        document.getElementById("tekst").setAttribute("value", "none");
      }
    }
  }
  setTimeout(loopCollision, 10);
}

function randomizePositionCactus() {
  const cacti = document.getElementsByClassName("cactus");

  for (let i = 0; i < cacti.length; i++) {
    cacti[i].setAttribute("rotation", "0 0 0");
    cacti[i].setAttribute("scale", "0.2 0.2 0.2");
    
    cactiPosX = getRandomIntExcluding(-20, 20, -9, 9);
    cactiPosY = getRandomIntExcluding(-20, 20, -9, 9);
    cacti[i].object3D.position.set(cactiPosX, "1", cactiPosY);
  }
}

function randomizePositionFossils() {
  const fossils = document.getElementsByClassName("fossils");

  for (let i = 0; i < fossils.length; i++) {
    fossilsPosX = getRandomInt(-9, 10);
    fossilsPosY = getRandomInt(-9, 10);

    fossils[i].object3D.position.set(fossilsPosX, "0", fossilsPosY);
  }
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

function getRandomIntExcluding(min, max, excludeMin, excludeMax) {
  let randomValue;
  do {
    randomValue = Math.floor(Math.random() * (max - min + 1) + min);
  } while (randomValue >= excludeMin && randomValue <= excludeMax);

  return randomValue;
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
      
      const pickaxe = document.getElementById("pickaxe")
      const shovel = document.getElementById("shovel")
      
      const newPickaxeLocation = document.getElementById("pickaxe").getAttribute("position");
      const newPshovelLocation = document.getElementsById("shovel").getAttribute("position");

      if (oldPickaxeLocation != newPickaxeLocation) {
        pickaxe.setAttribute("rotation", "90 90 90");
      };
      if (oldShovelLocation != newShovelLocation) {
        shovel.setAttribute("rotation", "90 90 90");
      };

    },
  });
}
