fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

getInput().then(input=>{
  const sum = 2020
  let ans={};
  for(let x = 0; x<input.length; x++){
    const tempSum = sum-input[x];
    input.forEach(num => {
      const i = input.indexOf(tempSum-num+'');
      if (i !== -1){
        ans.partTwo = input[i] * num * input[x];
      } 
    }); 
  }
  input.forEach(num => {
    const i = input.indexOf(sum-num+'');
    if (i !== -1){
      ans.partOne = input[i] * num;
    } 
  });
  console.log(ans)
})