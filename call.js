function globalObject() {
  //获取替换用全局对象
  return this;
}
Function.prototype.myCall = function (thisArg, ...args) {
  //确保fn没有被占用  ES6-Symbol
  let fn = Symbol();
  //对象
  //thisArg指定为 null 或 undefined 时会自动替换为指向全局对象
  thisArg = thisArg || globalObject();
  thisArg[fn] = this;
  //通过thisArg调用函数则this值必为thisArg
  let final = thisArg[fn](...args);
  delete (thisArg[fn]);
  return final;
}

//MDN-test1
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.myCall(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"



//MDN-test2
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.myCall(obj);
// cats typically sleep between 12 and 16 hours


//MDN-test3
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function (i) {
    this.print = function () {
      console.log('#' + i + ' ' + this.species
        + ': ' + this.name);
    }
    this.print();
  }).myCall(animals[i], i);
}
// #0 Lion: King
// #1 Whale: Fail