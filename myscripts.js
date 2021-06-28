//create multiple agents
function moveAgents(city,movingSize){
  for(let i = 0 ; i<movingSize;i++){
    let randX = Math.floor(Math.random() * city[0].length);
    let randY = Math.floor(Math.random() * city[0].length);
    let randNewX = Math.floor(Math.random() * city[0].length);
    let randNewY = Math.floor(Math.random() * city[0].length);
    let randInhabitant = Math.floor(Math.random() * city[randX][randY].inhabitants.length);
    if(city[randX][randY].inhabitants[randInhabitant]===undefined){
      continue
    }
    else{
      city[randNewX][randNewY].inhabitants.push(city[randX][randY].inhabitants[randInhabitant]);
      city[randX][randY].inhabitants.splice(randInhabitant,1);
    }
    let agentAvgIncome = 0;
    for(let i = 0; i< city[0].length;i++){
      for(let j = 0;j<city[0].length;j++){
        for(let k=0; k<city[i][j].inhabitants.length;k++){
          agentAvgIncome = agentAvgIncome+city[i][j].inhabitants[k].income
          
        }
        city[i][j].averageIncome = agentAvgIncome /city[i][j].inhabitants.length;
        agentAvgIncome = 0;
      }
    }
    
  }
  return city;
}
function generateCity(agentNumber,citySize) {
  let agents = {};
  let city = {};
  
  for (let i = 0; i < citySize; i++) {
    city[i] = [];
    for (let j = 0; j < citySize; j++) {
      city[i][j] = {};
      city[i][j].xc = i;
      city[i][j].yc = j;
      city[i][j].attractiveness = undefined;
      city[i][j].inhabitants = [];
    }
  }
  for (let i = 0; i < agentNumber; i++) {
    agents[i] = createNewAgent( citySize);
    city[agents[i].x][agents[i].y].inhabitants.push(agents[i]);
  }
  let agentAvgIncome = 0;
  for(let i = 0; i< citySize;i++){
    for(let j = 0;j<citySize;j++){
      for(let k=0; k<city[i][j].inhabitants.length;k++){
        agentAvgIncome = agentAvgIncome+city[i][j].inhabitants[k].income
        
      }
      city[i][j].averageIncome = agentAvgIncome /city[i][j].inhabitants.length;
      agentAvgIncome = 0;
    }
  }
 
  
  return city;
}
function createNewAgent(citySize) {
  // create single agent
  const agent = {};
  agent.income = Math.floor(Math.random() * 10000);
  agent.x = Math.floor(Math.random() * citySize);
  agent.y = Math.floor(Math.random() * citySize);
  agent.getCoordinate = function () {
    console.log(agent.x + "," + agent.y);
  };
  return agent;
}

let test = generateCity(100, 5);
console.log(test);

// let test2 = ;
// console.log(test2);


$(document).ready(function () {
  setInterval(function () {
    color="navy";
    let i = 0;
    let size = test[0].length;
    for (x = 0; x < size; x++) {
      for (y = 0; y < size; y++) {
        let max = Math.max(x, y);
        // let attractiveness = Math.random();
        let intAttractiveness = Math.exp(-(Math.pow(max,2)/Math.pow(size,2)));
        let attractiveness = intAttractiveness*((test[x][y].averageIncome)/10000);
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
    test = moveAgents(test,100);
    console.log(test);
    i++;
  }, 1000);
});

// maroon, red, orange,yellow, lightgreen, cyan, blue, navy
//next step: data structure (2d array) to keep the attractiveness in that data structure.
//list of agent{coordiate,income,...}
