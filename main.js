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
