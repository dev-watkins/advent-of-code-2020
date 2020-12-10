fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n').map((num)=>Number(num));
}

const getCombos = (array, memo={})=>{
  const key = array.join`,`;
  if(key in memo) {
      return memo[key];
  }

  let result = 1;
  for(let i=1; i<array.length-1; i++) {
      if(array[i+1]-array[i-1] <= 3) {
          const arr2 = [array[i-1]].concat(array.slice(i+1))
          result += getCombos(arr2, memo);
      }
  }
  memo[key] = result;
  return result;
}

getInput().then(input=>{
  const sorted = input.sort((a,b)=>a-b); 
  const difs = {}
  let prevValue = 0;
  for(let i = 0; i<sorted.length; i++){
    if(!difs[sorted[i]-prevValue]) difs[sorted[i]-prevValue] = 0;
    difs[sorted[i]-prevValue] +=1;
    prevValue = sorted[i];
  }
  difs['3']+=1;
  console.log('part 1',difs['1']*difs['3'])
})

getInput().then(input=>{
  input.sort((a,b)=>a-b);
  input.push(input[input.length-1]+3)
  console.log('part 2',getCombos([0].concat(input)));
})



