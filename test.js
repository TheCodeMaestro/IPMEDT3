function loopCollision() {
  for (let i = 0; i < tools.length; i++) {
    for (let j = 0; j < earthLayer.length; j++) {
      if (collision(tools[i], earthLayer[j]) || collision(tools[i], stoneLayer[j])) {
        const toolId = tools[i].getAttribute("id");

        if (toolId === "shovelTool" && earthLayer[j].classList.contains("earth")) {
          const dig = document.getElementById("sound-dig");
          dig.play();
          earthLayer[j].remove();
          break;
        }

        if (toolId === "pickaxeTool" && stoneLayer[j].classList.contains("stone")) {
          const mine = document.getElementById("sound-mine");
          mine.play();
          stoneLayer[j].remove();
          break;
        }
      }
    }
  }
  setTimeout(loopCollision, 10);
}
