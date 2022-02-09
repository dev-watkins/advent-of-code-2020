const { dir } = require('console');

fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

getInput().then(input=>{
  let facing = 90, NS = 0, EW = 0;
  input.forEach(line => {
    const [,direction,unitStr] = line.match(/([A-Z])([0-9]+)/);
    const unit = parseInt(unitStr);
    if(direction === 'F'){
      if(facing%360 === 90){ // east
        EW+=unit;
      } else if(facing%360 === 180){ // south
        NS-=unit;
      } else if(facing%360 === 270){ // west
        EW-=unit;
      } else if(facing%360 === 0) { // north
        NS+=unit;
      }
    } else if(direction === 'N'){
      NS+=unit;
    } else if(direction === 'S'){
      NS-=unit;
    } else if(direction === 'E'){
      EW+=unit;
    } else if(direction === 'W'){
      EW-=unit;
    } else if(direction === 'R'){
      facing+=unit
    } else if(direction === 'L'){
      facing-=unit
      if(facing<0) facing+=360;
    }
  });
  console.log('part 1',Math.abs(EW)+Math.abs(NS))
})

// part 2
getInput().then(input=>{
  let WNS = 1, WEW=10, NS = 0, EW = 0;
  input.forEach(line => {
    const [,direction,unitStr] = line.match(/([A-Z])([0-9]+)/);
    let unit = parseInt(unitStr);
    if(direction === 'F'){
      NS+= unit * WNS;
      EW+= unit * WEW;
    } else if(direction === 'N'){
      WNS+=unit;
    } else if(direction === 'S'){
      WNS-=unit;
    } else if(direction === 'E'){
      WEW+=unit;
    } else if(direction === 'W'){
      WEW-=unit;
    } else if(direction === 'R'){
      while(unit){
        let oldWEW=WEW
        WEW=WNS;
        WNS=-oldWEW;
        unit-=90
      }
    } else if(direction === 'L'){
      while(unit){
        let oldWEW=WEW
        WEW=-WNS;
        WNS=oldWEW;
        unit-=90
      }
    }
  });
  console.log('part 2',Math.abs(EW)+Math.abs(NS), WEW, WNS)
})





