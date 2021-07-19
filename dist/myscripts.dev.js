"use strict";

//create multiple agents
function moveAgents(city, movingSize) {
  outsiderSize = city.outsiders.length;

  for (var i = 0; i < outsiderSize; i++) {
    for (var j = 0; j < city[0].length; j++) {
      for (var k = 0; k < city[0].length; k++) {
        for (var u = 0; u < city[i][j].inhabitants.length; u++) {
          agentAvgIncome = agentAvgIncome + city[j][k].inhabitants[u].income;
        }
      }
    }
  }

  for (var _i = 0; _i < movingSize; _i++) {
    var randX = Math.floor(Math.random() * city[0].length);
    var randY = Math.floor(Math.random() * city[0].length);
    var randNewX = Math.floor(Math.random() * city[0].length);
    var randNewY = Math.floor(Math.random() * city[0].length);
    var randInhabitant = Math.floor(Math.random() * city[randX][randY].inhabitants.length);

    if (city[randX][randY].inhabitants[randInhabitant] === undefined) {
      continue;
    } //moving agents


    city[randNewX][randNewY].inhabitants.push(city[randX][randY].inhabitants[randInhabitant]);
    city[randX][randY].inhabitants.splice(randInhabitant, 1); //update avg income

    var _agentAvgIncome = 0;

    for (var _i2 = 0; _i2 < city[0].length; _i2++) {
      for (var _j = 0; _j < city[0].length; _j++) {
        for (var _k = 0; _k < city[_i2][_j].inhabitants.length; _k++) {
          _agentAvgIncome = _agentAvgIncome + city[_i2][_j].inhabitants[_k].income;
        }

        city[_i2][_j].averageIncome = _agentAvgIncome / city[_i2][_j].inhabitants.length;
        _agentAvgIncome = 0;
      }
    } //update attractiveness


    var size = city[0].length;

    for (x = 0; x < size; x++) {
      for (y = 0; y < size; y++) {
        var max = Math.max(x, y);
        var distanceAttractiveness = Math.exp(-(Math.pow(max, 2) / Math.pow(size, 2)));
        var incomeAttractiveness = test[x][y].averageIncome / test.cityAverageIncome;

        if (incomeAttractiveness > 1) {
          incomeAttractiveness = 1;
        }

        var attractive = distanceAttractiveness * incomeAttractiveness;
        city[x][y].attractiveness = attractive;
      }
    }
  }

  return city;
}

function generateCity(agentNumber, citySize, outsiders) {
  var agents = {};
  var city = {};
  city.outsiders = [];

  for (var i = 0; i < outsiders; i++) {
    city.outsiders.push(createNewAgent(citySize));
  }

  for (var _i3 = 0; _i3 < citySize; _i3++) {
    city[_i3] = [];

    for (var j = 0; j < citySize; j++) {
      city[_i3][j] = {};
      city[_i3][j].x = _i3;
      city[_i3][j].y = j;
      city[_i3][j].attractiveness = undefined;
      city[_i3][j].inhabitants = [];
    }
  }

  for (var _i4 = 0; _i4 < agentNumber; _i4++) {
    agents[_i4] = createNewAgent(citySize);

    city[agents[_i4].startX][agents[_i4].startY].inhabitants.push(agents[_i4]);
  }

  var agentAvgIncome = 0;
  var cityAvgIncome = 0; //set avgincome

  for (var _i5 = 0; _i5 < citySize; _i5++) {
    for (var _j2 = 0; _j2 < citySize; _j2++) {
      for (var k = 0; k < city[_i5][_j2].inhabitants.length; k++) {
        agentAvgIncome = agentAvgIncome + city[_i5][_j2].inhabitants[k].income;
      } // if to fix the divided by 0 bug


      if (city[_i5][_j2].inhabitants.length == 0) {
        cityAvgIncome += agentAvgIncome / 1;
      } else {
        cityAvgIncome += agentAvgIncome / city[_i5][_j2].inhabitants.length;
      }

      city[_i5][_j2].averageIncome = agentAvgIncome / city[_i5][_j2].inhabitants.length;
      agentAvgIncome = 0;
    }
  }

  city.cityAverageIncome = cityAvgIncome / (citySize * citySize);

  for (x = 0; x < citySize; x++) {
    for (y = 0; y < citySize; y++) {
      var max = Math.max(x, y);
      var distanceAttractiveness = Math.exp(-(Math.pow(max, 2) / Math.pow(citySize, 2)));
      var incomeAttractiveness = city[x][y].averageIncome / city.cityAverageIncome;

      if (incomeAttractiveness > 1) {
        incomeAttractiveness = 1;
      }

      var attractive = distanceAttractiveness * incomeAttractiveness;
      city[x][y].attractiveness = attractive;
    }
  } //set bid


  for (var _i6 = 0; _i6 < citySize; _i6++) {
    for (var _j3 = 0; _j3 < citySize; _j3++) {
      for (var _k2 = 0; _k2 < city[_i6][_j3].inhabitants.length; _k2++) {
        city[_i6][_j3].inhabitants[_k2].bid = city[_i6][_j3].attractiveness * city[_i6][_j3].averageIncome * 2;
      }
    }
  }

  return city;
}

function createNewAgent(citySize) {
  // create single agent
  var agent = {};
  agent.income = Math.floor(Math.random() * 10000);
  agent.startX = Math.floor(Math.random() * citySize);
  agent.startY = Math.floor(Math.random() * citySize);
  agent.bid = 0;
  return agent;
}

var test = generateCity(100, 5, 10); // let test2 = ;
// console.log(test2);

$(document).ready(function () {
  setInterval(function () {
    color = "navy";
    var i = 0;
    var size = test[0].length;

    for (x = 0; x < size; x++) {
      for (y = 0; y < size; y++) {
        var max = Math.max(x, y); // let attractiveness = Math.random();

        var distanceAttractiveness = Math.exp(-(Math.pow(max, 2) / Math.pow(size, 2)));
        var incomeAttractiveness = test[x][y].averageIncome / test.cityAverageIncome;

        if (incomeAttractiveness > 1) {
          incomeAttractiveness = 1;
        }

        var attractiveness = distanceAttractiveness * incomeAttractiveness; // console.log("distanceAtt="+distanceAttractiveness)
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
          backgroundColor: color
        });
      }
    } // test = moveAgents(test,15);
    // console.log(JSON.stringify(test));


    i++;
  }, 1000);
}); // maroon, red, orange,yellow, lightgreen, cyan, blue, navy