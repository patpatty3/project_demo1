//create multiple agents
function generateCity(agentNumber, income, citySize) {
  const agents = {};
  const city = {};
  for (let i = 0; i < citySize; i++) {
    city[i] = [];
    for (let j = 0; j < citySize; j++) {
      city[i][j] = {};
      city[i][j].xc = i;
      city[i][j].yc = j;
      city[i][j].averageIncome = undefined;
      city[i][j].attractiveness = undefined;
      city[i][j].inhabitants = [];
    }
  }
  for (let i = 0; i < agentNumber; i++) {
    agents[i] = createNewAgent(income, citySize);
    city[agents[i].x][agents[i].y].inhabitants.push(agents[i]);
  }
  return city;
}
function createNewAgent(income, citySize) {
  // create single agent
  const agent = {};
  agent.income = income;
  agent.x = Math.floor(Math.random() * citySize);
  agent.y = Math.floor(Math.random() * citySize);
  agent.getCoordinate = function () {
    console.log(agent.x + "," + agent.y);
  };
  return agent;
}

let a = generateCity(100, 5000, 5);
console.log(a);

$(document).ready(function () {
  setInterval(function () {
    let i = 0;
    let size = 0;
    form.addEventListener("submit", (e)=>{
      let n =(document.querySelector('input[name="size"]').value);
      let test = generateCity(100, 5000, n);
      size = test[0].length;
    });
    for (x = 0; x < size; x++) {
      for (y = 0; y < size; y++) {
        let max = Math.max(x, y);
        let attractiveness = Math.random();
        //let attractiveness = Math.exp(-(Math.pow(max,2)/city.size))*(house.avgHouseIncome/city.avgCityIncome);
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
//next step: data structure (2d array) to keep the attractiveness in that data structure.
//list of agent{coordiate,income,...}
