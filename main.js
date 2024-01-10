window.onload = () => {
  cameraRig.setAttribute('position', { x: 0, y: -0.2, z: 0 }); 

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
};
  // document.addEventListener('thumbstickmoved', function (event) {
  //   console.log('Thumbstick moved:', event.detail);
  //   alert("het wertk");
  // });

  // document.getElementById("rightHand").addEventListener("thumbstickmoved", function (event) {
  //   // Access the thumbstick values
    
  //   result.setAttribute('value', getal);
  //   getal = getal + 1;

    // const thumbstickX = event.detail.x;
    // const thumbstickY = event.detail.y;

    // Adjust your movement logic based on thumbstick values
    // For example, move the camera forward based on thumbstickY
    // const camera = document.querySelector("a-camera");
    // const currentPosition = camera.getAttribute("position");
    // camera.setAttribute("position", {
    //   x: currentPosition.x,
    //   y: currentPosition.y,
    //   z: currentPosition.z - thumbstickY * 0.1, // Adjust the multiplier based on your preference
    // });
//     console.log('1')
//     AFRAME.registerComponent('collision-listener', {
//     init: function () {
//         this.el.addEventListener('collide', this.onCollide.bind(this));
//         console.log('2')
//       },
//       onCollide: function (event) {
//         console.log('3')
//         // Check if the collision is with the collisionPlane
//         if (event.detail.body.el.id === 'collisionPlane') {
//             console.log('4')
//           // Change the body type of the dynamicEntity to static-body
//           document.getElementById('dynamicEntity').setAttribute('static-body', '');
//         }
//       }