const { dir } = require('console');

fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

const getFormatedInput = (input) =>{
  const [earliest, ids] = input
  const cleanedIds = ids.split(',').filter((n)=>n!=='x').map(n=>parseInt(n)).sort((a,b)=>a-b);
  return [earliest, cleanedIds]
}

getInput().then(input=>{
  const [earliest, ids] = getFormatedInput(input)

  const map = []
  ids.forEach(id=>{
    map.push({
      id,
      diff:Math.ceil(earliest/id)*id-earliest
    });
  })
  map.sort((a,b)=>a.diff-b.diff)


  console.log(map[0].id*map[0].diff)
})
