fs = require('fs');

const getInput = async () => {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.replace(/\r/g,'').split('\n');
}

const getPassports = (input) => {
  const passports = [];

  let tempPass = {};

  input.forEach((row)=>{
    if(row===''){
      passports.push(tempPass);
      tempPass = {};
    }
    else{
      const fields = row.split(' ');
      fields.forEach(field => {
        const [key, value] = field.split(':');
        tempPass[key] = value;
      })
    }
  });

  passports.push(tempPass);

  return passports
}

const validateYear = (value, min, max) => {
  const regx = /^[0-9]{4}$/g;
  
  if(!regx.test(value)) return false;
  
  if((!(value>=min))^(!(value<=max))) return false;

  return true;  
}

const validateHgt = (hgt) => {
  const regx = /^([0-9]+)(in|cm)$/g;

  const search = regx.exec(hgt);
  if(!search) return false;
  const [full, value, unit] = search;
  if(unit === 'in') {
    if((!(value>=59))^(!(value<=76))) return false
  } else {
    if((!(value>=150))^(!(value<=193))) return false
  }
  return true;
}

const validateHcl = (hcl) => {
  const regx = /^#[a-f0-9]{6}$/;
  return regx.test(hcl); 
}

const validateEcl = (ecl) => {
  const validCl = ['amb','blu','brn','gry','grn','hzl','oth'];
  const regx = new RegExp(validCl.join('|'),'g');

  return regx.test(ecl);
}

const validatePid = (pid) => {
  const regx = /^[0-9]{9}$/;
  return regx.test(pid); 
}


/* 
Required
byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
*/

const isValid = (passport) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  let valid = true;
  
  /* requiredFields.forEach(field => {
    if(passport[field]) valid = false;
  }); */

  if(!validateYear(passport.byr,1920,2002)) {valid = false; console.log('byr',passport.byr);}
  if(!validateYear(passport.iyr,2010,2020)) {valid = false; console.log('iyr',passport.iyr);}
  if(!validateYear(passport.eyr,2020,2030)) {valid = false; console.log('eyr',passport.eyr);}
  if(!validateHgt(passport.hgt)) {valid = false; console.log('hgt',passport.hgt);}
  if(!validateHcl(passport.hcl)) {valid = false; console.log('hcl',passport.hcl);}
  if(!validateEcl(passport.ecl)) {valid = false; console.log('ecl',passport.ecl);}
  if(!validatePid(passport.pid)) {valid = false; console.log('pid',passport.pid);}

  if(!valid) console.log(passport);
  return valid;
}

getInput().then(input=>{
  const passports = getPassports(input);
  let validCount = 0;

  passports.forEach((pass) => {
    if(isValid(pass)) {
      validCount+=1;
    }
  })
  
  console.log(validCount)
})