//my original solution
fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

const getRow = (input) => {
  const rows = Array(128).fill('').map((value, index)=>index);

  let temp = rows
  for(let x = 0; x<7; x++){
    if(input[x] === 'F'){
      temp.splice(temp.length/2,temp.length/2);
    } else if(input[x]==='B') {
      temp.splice(0,temp.length/2);
    }
  }  
  return temp[0];
}

const getCol = (input) => {
  const rows = Array(8).fill('').map((value, index)=>index);

  let temp = rows
  for(let x = 7; x<input.length; x++){
    if(input[x] === 'L'){
      temp.splice(temp.length/2,temp.length/2);
    } else if(input[x]==='R') {
      temp.splice(0,temp.length/2);
    }
  }
  return temp[0];
}

const getId = (input) => {
  return getRow(input)*8+getCol(input);
}

getInput().then(input=>{
  const arr = []
  input.forEach(inp=>{
    arr.push(getId(inp))
  })
  const sorted = arr.sort()
  console.log('part 1:', Math.max(...sorted))
  
  sorted.forEach(seat => {
    if((!sorted.includes(seat+1))&&(sorted.includes(seat+2))) console.log('part 2:',seat+1)
  })
  
})

/* 
better solution found online 

const data = require("fs").readFileSync("test.txt", { encoding: "utf-8" }).trim();
const lines = data.split(/\n/);

let max = 0;
for (let line of lines) {
  const id = parseInt(line.replace(/B|R/g, "1").replace(/F|L/g, "0"), 2);
  console.log(id)
  max = Math.max(max, id);
}

console.log(max); 
*/