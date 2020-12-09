const { count } = require('console');

fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n').map((num)=>Number(num));
}

const hasSum = (num, arr) => {
  let flag = false;
  arr.forEach(n=>{
    if(arr.includes(num-n)) {
      flag = true;
    }
  })

  return flag;
}

getInput().then(input=>{
  const preamble = 25
  input.slice(preamble).forEach((num,idx)=>{
    const index = preamble+idx
    const prev = input.slice(index-preamble, index);
    if(!hasSum(num, prev)) console.log('part 1',num);
  })
})

getInput().then(input=>{
  const num = 15690279;
  //const num = 127;
  input.forEach((n,idx)=>{
    let sum = n;
    if(n>num)return;
    for(let x = idx+1; x<input.length; x++){
      sum+=input[x];
      if(sum > num) break;
      if(sum === num){
        const arr = input.slice(idx,x+1);
        console.log('part 2',Math.min(...arr)+Math.max(...arr))
        break;
      } 
    }
  })
})
15690279
26211635