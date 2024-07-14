import React from 'react';

 // 1. Make Counter
export function makeCounter(initialValue = 0) {
  return () => initialValue++;
}

// 2. Mean
export function mean(array) {
  return array.reduce((a, b)=> a + b, 0) / array.length;
}

export function mean2(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum / array.length;
}

// 3. Min By      
export function minBy(array, iteratee) {
  let result, computed; // 模式是undefined
  for (const value of array) {  // 取出数组的每个值
    const current = iteratee(value); // 取出迭代器的结果进行比较，
    if (current !== null && current !== undefined && (computed === undefined || current < computed)) {
      computed = current;
      result = value;
    }
    return result;
  }
}

// 4. Type Utilities
        
export function isBoolean(value) {
  return value === true || value === false;
}
export function isNumber(value) {
  return typeof value === 'number';
}
export function isNull(value) {
  return value === null;
}
export function isString(value) {
  return typeof value === 'string';
}
export function isSymbol(value) {
  return typeof value === 'symbol';
}
export function isUndefined(value) {
  return value === undefined;
}

// 5. Cycle
export function cycle(...values) {
  let index = 0;
  return () => {
    const currentValue = values[index];
    index = (index + 1) % values.length;
    return currentValue;
  }
}


// 6. Type Utilities II
export function isArray(value) {
  // typeof array 会返回object. 所以用例Array.isArray()
  return Array.isArray(value);
}
// Alternative to isArray. 用构造函数
export function isArrayAlt(value) {
  // For null and undefined.
  if (value == null) {
    return false;
  }
  // [1, 2].constructor     ƒ Array() { [native code] }
  return value.constructor === Array;
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isObject(value) {
  // for null and undefined. 但其实typeof undefined === 'undefined'
  if (value == null) {
    return false;
  }
  const type = typeof value;
  return type === 'object' || type === 'function'
}

// 纯对象
export function isPlainObject(value) {
  // for null and undefined.
  if (value == null) {
    return false;
  }
  // 获取value原型对象，看它是否等于Object的原型
  const prototype = Object.getPrototypeOf(value);
  // For objects created via Object.create(null);
  // Object.create(null)是一个空对象。{}
  // Object.getPrototypeOf(Object.create(null)) 它的值是null,
  return prototype === null || prototype === Object.prototype;
}

// Alternative to isPlainObject, Lodash's implementation.
export function isPlainObjectAlternative(value) {
  if (!isObject(value)) {
    return false;
  }

  // For objects created via Object.create(null);
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}


export function countBy(array, iteratee) {
  const result = {};
  for (const value of array) {
    const key = String(iteratee(value));
    result[key] ??= 0;
    result[key]++;
  }
  return result;
}

// 防抖
// 如果您有一个根据用户输入内容执行搜索的函数，您可能需要对其进行防抖，以使其每 500 毫秒最多调用一次。这将防止搜索栏被大量请求淹没，并改善用户体验.
// 用户一直输入，就一直不执行搜索，直到用户停止输入500秒后，执行搜索。

// 节流
// 每个xxx时间调用一次。
export function debounce(func, wait) {
  let timerID = null;
  return function (...args) {
    clearTimeout(timerID);

    timerID = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

export function throttle(func, wait) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= wait) {
      func.apply(this, args);
      lastCall = now;
    }
  };
}

const Index = () => {
  return (
    <div>
      <ul>
        <li>Make Counter</li>
        <li>Mean</li>
        <li>Min By</li>
        <li>Type Utilities</li>
        <li>Cycle</li>
        <li>Type Utilities II</li>
        <li>countBy</li>
        <li>Debounce防抖</li>
        <li>Throttle节流</li>
        <li></li>
      </ul>
    </div>
  );
};

export default Index;