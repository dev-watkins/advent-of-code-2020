const { count } = require('console');

fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

const getRules = (input) => {
  const regx = /^(.+) bags contain (.*).$/;
  const rules = input.map(ruleStr => {    
    const [full, color, containingStr] = ruleStr.match(regx);
    const containingColors = containingStr.split(',').map(str => {
      const colorRegx =/^([1-9]+) (.+) bags?$/;
      const [fullstr, colQty ,ruleColor] = str.trim().match(colorRegx) || [];
      return fullstr ? {
        color: ruleColor,
        qty: colQty
      } : null; 
    });
    return {
      color: color.trim(),
      rules: containingColors[0] ? containingColors : [],
    }    
  });
  return rules;
}

const canContain = (rules, ruleColor, searchColor) => {
  const rule = rules.filter((r)=>r.color === ruleColor)[0];
  for(let x = 0; x < rule.rules.length; x++){
    if(rule.rules[x].color===searchColor) return true;
    if(canContain(rules, rule.rules[x].color, searchColor))return true;
  }
  return false;
}

const countBag = (rules, color) => {
  const rule = rules.filter((r)=>r.color === color)[0];
  let count = 0;
  if(rule.rules.length){
    rule.rules.forEach(r=>{
      count += Number(r.qty)+Number(r.qty)*countBag(rules, r.color)
    });
  }
  return count;
}

getInput().then(input=>{
  const searchColor = 'shiny gold';
  const rules = getRules(input);
  let count = 0;
  rules.forEach(rule => {
    if(canContain(rules,rule.color,searchColor)) {count+=1;};
  });
  console.log(count);
  console.log(countBag(rules, searchColor))
 
})

