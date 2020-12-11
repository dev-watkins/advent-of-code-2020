fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

const getAdjacent = (currentRow, prevRow, nextRow, index)=>{
  let adjacents = '';
  if(prevRow){
    if(prevRow[index-1]) adjacents+=prevRow[index-1];
    if(prevRow[index]) adjacents+=prevRow[index];
    if(prevRow[index+1]) adjacents+=prevRow[index+1];
  }  
  if(currentRow[index-1]) adjacents+=currentRow[index-1];
  if(currentRow[index+1]) adjacents+=currentRow[index+1];
  if(nextRow){  
    if(nextRow[index-1]) adjacents+=nextRow[index-1];
    if(nextRow[index]) adjacents+=nextRow[index];
    if(nextRow[index+1]) adjacents+=nextRow[index+1];
  }
  
  return adjacents;
}
const getAdjacent2 = (index,row,array)=>{
  let adjacents = '';
  let x1 = index-1
  let x2 = index+1
  let y1 = row-1
  let y2 = row+1
  while(x1>-1){
    if(array[row][x1]==='.'){
      x1-=1
    } else {
      adjacents+=array[row][x1]
      break
    }
  }
  while(x2<array[row].length){
    if(array[row][x2]==='.'){
      x2+=1
    } else {
      adjacents+=array[row][x2]
      break
    }
  }
  while(y1>-1){
    
    if(array[y1][index]==='.'){
      y1-=1
    } else {
      adjacents+=array[y1][index]
      break
    }
  }

  while(y2<array.length){
    
    if(array[y2][index]==='.'){
      y2+=1
    } else {
      adjacents+=array[y2][index]
      break
    }
  }
  x1 = index-1
  x2 = index+1
  y1 = row-1
  y2 = row+1

  while(y1>-1){    
    if(x1>=0){
      if(array[y1][x1]==='.'){
        x1-=1
      }
      else {
        adjacents+=array[y1][x1];
        x1=-1
      }
    }
    if(x2<array[y1].length){
      if(array[y1][x2]==='.'){
        x2+=1
      }
      else {
        adjacents+=array[y1][x2];
        x2=array[y1].length
      }
    }
    y1-=1;
  }

  x1 = index-1
  x2 = index+1

  while(y2<array.length){
   
    if(x1>=0){
      if(array[y2][x1]==='.'){
        x1-=1
      }
      else {
        adjacents+=array[y2][x1];
        x1=-1
      }
    }
    if(x2<array[y2].length){
      if(array[y2][x2]==='.'){
        x2+=1
      }
      else {
        adjacents+=array[y2][x2];
        x2=array[y2].length
      }
    }
    y2+=1
  }
  return adjacents;
}

const adjustSeats = (array)=>{
  let changed = false;

  const newState = array.map((row, rowNum)=>{
    return row.split('').map((seat, seatNum)=>{
      const adjacents = getAdjacent(array[rowNum],array[rowNum-1],array[rowNum+1],seatNum)
      if(seat==='L'){
        if(!adjacents.split('').includes('#')){
            changed=true;
            return '#';
        }
        else{
          return 'L'
        }

      }else if (seat === '#'){
        if(adjacents.replace(/\.|L/g,'').length >=4){
          changed=true;
          return 'L'
        }
        else{
          return '#'
        }
      } else {
        return '.'
      }
    }).join('');
    
  })
  if(changed){
    return adjustSeats(newState);
  }
  else{
    return newState;
  }
  
}

const adjustSeats2 = (array)=>{
  let changed = false;

  const newState = array.map((row, rowNum)=>{
    return row.split('').map((seat, seatNum)=>{
      const adjacents = getAdjacent2(seatNum,rowNum,array)
      
      if(seat==='L'){
        if(!adjacents.split('').includes('#')){
            changed=true;
            return '#';
        }
        else{
          return 'L'
        }

      }else if (seat === '#'){
        if(adjacents.replace(/\.|L/g,'').length >=5){
          changed=true;
          return 'L'
        }
        else{
          return '#'
        }
      } else {
        return '.'
      }
    }).join('');
    
  })
  /* console.log(newState.join('\n'))
  console.log('\n\n') */
  
  if(changed){
    return adjustSeats2(newState);
  }
  else{
    return newState;
  }
  
}

getInput().then(input=>{
  console.log(adjustSeats2(input).join('').replace(/\.|L/g,'').length)
})





