let min = 1;
let max = 10;
let num = Math.floor(Math.random() * (max - min + 1)) + min;

let err = new Error('NASHA HERNYA S TEKSTOM OSHIBKI');

if(num == 5) {
  err.responseCode = 550;
  
} else if(num == 3 || num == 7) {
  err.responseCode = 451;
}

return err;