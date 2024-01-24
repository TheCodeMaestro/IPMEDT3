let camera, tools, fossils, earthLayer, stoneLayer, scanner, name, age, sediment, description;

document.addEventListener("DOMContentLoaded", () => {
  cameraRig.setAttribute("position", { x: 0, y: 0.1, z: 0 });
  camera = document.getElementById("js--camera");

  tools = document.getElementsByClassName("tool");
  fossils = document.getElementsByClassName("fossil");
  invisFossils = document.getElementsByClassName("invis-fossil");
  earthLayer = document.getElementsByClassName("earth");
  stoneLayer = document.getElementsByClassName("stone");
  // fossilTypes = document.getElementsByClassName("test-fossil");
  textName = document.getElementById("fossil-name");
  age = document.getElementById('fossil-age');
  sediment = document.getElementById('fossil-sediment');
  description = document.getElementById('fossil-description');

  movePlayer();
  randomizePositionFossilsAndRocks();
  setPosTools();
  loopCollision();
});

function setPosTools() {
  for (let i = 0; i < tools.length; i++) {
    tools[0].object3D.position.set("-12", "0.8", "2");
    tools[1].object3D.position.set("-12", "0.5", "1");
    tools[2].object3D.position.set("-5", "1", "5");
  }
}

function randomizePositionFossilsAndRocks() {
  for (let i = 0; i < fossils.length; i++) {
    posX = getRandomInt(-9, 10);
    posY = getRandomInt(-9, 10);

    fossils[i].object3D.position.set(posX, "0", posY);
    // invisFossils[i].object3D.position.set(posX, "-5", posY);
    earthLayer[i].object3D.position.set(posX, "-0.05", posY);
    stoneLayer[i].object3D.position.set(posX, "-0.05", posY);
  }
}

function loopCollision() {
    let collidableStone = document.getElementsByClassName("collide-stone");
    let collidableEarth = document.getElementsByClassName("collide-earth");

  for (let i = 0; i < collidableStone.length; i++) { // pickaxe
    if (collision(tools[0], collidableStone[i])) {
      const mine = document.getElementById("sound-mine");
      mine.play()
      collidableStone[i].remove();
      break;
    }
  }
  for (let j = 0; j < collidableEarth.length; j++) { // shovel
    if (collision(tools[1], collidableEarth[j])) {
      const dig = document.getElementById("sound-dig");
      dig.play();
      stoneLayer[j].classList.add("collide-stone");
      collidableEarth[j].remove();
      break;
    }
  }
  for (let l = 0; l < fossils.length; l++) { // scanner
    if (collision(tools[2], fossils[l])) {        
      const scan = document.getElementById("sound-scanner");
      scan.play();
      
      const modelPath = fossils[l].getAttribute('gltf-model');
      const fossilMap = {
        'obj/fossil-original-state/fossil1.glb': { name: 'fossil 1', age: 'Jurassic', sediment: 'Sandstone', description: 'Thisthe first fossil.' },
        'obj/fossil-original-state/fossil2.glb': { name: 'fossil 2', age: 'Cretaceous', sediment: 'Limestone', description: 'Thisthe second fossil.' },
        'obj/fossil-original-state/fossil3.glb': { name: 'fossil 3', age: 'Paleogene', sediment: 'Shale', description: 'This is third fossil.' },
        'obj/fossil-original-state/fossil4.glb': { name: 'fossil 4', age: 'Neogene', sediment: 'Mudstone', description: 'This is fourth fossil.' },
      };
            
      const fossilInfo = fossilMap[modelPath];
      textName.setAttribute('value', fossilInfo.name);
      age.setAttribute('value', fossilInfo.age);
      sediment.setAttribute('value', fossilInfo.sediment);
      description.setAttribute('value', fossilInfo.description);
      break;
      }
  setTimeout(loopCollision, 10);
    }
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