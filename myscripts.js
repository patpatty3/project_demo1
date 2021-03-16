$(document).ready(function () {
  let i = 0;
  let attractiveness = 0;
  let color = "blue";
  setInterval(function () {
    for (x = 0; x < 5; x++) {
      for (y = 0; y < 5; y++) {
        attractiveness = Math.random();
        if (attractiveness > 0.875) {
          color = "maroon";
        } else if (attractiveness > 0.75) {
          color = "red";
        } else if (attractiveness > 0.625) {
          color = "orange";
        } else if (attractiveness > 0.5) {
          color = "yellow";
        } else if (attractiveness > 0.375) {
          color = "lightGreen";
        } else if (attractiveness > 0.25) {
          color = "cyan";
        } else if (attractiveness > 0.125) {
          color = "blue";
        } else if (attractiveness > 0) {
          color = "navy";
        }
        $("." + x + "-" + y).css({
          backgroundColor: color,
        });
      }
    }
    i++;
  }, 1000);
});

// maroon, red, orange,yellow, lightgreen, cyan, blue, navy
