'use strict';

function josephus(items,k){
  let i = (k-1) % items.length();
  const res = []
  while (items != false ) {
    console.log(items);
    res.push(items.splice(i,1)[0])
    i = (i + k-1)%items.length
  }
  return res
}

console.log(josephus([1,2,3,4,5,6,7,8,9,10],2));
