fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

const getTreeCount = (map, right, down=1) => {
  let index = right;
  let treeCount = 0;
  for(let x = down; x<map.length; x +=down){    
    const row = map[x];
    const col = index % row.length;
    if(row[col]==='#') treeCount++
    index += right;
  }
  return treeCount;
}

getInput().then(input=>{
  console.log( [
    getTreeCount(input, 1),
    getTreeCount(input, 3),
    getTreeCount(input, 5),
    getTreeCount(input, 7),
    getTreeCount(input, 1, 2),
  ].reduce((acc, current)=>acc*current,1))
  
})