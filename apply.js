function globalObject() {
  //获取替换用全局对象
  return this;
}
Function.prototype.myApply = function (thisArg) {
  //确保fn没有被占用  ES6-Symbol
  let fn = Symbol();
  thisArg = thisArg || globalObject();
  thisArg[fn] = this;
  //通过thisArg调用函数则this值必为thisArg
  let argsArray = arguments[1];
  let final = thisArg[fn](...argsArray);
  delete (thisArg[fn]);
  return final;
}

//MDN test-1
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.myApply(null, numbers);
console.log(max);
// expected output: 7
const min = Math.min.myApply(null, numbers);
console.log(min);
// expected output: 2

//MDN test-2
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]

//MDN test-3
function MyConstructor(arguments) {
  for (var nProp = 0; nProp < arguments.length; nProp++) {
    this["property" + nProp] = arguments[nProp];
  }
}

var myArray = [4, "Hello world!", false];
var myInstance = new MyConstructor(myArray); //Fix MyConstructor.construct is not a function

console.log(myInstance.property1);                // logs "Hello world!"
console.log(myInstance instanceof MyConstructor); // logs "true"
console.log(myInstance.constructor);              // logs "MyConstructor"