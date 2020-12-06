fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

const removeDuplicate = (string) => {
  return string
    .split('')
    .filter((item, pos, self) => {
      return self.indexOf(item) == pos;
    })
    .join('');
}

const getGroups = (inputs) =>{
  const groups = [];
  let temp = [];
  inputs.forEach(row => {
    if(row==='') {
      groups.push(temp.join(''));
      temp= [];
    } else {
      temp.push(row);
    }
    
  });
  groups.push(temp.join(''));
  return groups;
}

const getGroupsAsArr = (inputs) =>{
  const groups = [];
  let temp = [];
  inputs.forEach(row => {
    if(row==='') {
      groups.push(temp);
      temp= [];
    } else {
      temp.push(row);
    }
    
  });
  groups.push(temp);
  return groups;
}

const getCount = (group) => {  
  return removeDuplicate(group).length
}

const getCountPart2 = (group) => {  
  const groupCount = group.length; 
  let count = 0;
  const groupStr = group.join('');
  for(let x = 0; x<group[0].length; x++){
    const char = group[0][x];    
    const numOfOcc = (groupStr.match(new RegExp(char,'g')) || []).length;
    if(numOfOcc === groupCount) count+=1;
  }
  return count
}

getInput().then(input=>{

  // part one
  const groups = getGroups(input);
  let count = 0;
  groups.forEach(group=>count+=getCount(group));

  //part two
  const groups2 = getGroupsAsArr(input);
  let count2 = 0;
  groups2.forEach(group=>count2+=getCountPart2(group)); 
  
  console.log('part 1', count);
  console.log('part 2', count2);
})


/* 
cool solution from redit (u/ AlexAegis)

const part1 = (input: string): number =>
  input
    .split(/\r?\n\r?\n/)
    .map((group) => new Set(group.replace(/\r?\n/g, '')).size)
    .reduce(sum);

const part2 = (input: string): number =>
  input
    .split(/\r?\n\r?\n/)
    .map((rawGroup) => rawGroup.split(/\r?\n/g))
    .map((group) => {
      const letterCounts = [...group.join('')]
        .reduce(
          (map, letter) => map.set(letter, (map.get(letter) ?? 0) + 1),
          new Map<string, number>()
        )
        .values();
      return [...letterCounts].filter((v) => v === group.length).length;
    })
    .reduce(sum);


*/
