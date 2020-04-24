# JavaScript

## Call()

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数

```javascript
function.call(thisArg, arg1, arg2, ...)
```

- `thisArg`

  可选的。**在 function 函数运行时使用的 this 值**。请注意，this 可能不是该方法看到的实际值：如果这个函数**处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象**，原始值会被包装。

- `arg1, arg2, ...`

  指定的参数列表。

- 返回值

  使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

---

> **代码部分**

```javascript
function globalObject() {
  //获取替换用全局对象
  return this;
}
Function.prototype.myCall = function (thisArg, ...args) {
  //独一无二fn ES6-Symbol
  let fn = Symbol();

  //thisArg指定为 null 或 undefined 时会自动替换为指向全局对象
  thisArg = thisArg || globalObject();
  thisArg[fn] = this;
  //通过thisArg调用函数则this值必为thisArg
  let final = thisArg[fn](...args);
  delete thisArg[fn];
  return final;
};
```

> 给 thisArg 添加 function，再调用 function 则 this 指向 thisArg

---

## Apply()

call()方法的作用和 apply() 方法类似，区别就是 call()方法接受的是参数列表，而 apply()方法接受的是一个参数数组。

```javascript
function.apply(thisArg, [argsArray])
```

- `thisArg`

  必选的。**在 function 函数运行时使用的 this 值。** 请注意，this 可能不是该方法看到的实际值：如果这个函数 **处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象**，原始值会被包装。

- `argsArray`

  可选的。**一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数**。如果该参数的值为 null 或 undefined，则表示不需要传入任何参数

- 返回值

  调用有指定 this 值和参数的函数的结果。

---

> **代码部分**

```javascript
function globalObject() {
  //获取替换用全局对象
  return this;
}
Function.prototype.myApply = function (thisArg) {
  //独一无二fn  ES6-Symbol
  let fn = Symbol();
  thisArg = thisArg || globalObject();
  thisArg[fn] = this;
  //通过thisArg调用函数则this值必为thisArg
  //传入的是数组
  let argsArray = arguments[1];
  let final = thisArg[fn](...argsArray);
  delete thisArg[fn];
  return final;
};
```

---

## Bind()

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```javascript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

- `thisArg`

  调用绑定函数时作为 this 参数传递给目标函数的值。 **如果使用 new 运算符构造绑定函数，则忽略该值。** 当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，作为 thisArg 传递的任何原始值都将转换为 object。**如果 bind 函数的参数列表为空，执行作用域的 this 将被视为新函数的 thisArg。**

- `arg1, arg2, ...`

  当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

- 返回值

  返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。

---

> **代码部分**

```javascript
function now() {
  //获取替换用this
  return this;
}
Function.prototype.myBind = function (thisArg, ...args) {
  //保存原函数
  let fn = this;
  //判断参数列表是否为空，修改thisArg
  thisArg = thisArg || now();
  return function (args) {
    // 判断函数是作为构造函数还是普通函数
    // 构造函数 this instanceof function返回true，将绑定函数的this指向该实例
    if (this instanceof Function) {
      //new运算符
      return new fn(...args);
    }
    //当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的this指向thisArgs
    return fn.apply(thisArg, args);
  };
};
```

> thisArg 为空则替换为作用域的 this  
> 使用 new 运算符则忽略 thisArg，不然返回与 thisArg 绑定的函数

---

## New

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例  
new 关键字会进行如下的操作：

1. 创建一个空的简单 JavaScript 对象（即{}）；
2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
3. 将步骤 1 新创建的对象作为 this 的上下文 ；
4. 如果该函数没有返回对象，则返回 this。

```javascript
new constructor[[arguments]]();
```

- `constructor`

  一个指定对象实例的类型的类或函数。

- `arguments`

  一个用于被 constructor 调用的参数列表。

- 返回值

  对象

---

> **代码部分** new 为操作符只能用函数模拟

```javascript
function myNew(constructor, ...args) {
  // 创建一个空的简单JavaScript对象（即{}）
  let obj = {};
  // 链接该对象（即设置该对象的构造函数）到另一个对象
  obj.__proto__ = construtror.prototype;
  // 将步骤1新创建的对象作为this的上下文
  let ret = constructor.apply(obj, args);

  // 如果该函数没有返回对象，则返回this
  return typeof ret === "object" ? ret : obj;
}
```

> 创建的obj就是constructor的this，所以如果ret不是对象就返回this的this指的是obj(?)

---
