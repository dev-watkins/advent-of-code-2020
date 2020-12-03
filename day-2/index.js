fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n').map(row => {
    const rowSplit = row.split(' ');
    const [min, max] = rowSplit[0].split('-');
    const char = rowSplit[1].replace(':', '');
    const pass = rowSplit[2];
    
    return{
      min,
      max,
      char,
      pass  
    }
  });
}

const isValidPart1 = ({min, max, char, pass}) => {
  const regx = new RegExp(char,'g')
  const length = (pass.match(regx)||[]).length;

  return (length>=min && length <=max);
}

const isValidPart2 = ({min, max, char, pass}) => {
  
  return (pass[min-1]===char)^(pass[max-1]===char);
}

getInput().then(input=>{
  let count=0;
  input.forEach(row => {
    if(isValidPart2(row)) count += 1;
  });
  console.log(count)
})