// window.onload = () =>{
//     const places = document.getElementsByClassName('js--place');
//     const camera = document.getElementById('js--camera');

//     let pickups = document.getElementsByClassName('js--pickup');
//     let hold = null;
// }


// window.onload = () =>{
//     console.log("javascript file werkt");
//     document.querySelector('a-box').addEventListener('click', function (evt) {
//         console.log("Het werkt");
//         var removeable = document.querySelector('a-box');
//         removeable.parentNode.removeChild(removeable);
//       });
// // }

// function remove(){
    
// }

// x 	Negative X axis extends left. Positive X Axis extends right.
// y 	Negative Y axis extends down. Positive Y Axis extends up.
// z 	Negative Z axis extends in. Positive Z Axis extends out.

window.onload = () => {
  createBoxes();
}

function createBoxes() {
  const scene = document.querySelector("a-scene");

  for (let z = -5; z <= 5; z++) {
    for (let y = 0; y >= -2; y--) {
      for (let x = -5; x <= 5; x++) {
        const cube = document.createElement("a-box");
        cube.classList.add("js--cube", "js--clickable");
        cube.setAttribute("position", `${x} ${y} ${z}`);
        cube.setAttribute("rotation", "0 0 0");
        scene.appendChild(cube);
      }
    }
  }
}




// Audio afspelen test
document.addEventListener("keydown", function (event) {
  if (event.key === "z" || event.key === "Z") {
    const mine = document.getElementById("mine");
    mine.play();
  }
  if (event.key === "x" || event.key === "X") {
    const brush = document.getElementById("brush");
    brush.play();
  }
  if (event.key === "c" || event.key === "C") {
    const dig = document.getElementById("dig");
    dig.play();
  }
});


// scanner code

let fossilOnScreen = {}

AFRAME.registerComponent('fossil-type', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      const modelPath = this.getAttribute('gltf-model');
      const fossilMap = {
        'obj/fossil1/fossil1.glb': { name: 'fossil 1', age: 'Jurassic', sediment: 'Sandstone', description: 'This is the first fossil.' },
        'obj/fossil2/fossil2.glb': { name: 'fossil 2', age: 'Cretaceous', sediment: 'Limestone', description: 'This is the second fossil.' },
        'obj/fossil3/fossil3.glb': { name: 'fossil 3', age: 'Paleogene', sediment: 'Shale', description: 'This is the third fossil.' },
        'obj/fossil4/fossil4.glb': { name: 'fossil 4', age: 'Neogene', sediment: 'Mudstone', description: 'This is the fourth fossil.' },
      };
    
      const fossilInfo = fossilMap[modelPath];
    
      if (fossilInfo) {
        fossilOnScreen = fossilInfo;
        console.log(`Name: ${fossilInfo.name}`);
        console.log(`Age: ${fossilInfo.age}`);
        console.log(`Sediment: ${fossilInfo.sediment}`);
        console.log(`Description: ${fossilInfo.description}`);
      } else {
        console.log('Unknown fossil');
      }
    });
  }
});