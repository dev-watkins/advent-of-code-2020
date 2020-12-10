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

getInput().then(input=>{
  const num = 15690279;
  //const num = 127;

  // loop trough the array
  // set tail to the second index
  // set head to the first index
  // set init sum to the value of the first index
  for(let tail=1, head=0, sum=input[0]; tail<=input.length; tail++ ){
    
    /* if the sum is > the target and the head is more than 1 away from tail
       subtract the input of the current head from sum and move the head up
       this shrinks the window. keep doing this until the sum is less than num.
    */ 
    while(sum>num&&head<tail-1) {
      sum-=input[head];
      head++;
    }
    /* if sum is num then you are done */
    if(sum===num){
      const ans = input.slice(head,tail);
      console.log('part 2 sliding widow', Math.max(...ans)+Math.min(...ans));
      break;

      /* else as long as the tail isn't out of bounds expand the tail and add the new tail to the sum */
    }else if(tail<input.length){
      sum+=input[tail];
    }
  }
})

