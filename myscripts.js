function sortByAttractiveness(obj1, obj2) {
    return obj2.attractiveness- obj1.attractiveness;
}
function sortByBid(obj1, obj2) {
    return obj2.bid- obj1.bid;
}
//create multiple agents
function moveAgents(city){
  outsiderSize = city.outsiders.length;
  let swap = false;
  let count = 0 ;

  //swapping 1. push every city into one single array
  let arrayCity = [];
  for(let i = 0 ; i<city[0].length;i++){
    for(let j = 0; j<city[0].length;j++){
      arrayCity.push(city[i][j]);
    }
  }
  //2. sort the array by the attractiveness
  arrayCity = arrayCity.sort(sortByAttractiveness);
  // arrayCity.forEach(element => console.log(element.attractiveness));
  //3. swapping by choosing the city with the most attractiveness first
  for( let i = 0 ; i<outsiderSize;i++){
    for(let j = 0 ; j<arrayCity.length;j++){
      for(let k = 0 ; k<arrayCity[j].inhabitants.length;k++){
        //swap
        if(arrayCity[j].inhabitants[k].bid<= city.outsiders[i].income){
          city[arrayCity[j].x][arrayCity[j].y].inhabitants.push(city.outsiders[i]);
          city[arrayCity[j].x][arrayCity[j].y].inhabitants[k].bid = 0;
          city.outsiders.push(city[arrayCity[j].x][arrayCity[j].y].inhabitants[k]);
          city[arrayCity[j].x][arrayCity[j].y].inhabitants.splice(k,1);
          swap = true;
          count++;
          break;
        }
        else{
          if(j===(arrayCity.length)-1 && k===(arrayCity[j].inhabitants.length)-1){
            city.outsiders.push(city.outsiders[i]);
            count++;
          }
        }
      }
      if (swap === true){
        swap = false;
        break;
      }
    }
  }
  for(let i =0 ;i<count;i++){
    city.outsiders.splice(0,1);
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
  for(let i=0;i<size;i++){
    for(let j = 0 ; j<size;j++){
      for(let k=0; k<city[i][j].inhabitants.length;k++){
        if(city[i][j].inhabitants[k].bid===0){ // just recently move to the city (decide the first price)
          city[i][j].inhabitants[k].bid=city[i][j].attractiveness*city[i][j].averageIncome*2;
        }
        else{
          city[i][j].inhabitants[k].bid *= 0.9;
        }
      }
    }
  }
  //update gini coff
  let gini = 0;
  let xBar = 0;
  let n = 0;
  let arrIncome = [];
  for(let i = 0 ; i< size ; i++){
    for(let j = 0 ; j< size; j++){
      for(let k = 0 ; k<city[i][j].inhabitants.length;k++){
        arrIncome.push(city[i][j].inhabitants[k].income);
      }
    }
  }
  for(let i = 0; i< arrIncome.length;i++){
    for(let j = 0;j<arrIncome.length;j++){
      gini = gini + Math.abs(arrIncome[i]-arrIncome[j]) 
    }
    xBar = xBar + arrIncome[i];
    n++;
  }
  xBar /= n;
  gini = gini/(2*(Math.pow(n,2))*xBar);
  city.giniCoefficient = gini;
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
  //set Gini Coefficient
  let gini = 0;
  let xBar = 0;
  let n = 0;
  let arrIncome = [];
  for(let i = 0 ; i< citySize ; i++){
    for(let j = 0 ; j< citySize; j++){
      for(let k = 0 ; k<city[i][j].inhabitants.length;k++){
        arrIncome.push(city[i][j].inhabitants[k].income);
      }
    }
  }
  for(let i = 0; i< arrIncome.length;i++){
    for(let j = 0;j<arrIncome.length;j++){
      gini = gini + Math.abs(arrIncome[i]-arrIncome[j]) 
    }
    xBar = xBar + arrIncome[i];
    n++;
  }
  xBar /= n;
  gini = gini/(2*(Math.pow(n,2))*xBar);
  console.log(xBar)
  city.giniCoefficient = gini;
  return city;
}
function randn_bm(min, max, skew) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
  
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) 
    num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
  
  else{
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
}

function createNewAgent(citySize) {
  // create single agent
  const agent = {};
  agent.income = Math.floor(randn_bm(1, 15000, 1.25));
  agent.startX = Math.floor(Math.random() * citySize);
  agent.startY = Math.floor(Math.random() * citySize);
  agent.bid = 0;
  return agent;
}


// for(let i = 0; i<test[0].length;i++){
//   for(let j = 0 ; j<test[0].length;j++){
//     for(let k = 0 ; k<test[i][j].inhabitants.length;k++){
//       console.log(test[i][j].inhabitants[k].income);
//     }
//   }
// }


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
    test = moveAgents(test);
    //console.log(JSON.stringify(test));
    
    i++;
  }, 1000);
});

// maroon, red, orange,yellow, lightgreen, cyan, blue, navy
