// ... (previous code)

function loopCollision() {
  for (let i = 0; i < tools.length; i++) {
    for (let j = 0; j < fossils.length; j++) {
      if (collision(tools[i], fossils[j])) {

        // Dispatch custom event when collision occurs with target objects
        const collisionEvent = new CustomEvent("collision", {
          detail: { tool: tools[i], fossil: fossils[j] },
        });
        document.dispatchEvent(collisionEvent);

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

  if (distance < 1) { // 1m
    // Dispatch custom event when collision occurs with target objects
    const collisionEvent = new CustomEvent("collision", {
      detail: { tool: obj1, fossil: obj2 },
    });
    document.dispatchEvent(collisionEvent);

    return true;
  }

  return false;
}

// ... (remaining code)
