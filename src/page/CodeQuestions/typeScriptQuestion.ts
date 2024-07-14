export {}
/**
 * 1. 什么是TypeScript？
 *  - TS是js的超级，静态类型检查
 *  - 支持ES6语法
 *  - 支持面向对象编程的概念，比如类、接口、继承、泛型
 *  
 *    TS不支持在浏览器运行，需要编译成纯JS运行。
 * 
 * 2. 为什么要使用TypeScript？TypeScript相对于JavaScript的优势是什么？
 *   - TS增加了静态类型，可以让开发人员在编写时检查错误，代码质量好，更健壮
 * 
 *   优势
 *   - 杜绝手误导致变量名写错
 *   - 类型一定程度可以充当文档, 例如出入参的注解
 *   - IDE自动填充，自动联想，使开发效率提升
 * 
 * 3. TypeScript中const和readonly的区别？枚举和常量枚举的区别？接口和类型别名的区别？
 *  - const 可以防止变量的值被修改
 *  - readonly 可以防止变量属性被修改
 * 
 *  - 枚举 
 *  - 常量枚举，编译阶段会被删除，常量枚举成员在使用的地方会被内联进来。因为常量枚举不允许包含其他成员。
 * 
 *  - 接口，都可以用来描述对象或者函数类型，
 *  - 类型别名，还可以用于其他类型，比如用于基本类型，联合类型，元组
 * 
 * 4. TypeScript中any类型的作用是什么
 *  为编译阶段还不清楚变量的类型的变量来指定一个类型，值来自于动态内容，比如用户输入，或者第三方代码库（可能不太想检查第三方代码库）。
 * 
 * 5. any, never, unknown, null, undefined 和 void有什么区别？
 *  - any: 动态的类型变量。失去了类型检查的作用。
 *  - never: 永远不存在的值的类型。总会抛出异常，或者根本不会有返回值的函数表达式，或者箭头函数表达式返回值的类型。
 *  - unknown: 任何类型的值都可以赋值给unknown. 但是unknown类型的值只能赋值给unknown或者any. 
 *  - unll & undefiend: 默认是所有类型的子类型。--strictNullChecks标记时，null或者undefined只能赋值给void或者他们自己。
 *  - void: 没有任何类型。函数没有返回值可以定义为void.
 * 
 * 6. interface可以给Function Array Class(Indexable) 做声明吗？
 *  TypeScript中可以使用String, Number, Boolean, Symbol, Object等给类型做声明吗？
 *  - 可以的！
 */
interface Say {
  (name: string): void;
}
let say: Say = (name: string): void => {

}

interface NumberArray {
  [index: number]: number;
}
let list: NumberArray = [1, 2, 3, 4]; // 数组元素都是数字

// 如何声明呢？定义class的属性和方法
interface Person {
  name: string; 
  sayHi(name: string): string;
} 

let name1:string = 'foo';
let age: number = 6;
let isDone: boolean = false;
let sym: Symbol = Symbol();

interface Person {
  name:string;
  age: number;
}

/**
 * 7. TypeScript中this和JavaScript中的this有什么差异？
 * - TS: 配置 noImplicitThis: true 必须去声明this类型，才能在函数或者对象中使用this
 * - TS: 箭头函数的this与JS保持一致。
 * 
 * 8. 使用Union Types时有哪些注意事项？
 * - 属性或者方法的访问：当不确定联合类型的变量到底是什么类型时，只能访问联合类型里共有的属性和方法。
 */
// function getLength(something: string|number):number {
//   return something.length ; // 因为nunber类型没有.length方法，所以会报错。
// }
function getString(something: string|number):string {
  return something.toString() // right, correct
}

/*
 * 9. TypeScript如何设计Class声明？
*/
// 声明
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet():string {
    return `hello ${this.greeting}`
  }
}
// 实例化
let greeting = new Greeter('world')

/*
 * 
 * 10. TypeScript如何联合枚举类型的key
 */ 
enum str {A, B, C, D, E, F,} // 不初始化的情况下，值为0,1,2,3,4,5,6
type striUnion = keyof typeof str; // 'A'|'B'|'C'|'D'|'E'

/* 
 * 
 * 11. type和interface的区别
 *  相同点：
 *  - 都可以描述对象或者函数
 *  - 都允许拓展
 *  不同点：
 *  - type可以声明基本类型，联合类型，元组
 *  - type可以使用typeof获取实例类型进行赋值
 *  - 多个相同的interface可以自动合并
 * 
 *  - 可扩展性：interface可以被类实现和扩展，非常适合用于定义类的契约和实现接口之间的继承和扩展。
 *  - 使用范围：interface用于声明对象，type用于声明基本类型别名，联合类型，元组等类型。
 *  - 语法差异：type使用等号来定义类型别名，interface使用花括号直接定义接口的成员。
 *  - 声明合并：interface支持声明合并，允许对同一个接口进行多次声明来添加更多的属性和方法。type定义的别名不可重复。
 * 
 * 12. 简单介绍TypeScript模块的加载机制
 *  JavaScript中，import {a} from 'moduleA'怎么加载呢？
 *  - 1. 尝试定位需要导入的模块文件，相对路径或者绝对路径
 *  - 2. 尝试定位外部模块声明
 *  - 3. 如果还是不能解析这个模块，就会抛出错误 cannot find modue 'module A'
 * 
 * 13. 你对TypeScript类型兼容性的理解?
 *  ts类型兼容：当类型Y可以赋值给类型X的时候，就可以说类型X兼容类型Y。而不一定通过extend的方式去继承。
 *  ts接口兼容性：X=Y, 在X中声明的变量在Y中都存在，Y中的类型可以比X中的多，但不能少。
 *  ts函数的兼容性：x=Y, Y中的参数必须都能在X中找到对应的参数，参数的名字相同与否无所谓，但是看类型，参数可以少但不能多
 * 
 * 14. TypeScript中对象展开会有什么副作用吗?
 *  - 展开对象后面的属性会覆盖前端的属性
 *  - 仅包含可枚举的属性，不可枚举的属性会丢失
 * 
 * 15. 类型的全局声明和局部声明
 *  - 不包含import, export,变成全局声明。
 *  - 包含import, export, 会变成局部声明，不会影响到全局生命。
 * 
 * 16. 如何使TypeScript项目引入并且能够识别编译为JavaScript的npm库包
 *  - 安装库的ts版本，npm install @types/xx --save
 *  - 针对没有ts版本的js库，需要编写同名的.d.ts
 * 
 * 17. TypeScript的tsconfig.json中有哪些配置项信息
 *  - files 指定文件的相对或绝对路径，编译器只会编译files里的文件
 *  - include & exclude 指定编译某些文件 & 排除某些文件
 *  - compileOnSave: true, 保存重新生成文件
 *  - extends: 继承别的文件的配置，可以把通用的逻辑抽取出来，然后通过这种方式来继承
 *  - compilerOptions: 编译的配置项，例如，如何对具体的ts文件进行编译
 */
// json
/**
{
  "files": [],
  "include": [],
  "exclude": [],
  "compileOnSave": false,
  "extends": "",
  "compilerOptions": {}
}

{
  "compilerOptions": {
    "paths": {
      "@helper/*": ["src/helper/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
*/
/*
 * 18. TypeScript中如何设置模块导入的路径别名
  tsconfig.json 里的paths来进行配置, 例子在上方。
 * 
 * 19. declare, declare global是什么
 *  declare: 定义全局变量，全局函数，全局命名空间，js modules class等等
 *  declare global: 为全局对象window来增加新的属性. 
 */
/**
 * 
 * declare global {
    interface Window {
      csrf: string;
    }
  }
  window.csrf = 'xxx' // 直接赋值会校验失败

 */


/* 
 * 20. 对TypeScript类中成员的public，private，protected，readonly 修饰符的理解？
  - public: 成员都默认public, 可以被外部访问
  - private: 私有的，只能类的内部访问
  - protected: 类的内部以及类的子类所访问，受保护的
  - readonly: 将属性设置为只读，必须在声明时或者构造函数里被初始化
 * 
 * 21. keyof和typeof关键字的作用
 * - keyof: 相当于索引类型查询操作符，能够获取索引类型属性名来构成联合类型。
 * - typeof: 获取一个变量或者对象的类型，let str:string = 'hello'; typeof str就是string类型
 * - 常常联合起来使用，比如枚举联合类型的key
 * 
 * 22. 简述工具类型 Exclude，Omit, Merge, Intersection, Overwrite的作用
 * - Exclude<T,U>, 传入T,U两个类型，目的就是从T中排除可分配给U的元素。
 * - Omit<T,K>, 忽略T中的某些元素
 * - Merge<O1, O2>, 将两个对象的属性合并
 * - Overwrite<T,U>, 用U中属性覆盖T中属性
 * - Intersection<T,U>, 取T的属性，此属性也同样存在于U
 * 
 * 23. 数组定义的两种方式
 * 
 */
type Foo = Array<string>
interface Bar {
  baz: Array<{name: string, age: number}>;
}
// 简化
type Foo2 = string[]
interface Bar2 {
  baz: {name:string, age: number}[];
}
/**
 * 24. TypeScript元组
 * 如果数组中存储的元素数据类型不同时，就需要使用元组。
 */
// 声明并初始化
let mytuple = [10, "Runoob"];