let camera;
let numberOfEarthQuakes = 5;

window.onload = () => {
  camera = document.getElementById('js--camera');
  let sky = document.getElementById("background");

  setTimeout(() => {
    earthQuake();
  }, 1200)

  setTimeout(() => {
    sky.setAttribute("src", "#volcano-errupt");
  }, 1000)
};

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
