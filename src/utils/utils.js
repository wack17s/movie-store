export function perPage(number) {
  const arr = [''];
  let num = 0; 
  let nums;

  if ((number/4)%1 === 0) nums = (number/4);
  else nums = (number/4) - (number/4)%1 + 1;

  for (let i = 0; i < nums; i++) {
    arr.push(num);
    num += 4;
  }

  return arr;
}
