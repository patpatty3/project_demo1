//create multiple agents
function moveAgents(city,movingSize){
  outsiderSize = city.outsiders.length;
  let swap = false;
  let count = 0 ;
  for (let i = 0 ; i< outsiderSize ;i++){
    for (let j = 0 ; j< city[0].length;j++){
      for (let k = 0; k< city[0].length;k++){
        for (let u = 0; u<city[j][k].inhabitants.length;u++){
          if (city[j][k].inhabitants[u].bid <= city.outsiders[i].income){
            //swap
            city[j][k].inhabitants.push(city.outsiders[i]);
            city[j][k].inhabitants[u].bid = 0;
            city.outsiders.push(city[j][k].inhabitants[u]);
            city[j][k].inhabitants.splice(u,1);
            swap = true;
            count++;
            break;
          }
          else{
            if(k===city[0].length && j===city[0].length && u===city[j][k].inhabitants.length){
              city.outsiders.push(city.outsiders[i]);
            }
          }
        }
        if (swap === true){
          break
        }
      }
      if (swap === true){
        swap = false;
        break
      }
    }
  }
  for(let i =0 ;i<count;i++){
    city.outsiders.splice(i,1);
  }

  //update avg income
  let agentAvgIncome = 0;
  for(let i = 0; i< city[0].length;i++){
    for(let j = 0;j<city[0].length;j++){
      for(let k=0; k<city[i][j].inhabitants.length;k++){
        agentAvgIncome = agentAvgIncome+city[i][j].inhabitants[k].income;
      }
      city[i][j].averageIncome = agentAvgIncome /city[i][j].inhabitants.length;
      agentAvgIncome = 0;
    }    
  }
  //update attractiveness
  let size = city[0].length
  for (x = 0; x < size; x++) {
    for (y = 0; y < size; y++) {
      let max = Math.max(x, y);
      let distanceAttractiveness = Math.exp(-(Math.pow(max,2)/Math.pow(size,2)));
      let incomeAttractiveness = test[x][y].averageIncome/test.cityAverageIncome;
      if(incomeAttractiveness>1){
        incomeAttractiveness=1;
      }
      let attractive = distanceAttractiveness*incomeAttractiveness;
      city[x][y].attractiveness = attractive;
    }
  }
  //update bid
  for(let i=0;i<city[0].length;i++){
    for(let j = 0 ; j<city[0].length;j++){
      for(let k=0; k<city[i][j].inhabitants.length;k++){
        if(city[i][j].inhabitants[k].bid===0){
          city[i][j].inhabitants[k].bid=city[i][j].attractiveness*city[i][j].averageIncome*2;
        }
        else{
          city[i][j].inhabitants[k].bid *= 0.9;
        }
      }
    }
  }  
  return city;
}
function generateCity(agentNumber,citySize,outsiders) {
  let agents = {};
  let city = {};
  city.outsiders = [];
  for (let i = 0 ; i<outsiders;i++){
    city.outsiders.push(createNewAgent(citySize));
  }
  for (let i = 0; i < citySize; i++) {
    city[i] = [];
    for (let j = 0; j < citySize; j++) {
      city[i][j] = {};
      city[i][j].x = i;
      city[i][j].y = j;
      city[i][j].attractiveness = undefined;
      city[i][j].inhabitants = [];
    }
  }
  for (let i = 0; i < agentNumber; i++) {
    agents[i] = createNewAgent( citySize);
    city[agents[i].startX][agents[i].startY].inhabitants.push(agents[i]);
  }
  let agentAvgIncome = 0;
  let cityAvgIncome = 0;

  //set avgincome
  for(let i = 0; i< citySize;i++){
    for(let j = 0;j<citySize;j++){
      for(let k=0; k<city[i][j].inhabitants.length;k++){
        agentAvgIncome = agentAvgIncome+city[i][j].inhabitants[k].income;
      }
      // if to fix the divided by 0 bug
      if(city[i][j].inhabitants.length==0){
        cityAvgIncome+=agentAvgIncome/1;
      }
      else{
        cityAvgIncome+=agentAvgIncome/city[i][j].inhabitants.length;
      }
      
      city[i][j].averageIncome = agentAvgIncome /city[i][j].inhabitants.length;
      agentAvgIncome = 0;
      
    }
  }
  city.cityAverageIncome = cityAvgIncome/(citySize*citySize);
  for (x = 0; x < citySize; x++) 
  {
      for (y = 0; y < citySize; y++) 
      {
        let max = Math.max(x, y);
        let distanceAttractiveness = Math.exp(-(Math.pow(max,2)/Math.pow(citySize,2)));
        let incomeAttractiveness = city[x][y].averageIncome/city.cityAverageIncome;
        if(incomeAttractiveness>1){
          incomeAttractiveness=1;
        }
        let attractive = distanceAttractiveness*incomeAttractiveness;
        city[x][y].attractiveness = attractive;
      }
  }
  //set bid
  for(let i = 0; i< citySize;i++){
    for(let j = 0;j<citySize;j++){
      for(let k=0; k<city[i][j].inhabitants.length;k++){
        city[i][j].inhabitants[k].bid = city[i][j].attractiveness*city[i][j].averageIncome*2;
      }
    }
  }
 
  
  return city;
}
function createNewAgent(citySize) {
  // create single agent
  const agent = {};
  agent.income = Math.floor(Math.random() * 10000);
  agent.startX = Math.floor(Math.random() * citySize);
  agent.startY = Math.floor(Math.random() * citySize);
  agent.bid = 0;
  return agent;
}

let test = generateCity(100, 5,10);


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
        let distanceAttractiveness = Math.exp(-(Math.pow(max,2)/Math.pow(size,2)));
        let incomeAttractiveness = test[x][y].averageIncome/test.cityAverageIncome;
        if(incomeAttractiveness>1){
          incomeAttractiveness=1;
        }
        let attractiveness = distanceAttractiveness*incomeAttractiveness;
        // console.log("distanceAtt="+distanceAttractiveness)
        // console.log("incomeAttractiveness="+incomeAttractiveness)
        // console.log("attractiveness="+attractiveness);

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
    test = moveAgents(test,15);
    console.log(JSON.stringify(test));
    
    i++;
  }, 1000);
});

// maroon, red, orange,yellow, lightgreen, cyan, blue, navy
