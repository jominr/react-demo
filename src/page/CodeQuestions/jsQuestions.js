/**
 * 1. 自定义实现unshift
 * 2. 数组去重，引用类型如何去重？
 * 3. 获取指定范围内的随机数
 * 4. 打印100以内的质数
 * 5. 提取url中的参数
 * 6. 数组随机排序
 * 7. 数据flatten
 * 8. 返回两数之和的下标
 * 9. Promise.all
 * 10. 手动实现发布订阅
 */


// 1. 自定义实现unshift
let arr = [1, 2, 3];

Array.prototype.myUnshift = function() {
  const len = arguments.length;
  for (let i = len - 1; i >= 0; i--) {
    const element = arguments[i];
    this.splice(0, 0, element);
  }
  return this.length;
}

arr.myUnshift(3,4); // [3, 4, 1, 2, 3]
console.log(arr);

// 2. 数组去重
let arr2 = [{}, {}, 12,12, undefined, null, null, [2], [2]];
Array.prototype.myUnique = function() {
  // 2.1 这样做引用类型没有去重
  return Array.from(new Set(this));

  // 2.2 想过同上，引用类型无法去重
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;

  // 2.3 借助filter，引用类型依然无法去重
  return this.filter((val, idx)=>{
    return this.indexOf(val, 0) === idx;
  })
}
// 所以引用类型怎么去重呢？？？？

// 3. 如何获取指定范围内的随机数
Math.round(num); // num四舍五入取整
Math.floor(num); // 向下取整
Math.ceil(num); // 向上取整
function fn3(min, max) {
  // (min, max) 不包含两端
  return Math.round(Math.random() * (max - min - 2) + min + 1);

  // [min, max] 包含两端
  return Math.round(Math.random() * (max - min) + min);

  // (min, max]
  return Math.ceil(Math.random() * (max - min) + min);

  // [min, max)
  return Math.floor(Math.random() * (max - min) + min);
}

// 4. 打印100以内的质数
// 要么只能被它整除，要么只能被1整除(0, 1 不考虑)
function fn4() {
  let count = 0;
  for (let i = 2; i < 100; i++) {
    for (let j = 1; j < i; j++) {
      if (i % j == 0) {
        count++;
        if (j !== 1) break;
      }
    }
    if (count == 1) {
      console.log(i);
    }
    count = 0;
  }
}

// 5. 提取url中当前的参数
// https://tt.com?a=1&b=2&c=3
function queryURLParams(URL) {
  let url = URL.split('?')[1];
  // 通过URLSearchParams，原生提供的构造函数来实现，
  const urlSearchParams = new URLSearchParams(url);
  // entries：条目，
  const params = Object.fromEntries(urlSearchParams.entries());
  return params;
}
console.log(queryURLParams('https://tt.com?a=1&b=2&c=3'));

// 6. 数组的随机排序
let arr6 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function result(arr) {
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = parseInt(Math.random() * arr.length);
    
    let curNum = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = curNum;
  }
  return arr;
}
// 借助sort
arr.sort(()=> Math.random() - 0.5);

// 7. 如何使用迭代的方法来实现flatten函数
let arr7 = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10];

const flatten = function(arr) {
  while(arr.some(v => Array.isArray(v))) {
    arr = [].concat(...arr);
    // [].concat(1,2, [3, 4, 5]) => [1, 2, 3, 4, 5]
    // 所以第一轮会变成[1, 2, 3, 4, 5, [6, 7], 8, 9, 10]
  }
  return arr;
}

const flatten2 = function(arr) {
  return [].concat(...arr.map(v=> (Array.isArray(v) ? flatten2(v) : v)))
}
// 展开flatten2理解一下
const flatten3 = function(arr) {
  return [].concat(
    ...arr.map(v => {
      if (Array.isArray(v)) {
        return flatten3(v);
      } else {
        return v;
      }
    })
  )
}

const flatten4 = function(arr) {
  return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten4(cur) : cur), []);
}

const flatten5 = function(arr) {
  const res = [];
  while (arr.length) {
    let cur = arr.shift();
    if (Array.isArray(cur)) {
      arr.unshift(...cur);
    } else {
      res.push(cur);
    }
  }
  return res;
}

// 8. 两数之和
// let nums = [2, 7, 11, 15], target = 9;
// return [0, 1]
function twoSum (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const targetIndex = nums.indexOf(target - num);
    if (targetIndex > -1 && targetIndex !== i) {
      return [i, targetIndex];
    }
  }
}

// 9. 给你a, b, c三个请求
// 9.1 a,b,c同时请求，统一处理他们的返回结果。
function all() {
  Promise.all([
    new Promise((resolve, reject) => {
      fetch('https://hacker-news.firebaseio.com/v0/item/40932914.json').then(res => {
        resolve(res.json());
      })
    }),
    new Promise((resolve, reject) => {
      fetch('https://hacker-news.firebaseio.com/v0/item/40928948.json').then(res => {
        resolve(res.json());
      })
    }),
    new Promise((resolve, reject) => {
      fetch('https://hacker-news.firebaseio.com/v0/item/40924368.json').then(res => {
        resolve(res.json());
      })
    })
  ]).then(res => {
    // res[0], res[1], res[2]
    console.log(444444, res)
  })
}
// 9.2 c依赖b,b依赖a
function oneByOne() {
    new Promise((resolve, reject) => {
      fetch('https://hacker-news.firebaseio.com/v0/item/40932914.json').then(res => {
        resolve(res.json());
      })
    }).then((data)=> {
      console.log(11, data)
      return new Promise((resolve, reject) => {
        fetch('https://hacker-news.firebaseio.com/v0/item/40928948.json').then(res => {
          resolve(res.json());
        })
      })
    }).then((data)=> {
      console.log(22, data)
      return new Promise((resolve, reject) => {
        fetch('https://hacker-news.firebaseio.com/v0/item/40924368.json').then(res => {
          resolve(res.json());
        })
      })
    })
    .then((data)=> console.log(33, data))
    .catch(err => console.log(444,err))
    .finally(()=> console.log(55555))
  
}
// 9.3 c在a和b获取完数据后再发送请求。
function twoPlusOne() {
  Promise.all([
    new Promise((resolve, reject) => {
      fetch('https://hacker-news.firebaseio.com/v0/item/40932914.json').then(res => {
        resolve(res.json());
      })
    }),
    new Promise((resolve, reject) => {
      fetch('https://hacker-news.firebaseio.com/v0/item/40928948.json').then(res => {
        resolve(res.json());
      })
    }),
  ]).then(res => {
    // res[0], res[1], res[2]
    console.log(444444, res)
    return new Promise((resolve, reject) => {
      fetch('https://hacker-news.firebaseio.com/v0/item/40924368.json').then(res => {
        resolve(res.json());
      })
    }).then((data) => console.log(333, data));
  })
}

// 10. 手动实现事件的发布订阅，不太确定写的对不对
// test.addEventListener("click", function(){})
// test.addEventListener("click", function(){})
// test.addEventListener("click", function(){})
// test.addEventListener("onmouse", function(){})
// 给这个元素绑定了多个click事件，和一个mouse事件。

// 卖房时一一登记，之后有房源时再一一通知。
// 主题：售楼处要充当发布者。
// 缓存列表：绑定每一个监听器所对应的回调函数。
// 当事件触发时（状态发生变化时），依次执行回调函数。

class Eventemitter {
  handlers = {}
  // 注册监听
  on(type, handler, once = false) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    if (!this.handlers[type].includes(handler)) {
      this.handlers[type].push(handler);
      handler.once = once; 
    }
    console.log(1111, this.handlers)
  }
  once(type, handler) {
    this.on(type, handler, true)
  }
  // 取消事件
  off(type, handler) {
    if (this.handlers[type]) {
      this.handlers[type] = this.handlers[type].filter(h => {
        return h !== handler;
      })
    }
  }
  // 触发事件
  trigger(type) {
    if (this.handlers[type]) {
      this.handlers[type].forEach(handler => {
        handler.call(this);

        if (handler.once) {
          this.off(type, handler);
        }
      })
    }
  }
}

const ev = new Eventemitter();
function hander1() {
  console.log(1);
}

function hander2() {
  console.log(2);
}

function hander3() {
  console.log(3);
}
ev.on('click', hander1);
ev.on('click', hander2);
ev.on('click', hander3);
ev.trigger('click');
ev.trigger('click');