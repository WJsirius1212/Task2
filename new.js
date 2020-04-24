function myNew(constructor, ...args) {
  // 创建一个空的简单JavaScript对象（即{}）
  let obj = {};
  // 链接该对象（即设置该对象的构造函数）到另一个对象 
  obj.__proto__ = constructor.prototype;
  // 将步骤1新创建的对象作为this的上下文 
  let ret = constructor.apply(obj, args);

  // 如果该函数没有返回对象，则返回this
  return typeof ret === "object" ? ret : obj;

}
//MDN test1
function Car() { }
car1 = myNew(Car);
car2 = myNew(Car);

console.log(car1.color);    // undefined

Car.prototype.color = "original color";
console.log(car1.color);    // original color

car1.color = 'black';
console.log(car1.color);   // black

console.log(car1.__proto__.color) //original color
console.log(car2.__proto__.color) //original color
console.log(car1.color)  // black
console.log(car2.color) // original color

//MDN test2
function Cars(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const car3 = myNew(Cars, 'Eagle', 'Talon TSi', 1993);

console.log(car3.make);
// expected output: "Eagle"