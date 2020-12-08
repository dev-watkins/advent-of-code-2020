const { count } = require('console');

fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

const getCommands = (input) => {
  return input.map((line) => {
    const [command, argument] = line.split(' ');
    const argAsNum = Number(argument.replace('+',''));

    return {
      command,
      argument: argAsNum,
      visited: false
    }
  });    
}

const run = (commands) => {
  let acc = 0;
  let flag = true;
  let index = 0;
  let finished = false;
  do {
    if(!commands[index]){
      finished = true;
      flag = false;
    }
    else if(commands[index].visited){
      flag = false
    } else if (commands[index].command === 'nop'){
      commands[index].visited = true;
      index+=1;
    } else if(commands[index].command === 'acc'){
      commands[index].visited = true;
      acc+=commands[index].argument;
      index+=1;
    } else if (commands[index].command === 'jmp') {
      commands[index].visited = true
      index += commands[index].argument;
    }
  } while (flag);
  return {acc, finished}
}

getInput().then(input=>{
  const commands = getCommands(input);
  
  console.log('part 1',run(commands))
})

getInput().then(input=>{
  const commands = getCommands(input);
  for(let x = 0; x< commands.length; x++ ){
    const copy = getCommands(input)
    if(copy[x].command === 'jmp'){
      copy[x].command = 'nop'
    } else if(copy[x].command === 'nop'){
      copy[x].command = 'jmp'
    }
    const attempt = run(copy)
    if(attempt.finished) {
      console.log('part 2', attempt);
      break;
    }
  }
})

