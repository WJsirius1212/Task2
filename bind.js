function now() {
  //获取替换用this
  return this;
}
Function.prototype.myBind = function (thisArg, ...args) {
  let fn = this;
  //判断参数列表是否为空，修改thisArg
  thisArg = thisArg || now()
  return function (args) {
    // 判断函数是作为构造函数还是普通函数
    // 构造函数 this instanceof function返回true，将绑定函数的this指向该实例
    if (this instanceof Function) {
      //new运算符
      return new fn(...args);
    }
    //当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的this指向thisArgs
    return fn.apply(thisArg, args);
  }
}

//MDN test-1
const module1 = {
  x: 42,
  getX: function () {
    return this.x;
  }
}

const unboundGetX = module1.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.myBind(module1);
console.log(boundGetX());



//MDN test-2
let window = (function () { return this })();
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function () {
  window.setTimeout(this.declare.myBind(this), 1000);
};

LateBloomer.prototype.declare = function () {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用 'declare' 方法