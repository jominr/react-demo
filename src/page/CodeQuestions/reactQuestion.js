
/* 
  1. React18 有哪些更新。现在都React19了好吧

  - 1. setReact 自动批处理。
    所有事件都进行批处理，多次调用setState合并成一次，数据层多个状态合并成一次更改，视图层将多次渲染合并成一次渲染。

  - 2. 引入新的root API
    支持new concurrent renderer

  - 3. 去掉了对IE浏览器的支持
  - 4. 使用flushSync去掉批量更新
  - 5. react组件返回值更新
    - react17, return null undefined报错
    - react18, 支持null undefined返回

  - 6. strict mode更新
    - 当使用严格模式时，页面会先渲染一遍。react17去掉了第一次的控制台日志。react18出现了这次日志, 浅灰色。

  - 7. hooks
    - hooks的执行时机：DOM生成之后，useEffectLayout执行之前。
  
  - 8. concurrent mode
    - 并发模式，不是功能，是底层设计。？？？
    - 之前都是同步不可中断的模式。现在是异步可中断的更新。
*/

import React from 'react';
import ReactDom from 'react-dom';
import App from '../../App';

// react17
const root1 = document.getElementById('root')
ReactDom.render(<App/>, root1)

// 卸载组件
ReactDom.unmountComponentAtNode(root1)

// react18 挂载
import ReactDom from 'react-dom/client'

const root = document.getElementById('root')
ReactDom.createRoot(root).render(<App/>)

// 卸载组件
root.unmount()

/*
  2. React设计思想
  - 组件化
    开闭原则
    封闭：组件内部状态自身维护，只处理内部渲染逻辑。
    开放：组件通信，不同组件通过props, 单向数据流进行交互。

  - 数据驱动视图
    UI = f (data), 通过Data的变化来驱动UI的渲染，而不是直接操作DOM

  - 虚拟DOM
    DOM操作消耗性能，非常昂贵。
    虚拟DOM是通过JS对象来描述真实的DOM，在更新时会进行两次虚拟DOM的比较diff，可以实现DOM的增量更新。

  3. JSX是什么，它和JS有什么区别
    JSX是React.createElement语法糖，它允许我们在html中写js, 
    它不能被浏览器直接识别，需要通过webpack或者babel编译成js进行执行。

  区别：
    js可以被打包工具直接编译，不需要额外转化。
    jsx需要通过babel进行编译，再解释执行。

  为什么需要组件顶部 引入 import React from 'react'?
    因为JSX是React.createElement语法糖, 编译时需要。
    在react17以后，jsx就不再需要转化成React.createElement. 就不需要引入'react'了。

  为什么React自定义组件首字母大写？
    如果是React.createElement, 会传入以下3个参数
      -type 元素类型， 
      -props 元素属性，
      -children 子元素，

    jsx => vdom => dom
    如果首字母小写，在创建vdom时，会当成一个html标签，没有对应的这样的标签，就会报错。
    如果是大写，就会当成一个变量进行创建，就会去找对应的创建的方法React.createElement，进行转化和编译。

  4. React组件为什么不能返回多个元素？React为什么只有一个根元素？？
    - React组件最后会被编译成render函数，函数的返回值只有一个，如果不用单独的根节点包裹的话，就会并列多个返回值。
    - 虚拟DOM是树状的结构，树状的根节点只能有一个。
    
    react组件怎么返回多个组件
    - HOC高阶函数，
    - React.fragment, 类似vue的template
    - 使用数组返回
  
    元素和组件的区别
    - react组件分为类组件，函数组件
    - react元素：jsx创建，

  5. React类组件生命周期
    - 
  
  6. React事件触发机制

    什么是合成事件？
      符合W3C规范，包括：事件触发、事件冒泡、事件捕获、事件合成、事件派发

    React事件设计的动机，为什么要有合成事件？
      - 在底层磨平不同浏览器之间的差异，提供统一稳定的与原生事件相同的接口。
      - React把握主动权，实现了中心化控制。
      - React引入了事件池，避免垃圾回收，避免频繁创建销毁。

    与原生DOM事件区别：
      - 包含了对原生dom事件引用，可以使用e.nativeEvent进行访问。 

  7. DOM事件流如何工作？
    - 事件捕获
    - 处于目标
    - 事件冒泡

    - 事件委托：多个子元素的监听函数合并到父元素上。
    React16, 事件绑定在document上，
    React17, 事件绑定在container上，就是指ReactDom.render(app, container)的这个container，
      
    - react事件绑定在container上，其他节点没有绑定事件，减少内存开销。
    - react自身实现了冒泡机制，不能通过return false来组织冒泡。
    - react通过SytheticEvent 实现事件合成。？？？

  8. React常用组件
    - Portal, 渲染在父组件之外的地方，例如把弹窗、提示框渲染在根组件下，变成全局的内容。
    - Fragment，将子列表分组，不产生额外的DOM节点
    - Context, 数据传递，避免props drilling. 
    - Transition, 并发？

  9. Redux 状态管理库
    - store, 一个全局的状态管理对象
    - reducer，一个纯函数，根据旧的state和props更新新的state
    - Action, 改变状态的唯一方法，dispatch action

  10. React-Router工作原理
    为什么需要前端路由
    - 早起路由跳转会造成真个页面的更新，用户体验差
    - SPA，seo不友好
    - 前端路由，记住用户的操作。

    解决什么问题？
    - 刷新页面，根据url对资源进行重定向。
    - 不同的url映射到不同的内容。
    - 拦截用户的刷新操作，避免不必要的资源请求。感知url的变化，来进行页面的匹配。

    React-router-dom 有哪些组件
      两种类型：hashRouter（url的hash属性来实现跳转 #xxx, #后面发生改变会触发）， BrowserRouter（html5提供history API来实现路由跳转）
      Route路由匹配，
      Link连接
      NavLink, 当前活动的链接。
      Switch路由跳转
      Redireact 路由重定向。
    
    核心能力：跳转
    路由：定义路由和组件的映射关系。
    导航：负责触发路由的改变。

  11. 数据如何在React组件中流动
    React组件通信：
      父子通信: props
      子父通信: 回调函数
      兄弟组件之间: 通过父组件进行中转
      父组件和后代组件: context跨层级通信
      无关组件通信: redux, context

  12. React hooks
    class组件：
    - 需要声明constructor，
    - 需要手动绑定this,有生命周期钩子，
    - 类组件可以维护自己的state，是有状态的组件
    - 需要继承class, 
    - 使用的是面向对象的方法，以及封装，包含组件属性和方法，有继承。

    函数组件：没有这些

  13. Why react hooks
    - 告别难以理解的class组件
    - 解决业务逻辑难以拆分的问题
    - 使状态逻辑复用变得简单
    - 设计理解，更适合react

    局限性：
    - 不能完整为函数组件提供类组件的能力。
    - 对开发者提出更高的要求
    - hooks的规则约束

    - useEffect, useMemo, useState, useCallback,

  14. 为什么不能使用this.state改变数据？
    这种方式不能触发render
    要使用setState()

    队列机制更高效更新 state, 避免错误。

  15. React Fiber是什么？
    背景：JS引擎和页面渲染是两个线程，是互斥的，如果JS线程长期占用主线程，渲染就需要等待。

    Fiber: 对调和过程重写。一个fiber就是一个js数据对象。

  16. React渲染流程
    jsx描绘界面
    1. jsx通过babel编译后形成了render function（react.createElement）, 执行function后变成vdom
    2. vdom变成fiber, 再进行渲染
    3. vdom变成fiber的过程，就是reconcile，
    4. 转换过程中，创建dom, fiber在commit阶段，生成真实的DOM，
    （这个过程是可以打断的，这是它的优势）
    5. 真实DOM再挂在到container或者节点上。

    vdom是一个React Element对象，只记录子节点，不记录兄弟节点。因此渲染是不可中断的。
    fiber是fiberNode对象，是一个链表，不仅记录了子节点，还记录了父节点，兄弟节点，因此可以打断，打断以后依然可以找到对应关系。
*/ 
