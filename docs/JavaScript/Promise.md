---
id: promise
---

## 1.两种回调函数

### 1.1.同步回调

1. 理解：立即执行，在主线程中完全执行完成之后才会结束，不会放入回调队列中

2. 例子：数组的 **forEach** 传入的回调 / **Promise** 中的 **excutor** 函数

   ```js
   const arr = [1, 2, 3, 4]
   arr.forEach(item => {			// 同步回调，必须先执行完成，才能继续执行主线程
   	console.log(item)
   })
   console.log('我在forEach之后执行！')
   
   // 执行结果：
   ```

   ![image-20200430162755895](/assets/Promise.assets/image-20200430162755895.png)

### 1.2.异步回调

1. 理解：不会立即执行，会放入回调队列中来执行

2. 例子：定时器回调 / **ajax**回调 / **Promise** 的 **resolve|rejec**t 函数

   ```js
   setTimeout(() => {			// 异步回调，放入异步队列中，等待主线程任务完成
     console.log(1)
   }, 0)
   setTimeout(() => {
     console.log(2)
   }, 0)
   setTimeout(() => {
     console.log(3)
   }, 0)
   console.log('我在定时器之前执行')
   ```

   ![image-20200430163044789](/assets/Promise.assets/image-20200430163044789.png)

## 2.Error对象

> MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error

### 2.1.错误类型

通过**Error**的构造器可以创建一个错误对象。当运行时错误产生时，Error的实例对象会被抛出。

- **[`Error`](#)**

  顶级错误类型，所有错误类型的父类

  ## 语法

  ```js
  // 1. 对象使用 
  new Error([message[, fileName[,lineNumber]]])
  
  // 2. 函数使用
  Error([message[, fileName[,lineNumber]]]);
  ```

  ### 参数

  - `message`

    可选。人类可阅读的错误描述信息。

  - `fileName ` 

    可选。被创建的Error对象的**fileName**属性值。默认是调用Error构造器代码所在的文件 的名字。

  - `lineNumber ` 

    可选。被创建的Error对象的**lineNumber**属性值。默认是调用Error构造器代码所在的文件的行号。

  

其他六种错误类型

------

- **[`EvalError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/EvalError)**

  创建一个error实例，表示错误的原因：与 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 有关。

- **[`InternalError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/InternalError)**  

  创建一个代表Javascript引擎内部错误的异常抛出的实例。 如: "递归太多".

- **[`RangeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError)**

  创建一个error实例，表示错误的原因：数值变量或参数超出其有效范围。

- **[`ReferenceError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)**

  创建一个error实例，表示错误的原因：无效引用。

- **[`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)**

  创建一个error实例，表示错误的原因：[`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)在解析代码的过程中发生的语法错误。

- **[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)**

  创建一个error实例，表示错误的原因：变量或参数不属于有效类型。

- **[`URIError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError)**

  创建一个error实例，表示错误的原因：给 [`encodeURI()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)或 [`decodeURl()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)传递的参数无效。

### 2.2.错误处理

使用 try | catch 来捕捉错误

```js
try {
  arr = 10
  let arr
  } catch(e) {
    console.log(e)
    
    if (e instanceOf TypeError) {
      // 处理类型错误
    } else if(e instanceOf SyntaxError) {
      // 处理类型错误
    } else {
      // ...
    }
  }
```

### 2.3.抛出错误

1. 创建错误对象

2. 抛出错误对象

   ```js
   let err = new Error('出现错误')
   throw err	// 把错误抛出，就会中断代码运行，并且能在控制台被查看到
   ```

   

## 3.Promise的使用

### 3.1.promise是啥

1. 抽象理解
   - promise是JS中进行异步编程的新的解决方案，代替以往的旧的方案(纯回调)

2. 具体理解
   - Promise是一个构造函数
   - 是用来封装异步操作，并来获取结果的一个函数

### 3.2.promise状态

1. pedding => **resolved**

2. pedding => **rejected**

   Promise 的状态只有这三种，pedding是开始，resolve是成功，reject是失败

   - 无论成功与否，都会有一个结果数据
   - 成功的数据成为 value，执行reject，失败的数据称为 reason，执行reject

### 3.2.执行流程

![image-20200430204806673](/assets/Promise.assets/image-20200430204806673.png)

### 3.3.基本使用

```js
// 1. 创建promise对象
const promise = new Promise((resolve, reject) => {
  // 执行器函数，执行异步任务(该执行器函数是同步回调函数)
  // 1. 执行成功, 调用resolve
  // 2. 执行失败, 调用reject
  let time = +new Date()
  if (time % 2 === 0) {
    resolve('时间戳为2的整数, 执行resolve, time=' + time)
  } else {
    reject('时间戳错误, 执行reject, time=' + time)
  }
})

promise.then(
  value => {
    // onResolved函数, 本质就是传入promise的回调函数resolve
    console.log(value)
  },
  reason => {
    // onRejected函数, 本质就是传入promise的回调函数reject
    console.log(reason)
  }
)
```

- 注意：传入promise中的执行器函数是同步回调函数，优先执行，不会传入任务队列

  ```js
  console.log(1)
  const p = new Promise((resolve, reject) => {
  	console.log(2)
  })
  console.log(3)
  
  // 结果：
  // 1 2 3
  ```


### 3.4.思考：为什么用promise

Promise的优点（优点）：

1. Promise指定回调函数的方式更加灵活

   > 纯回调方式：**回调函数**必须在异步任务开始前指定
   >
   > Promise方式：在异步任务启动前/启动后/异步任务完成，再来指定对应处理的**回调函数**

   ```js
   /**
    *	纯回调方式
    */ 
   function scuuessCallback() { console.log('异步任务成功') }
   function faikureCallback() { console.log('异步任务成功') }
   
   getJsonData(option, scuuessCallback, faikureCallback) {
     // Do async tasks
   
     if(data) {
       scuuessCallback()
     } else {
       faikureCallback()
     }
   }
   
   /**
    *	Promise方式
    */
   const p = new Promise((resolve, reject) => {
     //  Do async tasks
     // Promise内部的执行器函数是同步回调函数，在Promise创建完成时边开始异步任务
     
     if(data) {
       resolve()
     } else {
       reject()
     }
   })
   
   p.then(	
     // 在异步任务完成后再指定 成功|失败 回调函数
   	response => {
       console.log('异步任务成功')
     },
     reason => {
       console.log('异步任务成功')
     }
   )
   ```

2. Promise支持链式调用，可以解决回调地狱问题

   > 回调地狱：
   >
   > 1. **回调函数嵌套调用**，外部回调函数的结果会影响内部回调函数，非常不便于阅读，
   > 2. 不便于**异常**的处理
   > 3. 剥夺了回调函数**return**返回值
   >
   > Promise：
   >
   > 1. 解决回调地狱，大大提升可读性
   > 2. 出现异常能被捕获
   > 3. 能进行return返回值
   >
   > 终极解决方案：async / await

   ```js
   /**	
    *	回调地狱：在一次ajax的success回调函数中多次嵌套请求
    *	1. 回调函数嵌套调用，外部回调函数的结果会影响内部回调函数，非常不便于阅读，
    *	2. 不便于**异常**的处理
    *	3. 剥夺了回调函数return返回值
    */
   function ajax(option, callback) {
     // do async something
   }
   
   function getJsonData() {
     ajax({
       url: 'https://aaa.bbb.ccc',
       method: 'GET',
       success: function (res) {
         let firstId = res.id // 获得一次请求数据的id
         let secondId, thirdId // 定义接受第二次第三次请求数据的变量
         if (res) {
           ajax({ // 在success回调函数中进行第二次请求
             url: 'https://ddd.eee.fff',
             method: 'POST',
             data: {
               id: firstId
             },
             success: function (res) {
               secondId = res.id
               if (res) {
                 ajax( // 在success回调函数中进行第二次请求
                   {
                     url: 'https://ddd.eee.fff',
                     method: 'POST',
                     data: {
                       id: firstId
                     },
                     success: function (res) {
                       thirdId = res.id
                       if(thirdId === firstId) {
                         console.log('通过')
                       }
                     }
                   }
                 )
               }
             }
           })
         }
       }
     })
   }
   
   /**
    *	Promise解决回调地狱
    *	1. 解决回调地狱，大大提升可读性
    *	2. 出现异常能被捕获
    *	3. 能进行return返回值
    */
   new Promise((resolve, reject) => {
     ajax({
       url: 'http://aaa.bbb.ccc',
       success: function (res) {
         if (res) {
           resolve(res)
         }
       }
     })
   }).then(
     res => {
       console.log('第一次请求成功')
       return new Promise((resolve, reject) => {
         ajax({
           url: 'http://bbb.ccc.ddd',
           success: function (res) {
             if (res) {
               resolve(res)
             }
           }
         })
       })
     }
   ).then(
     res => {
       console.log('第二次请求成功')
       return new Promise((resolve, reject) => {
         ajax({
           url: 'http://bbb.ccc.ddd',
           success: function (res) {
             if (res) {
               resolve(res)
             }
           }
         })
       })
     }
   ).catch(
     err => {
       // 所有错误都会在这里被捕捉
     }
   )
   ```


## 4.Promise的方法

### `Promise`

> 构造函数，用来创建promise对象

#### [语法](#)

```js
new Promise( function(resolve, reject) {...} /* executor函数 */  );

// 传入promise的是执行器函数，他是同步回调函数
```

#### [参数](#)

### excutor

executor是带有 `resolve` 和 `reject` 两个参数的同步回调函数函数

Promise构造函数执行时立即调用`executor` 函数

`resolve` 和 `reject` 函数被调用时，分别将promise的状态改为 *fulfilled（*完成）或*rejected（失败）*

------

### 原型方法

1. ##### `Promise.prototype.then(onFulfilled, onRejected)`

   > 添加解决（resolve）和拒绝（reject）的回调函数到当前promise，返回新的promise|自己return一个新的promise

   ```js
   new Promise((resolve, reject) => {
   	let date = +new Date()
     if(date % 2 === 0) {
       resolve('成功了')
     } else {
       reject('失败了')
     }
   }).then(
   	response => {
       console.log(response)		// response的值为 '成功了'
     },
     reason => {
       console.log(reason)		  // reason的值为 '失败了'
     }
   )
   ```

   ------

2. ##### `Promise.prototype.catch(onRejected)`

   > 添加一个拒绝（reject）回调到当前promise，返回一个新的promise，是.then第二个参数的另一种写法

   ```js
   new Promise((resolve, reject) => {
     let date = +new Date()
     if(date % 2 === 0) {
       resolve('成功了')
     } else {
       reject('失败了')
     }
   }).then(
     response => {
       console.log(response)		// response的值为 '成功了'
     }
   ).catch(
     reason => {
       console.log(reason)		  // reason的值为 '失败了'
     }
   )
   ```

   ------

3. ##### `Promise.prototype.finally(onFinally)`

   > 添加一个回调函数于当前的promise对象，不管promise的状态最后为什么，该回调函数都会在promise运行完毕后调用，**没有参数**

   ```js
   new Promise((resolve, reject) => {
   	let date = +new Date()
     if(date % 2 === 0) {
       resolve('成功了')
     } else {
       reject('失败了')
     }
   }).then(
   	response => {
       console.log(response)		// response的值为 '成功了'
     },
     reason => {
       console.log(reason)		  // reason的值为 '失败了'
     }
   ).finally(
   	function() {
       console.log('Promise运行完毕')
     }
   )
   ```

   ------

### 函数对象方法

1. ##### `Promise.all(iterable)`

   ##### [参数](#)

   可迭代对象【数组 | 伪数组】，且数组中存放的都是Promise对象

   ##### [说明](#)

   当数组里的所有Promise对象都成功（resolve），才能执行最外层的该promise的resolve

   一旦有任何一个iterable里面的promise对象失败（reject）则立即触发该promise对象的reject

   ```js
   let p1 = new Promise((a, b) => {a(1)})
   let p2 = new Promise((a, b) => {a(2)})
   let p3 = new Promise((a, b) => {b(3)})
   
   Promise.all([p1, p2, p3]).then(
     values => {
       console.log(values)
     },
     reason => {
       console.log(reason)
     }
   )
   // reason => 3, p3是失败的，所以直接触发reject
   
   let p1 = new Promise((a, b) => {a(1)})
   let p2 = new Promise((a, b) => {a(2)})
   
   Promise.all([p1, p2]).then(
     values => {
       console.log(values)
     },
     reason => {
       console.log(reason)
     }
   )
   // values => [1, 2], p1 p2 都是成功的, 所以返回一个带有成功promise的值的数组
   ```

2. ##### `Promise.race(iterable)`

   ##### [参数](#)

   可迭代对象【数组 | 伪数组】，且数组中存放的都是Promise对象

   [说明](#)

   只要数组中任意一个promise被成功或失败后，父级Promise立刻终止所有剩下任务，返回最快执行完成的那个子promise

   ```js
   let p1 = new Promise((a, b) => {a(1)})
   let p2 = new Promise((a, b) => {a(2)})
   let p3 = new Promise((a, b) => {b(3)})
   
   Promise.race([p3, p1, p2]).then(
     value => {
       console.log(value)
     },
     reason => {
       console.log(reason)
     }
   )
   // 3
   
   Promise.race([p2, p1, p3]).then(
     value => {
       console.log(value)
     },
     reason => {
       console.log(reason)
     }
   )
   // 2
   ```

3. ##### `Promise.reject(reason)`

   返回一个状态为成功的Promise对象，将给定的信息传递给对应的onResolved方法

   ##### `Promise.resolve(value)`

   返回一个状态为失败的Promise对象，将给定的信息传递给对应的onRejected方法
   
   ```js
   Promise.resolve(20).then(value => {
     console.log(value)
   })
   // 20 
   
   Promise.reject(10).catch(reason => {
     console.log(reason)
   })
   // 10
   ```

## 5.Promise的几个点

1. #### 如何改变Promise的状态 ？

   （1）当执行器函数内部调用resolve时，*pendding* => *fulfilled*

   （2）当执行器函数内部调用reject时，  *pendding* => *rejected*

   （3）执行器内部发生错误，或者异常|值，*pendding* => rejected

   ```js
   new Promise((resolve, reject) => {
     resolve(10)
   })	// pendding => fulfilled	value值为10
   
   new Promise((resolve, reject) => {
     reject(10)
   })	// pendding => rejected		reason值为10
   
   new Promise((resolve, reject) => {
     throw new Error('error!')
   })	// pendding => rejected		reason为new Error('error!')
   
   new Promise((resolve, reject) => {
     throw 10
   })	// pendding => rejected		reason为10
   ```

2. #### 一个Promise指定多个成功/失败的回调函数，都会调用吗？

   每当promise改变为对应的状态都会调用对应的的回调函数，不管数量是多少

   ```js
   let p = new Promise((resolve, reject) => {
     resolve('成功')
   })
   
   p.then(value => {
     console.log(value)	// 成功
   })
   p.then(value => {
     console.log(value)	// 成功
   })
   
   console.log(p)
   ```

   ![image-20200502234500941](/assets/Promise.assets/image-20200502234500941.png)

   ```js
   let p = new Promise((resolve, reject) => {
     reject('失败')
   })
   
   p.catch(reason => {
     console.log(reason) // 失败
   })
   p.catch(reason => {
     console.log(reason) // 失败
   })
   
   console.log(p)
   ```

   ![image-20200502234652332](/assets/Promise.assets/image-20200502234652332.png)

3. #### 改变Promise状态和指定回调函数谁先谁后

   两者都有可能

   ```js
   // 改变Promise状态在前
   new Promise((resolve, reject) => {
     resolve('成功')	// 得到数据，并且改变状态，后绑定回调函数再执行
   }).then(value => {
     console.log(value)
   })
   
   // 回调函数在前
   new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve('成功')	// 先绑定回调函数，1秒后调用回调函数，得到数据
     }, 1000)
   }).then(value => {
     console.log(value)  // 因为有定时器，所以执行then时状态未改变
   })
   ```

4. #### Promise.then()返回的新promise的结果状态由什么决定

   （1）总结：由then()的所执行的回调函数决定

   （2）详解：

      1.    主promise抛出异常，执行onRejected()，reason值为异常原因，再根据下面两条判断

      2.    ##### ***then()的回调函数返回什么值，新promise(成功状态)的value值就为return的值***

      3.    ##### *then()的回调函数如果return一个Promise对象，那新promise就为return的这个promise*

            ```js
            /**
             *	1. 代码出现异常
             */
            new Promise((resolve, reject) => {
              throw 1
            }).then(
              value => {
                console.log('成功', value)
                return 2  // => promise.resolve(2)
              },
              reason => {
                console.log('失败', reason)
                return 3  // => promise.resolve(3)
              }
            ).then(
              value => {
                // 新Promise的状态为resolve，执行
                console.log('成功', value)
              },
              reason => {
                console.log('失败', reason)
              }
            )
            ```

            ![image-20200503195045070](/assets/Promise.assets/image-20200503195045070.png)

            ```js
            /**
             *	2. 主promise的状态改变
             */
            new Promise((resolve, reject) => {
              resolve(1)
            }).then(
              value => {
                console.log('成功', value)
                return 2  // => promise.resolve(2)
              },
              reason => {
                console.log('失败', reason)
                return 3  // => promise.resolve(3)
              }
            ).then(
              value => {
                // 新Promise的状态为resolve，执行
                console.log('成功', value)
              },
              reason => {
                console.log('失败', reason)
              }
            )
            ```

            ![image-20200503195017831](/assets/Promise.assets/image-20200503195017831.png)

            ```js
            /**
             *	3. return数值 和 return新Promise的区别
             */
            new Promise((resolve, reject) => {
              reject(1)
            }).then(
              value => {
                console.log('成功', value)
                return 2  // => promise.resolve(2)
              },
              reason => {
                console.log('失败', reason)
                return Promise.reject(3)
              }
            ).then(
              value => {
                console.log('成功', value)
              },
              reason => {
                // 新Promise的状态为reject，执行
                console.log('失败', reason)
              }
            )
            
            // 第二个then就是根据 13行的Promise状态 来决定调用哪个回调
            ```

            ![image-20200503195537312](/assets/Promise.assets/image-20200503195537312.png)

5. #### Promise如何串连多个操作任务？

   （1）promise对象上的then方法会返回新的promise对象，能够进行链式调用

   （2）通过then链式调用串连多个同步/异步任务

   - 错误的案例（直接在onResloved | onRejected中直接进行异步操作）

     ```js
     /**
      *	错误的链式调用（包含同步异步操作）
      *
      *	在onResloved | onRejected中直接进行异步操作时候，
      *  onResloved | onRejected会直接返回Promise.resolve(undefined)
      *	后续的.then的操作得到的值全部都是undefined，需要返回一个新的promise
      */
     new Promise((resolve, reject) => {
       console.log('执行同步任务1')
       resolve(1)
     }).then(
       value => {
         setTimeout(() => {
           console.log('执行异步任务2  得到任务1的值为', value)
           return 2
         }, 2000)
         // 这个onResolved的函数相当于直接返回了 Promise.resolve(undefined)
       }
     ).then(
       value => {
         console.log('执行同步任务3  得到任务2的值为', value)
       }
     )
     ```

     ![image-20200504000133104](/assets/Promise.assets/image-20200504000133104.png)

   - 使用Promise封装异步任务（链式调用中）

     ```js
     /**
      *	在链式调用中，一定要用Promise包装异步任务，
      * 	否则 onResloved | onRejected会直接返回Promise.resolve(undefined)
      */
     new Promise((resolve, reject) => {
       console.log('执行同步任务1')
       resolve(1)
     }).then(
       value => {
         return new Promise((resolve, reject) => {
           setTimeout(() => {
             console.log('执行异步任务2  得到任务1的值为', value)
             resolve(2)
           }, 2000)
         })
         // 返回包装异步任务的新Promise对象
       }
     ).then(
       value => {
         console.log('执行同步任务3  得到任务2的值为', value)
       }
     )
     ```

     ![image-20200504000356735](/assets/Promise.assets/image-20200504000356735.png)

6. #### Promise的异常传递

   （1）当使用then进行链式调用的时候，可以在链式结尾加上catch进行错误捕捉

   （2）只要promise中出现错误，并且没有被then(未定义)捕捉到，就会向下传递

   ```js
   new Promise((resolve, reject) => {
     throw 1
   }).then(
     value => {
       console.log(value)
     }
   ).then(
     value => {
       console.log(value)
     }
   ).then(
     value => {
       console.log(value)
     }
   ).catch(
     reason => {
       console.log(reason)	// => 1
     }
   )
   
   /**
    *	如果.then()函数中没有定义onResolve(), 默认定义 reason => {throw reason}
    */
   
   new Promise((resolve, reject) => {
     throw 1
   }).then(
     value => {
       console.log(value)
     },
     // 默认定义
     reason => {throw reason}
   ).then(
     value => {
       console.log(value)
     },
     // 默认定义
     reason => {throw reason}
   ).then(
     value => {
       console.log(value)
     },
     // 默认定义
     reason => {throw reason}
   ).catch(
     reason => {
       console.log(reason)	// => 1
     }
   )
   ```

7. 如何中断Promise链

   > 如何在Promise链式调用中，后续的链式调用？
   >
   > ​	 => 向后续的then传递pendding状态的Promise

   ```js
   new Promise((resolve, reject) => {
     resolve()
   }).then(
     value => {
       console.log('第一个then')
     }
   ).then(
     value => {
       console.log('第二个then')
       return new Promise(() => {})		
       // 新的Promise状态为pendding，后续的then里面的函数都不会执行
     }
   ).then(
     value => {
       console.log('阻止失败')
     },
     reason => {
       console.log('阻止失败')
     }
   )
   ```

## 6.手写Promise

### 整体架构

![image-20200504083131613](/assets/Promise.assets/image-20200504083131613.png)

### Es5的写法

```js
~(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  function Promise(executor) {
    this.state = PENDING
    this.data = null
    this.callbacks = []

    function resolve(value) {
      // Promise的状态只能改一次，所以只有pending状态时候才能执行resolve和reject
      // 当Promise的状态为resolved|rejected就不能再次改变状态了
      if (this.state !== PENDING) {
        return
      }

      this.state = RESOLVED
      this.data = value

      if (this.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      // Promise的状态只能改一次，所以只有pending状态时候才能执行resolve和reject
      // 当Promise的状态为resolved|rejected就不能再次改变状态了
      if (this.state !== PENDING) {
        return
      }

      this.state = REJECTED
      this.data = reason

      if (this.callbacks.length > 0) {
        setTimeout(() => {
          this.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        })
      }
    }

    try {
      executor(resolve.bind(this), reject.bind(this))
    } catch (e) {
      // 执行器抛出异常，Promise状态为失败，调用reject
      reject(e)
    }
  }

  Promise.prototype = {
    constructor: Promise,

    then(onResolved, onRejected) {
      // 指定默认的回调函数
      // 如果用户没有指定onRejected | onResolved 我们需要把值|异常穿透下去
      // 异常穿透的关键一步，内部会捕捉并返回一个状态失败的Promise
      onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw reason
      }
      onResolved = typeof onResolved === 'function' ? onResolved : value => value


      // 1. then中的回调函数发生异常，then返回失败的Promise，reason为异常
      // 2. then的回调函数运行，返回非Promise值，then返回成功的Promise，value为return的值
      // 3. then的回调函数运行，返回Promise，则then返回该promise
      const self = this

      return new Promise((resolve, reject) => {

        function handle(callback) {
          try {
            const result = callback(self.data)
            if (result instanceof Promise) {
              // 第3种情况，得到返回的promise值|原因，并改变返回的promise状态
              result.then(resolve, reject)
            } else {
              // 第2种情况 
              resolve(result)
            }
          } catch (e) {
            // 第1种情况 
            reject(e)
          }
        }

        if (self.state === PENDING) {
          // Promise状态为pending，先把回调函数放到队列里
          self.callbacks.push({
            onResolved() {
              handle(onResolved)
            },
            onRejected() {
              handle(onRejected)
            }
          })
        } else if (self.state === RESOLVED) {
          // Promise状态为resolved，异步执行回调函数，并通过handle改变return的Promise
          setTimeout(() => {
            handle(onResolved)
          })
        } else {
          // Promise状态为rejected，异步执行回调函数，并通过handle改变return的Promise
          setTimeout(() => {
            handle(onRejected)
          })
        }
      })
    },

    catch (onRejected) {
      // 第一个参数写null，内部会把value数据向下传递
      return this.then(null, onRejected)
    }
  }

  Promise.resolve = function (value) {
    // value 可以是Promise，也可以是值
    // Promise => 根据promise状态改变return的状态
    // 值 => 成功的Promise
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  Promise.all = function (iterable) {
    return new Promise((resolve, reject) => {
      const arr = new Array(iterable.length)
      const counter = 0
      iterable.forEach((p, index) => {
        // 如果iterable中有值不是promise，那么包装成promise
        Promise.resolve(p).then(
          value => {  // 执行onResolved几次，就成功几次
            // 这里不能用value代替counter，因为所有的操作都是异步的，不能确定谁先完成，如果最后一个先完成就会出问题
            arr[index] = value
            counter++
            counter === arr.length  ? resolve(arr) : null
          },
          reason => { // 只要有一个失败，整个promise失败
            reject(reason)
          }
        )
      })  
    })
  }
  
    Promise.all(iterable) {
    return new Promise((resolve, reject) => {
      let arr = []
      iterable.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {
            arr[index] = value
            if(arr.length === iterable.length) {
              resolve(arr)
            }
          } ,
          reason => {
            reject(reason)
          }
        )
      })
    })
  }
  
  Promise.race = function (iterable) {
    return new Promise((resolve, reject) => {
      iterable.forEach(p => {
        // 如果iterable中有值不是promise，那么包装成promise
        Promise.resolve(p).then(
          value => {
            // 先成功，先调用，后续的不再改变状态
            resolve(value)
          },
          reason => {
            // 先失败，先调用，后续的不再改变状态
            reject(reason)
          }
        )
      })
    })
  }

  // 自定义工具方法
  Promise.resolveDelay = function(value, time) {
    /**
     *  返回一个成功的Promise对象，它在指定时间后才能成功
     */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }, time)
    })
  }

  Promise.rejectDelay = function(reason, time) {
    /**
     *  返回一个Promise对象，它在指定时间后才能确定失败
     */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, time)
    })
  }


  window.Promise = Promise
})(window)
```

### Class写法

```js
~(function (window) {
  const PENDING = 'pending'
  const RESOLVED = 'resolved'
  const REJECTED = 'rejected'

  class Promise {
    constructor(executor) {
      this.state = PENDING
      this.data = null
      this.callbacks = []

      function resolve(value) {
        // Promise的状态只能改一次，所以只有pending状态时候才能执行resolve和reject
        // 当Promise的状态为resolved|rejected就不能再次改变状态了
        if (this.state !== PENDING) {
          return
        }

        this.state = RESOLVED
        this.data = value

        if (this.callbacks.length > 0) {
          setTimeout(() => {
            this.callbacks.forEach(callbacksObj => {
              callbacksObj.onResolved(value)
            })
          })
        }
      }

      function reject(reason) {
        // Promise的状态只能改一次，所以只有pending状态时候才能执行resolve和reject
        // 当Promise的状态为resolved|rejected就不能再次改变状态了
        if (this.state !== PENDING) {
          return
        }

        this.state = REJECTED
        this.data = reason

        if (this.callbacks.length > 0) {
          setTimeout(() => {
            this.callbacks.forEach(callbacksObj => {
              callbacksObj.onRejected(reason)
            })
          })
        }
      }

      try {
        executor(resolve.bind(this), reject.bind(this))
      } catch (e) {
        // 执行器抛出异常，Promise状态为失败，调用reject
        reject(e)
      }
    }

    then(onResolved, onRejected) {
      // 指定默认的回调函数
      // 如果用户没有指定onRejected | onResolved 我们需要把值|异常穿透下去
      // 异常穿透的关键一步，内部会捕捉并返回一个状态失败的Promise
      onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw reason
      }
      onResolved = typeof onResolved === 'function' ? onResolved : value => value


      // 1. then中的回调函数发生异常，then返回失败的Promise，reason为异常
      // 2. then的回调函数运行，返回非Promise值，then返回成功的Promise，value为return的值
      // 3. then的回调函数运行，返回Promise，则then返回该promise
      const self = this

      return new Promise((resolve, reject) => {

        function handle(callback) {
          try {
            const result = callback(self.data)
            if (result instanceof Promise) {
              // 第3种情况，得到返回的promise值|原因，并改变返回的promise状态
              result.then(resolve, reject)
            } else {
              // 第2种情况 
              resolve(result)
            }
          } catch (e) {
            // 第1种情况 
            reject(e)
          }
        }

        if (self.state === PENDING) {
          // Promise状态为pending，先把回调函数放到队列里
          self.callbacks.push({
            onResolved() {
              handle(onResolved)
            },
            onRejected() {
              handle(onRejected)
            }
          })
        } else if (self.state === RESOLVED) {
          // Promise状态为resolved，异步执行回调函数，并通过handle改变return的Promise
          setTimeout(() => {
            handle(onResolved)
          })
        } else {
          // Promise状态为rejected，异步执行回调函数，并通过handle改变return的Promise
          setTimeout(() => {
            handle(onRejected)
          })
        }
      })
    }

    catch (onRejected) {
      // 第一个参数写null，内部会把value数据向下传递
      return this.then(null, onRejected)
    }

    static resolve(value) {
      // value 可以是Promise，也可以是值
      // Promise => 根据promise状态改变return的状态
      // 值 => 成功的Promise
      return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      })
    }

    static reject(reason){
      return new Promise((resolve, reject) => {
        reject(reason)
      })
    }
    static all(iterable){
      return new Promise((resolve, reject) => {
        const arr = new Array(iterable.length)
        const counter = 0
        iterable.forEach((p, index) => {
          // 如果iterable中有值不是promise，那么包装成promise
          Promise.resolve(p).then(
            value => {  // 执行onResolved几次，就成功几次
              // 这里不能用value代替counter，因为所有的操作都是异步的，不能确定谁先完成，如果最后一个先完成就会出问题
              arr[index] = value
              counter++
              counter === arr.length -1  ? resolve(arr) : null
            },
            reason => { // 只要有一个失败，整个promise失败
              reject(reason)
            }
          )
        })  
      })
    }
    static race(iterable) {
      return new Promise((resolve, reject) => {
        iterable.forEach(p => {
          // 如果iterable中有值不是promise，那么包装成promise
          Promise.resolve(p).then(
            value => {
              // 先成功，先调用，后续的不再改变状态
              resolve(value)
            },
            reason => {
              // 先失败，先调用，后续的不再改变状态
              reject(reason)
            }
          )
        })
      })
    }
    static resolveDelay(value, time) {
      /**
       *  返回一个成功的Promise对象，它在指定时间后才能成功
       */
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value instanceof Promise) {
            value.then(resolve, reject)
          } else {
            resolve(value)
          }
        }, time)
      })
    }
    static rejectDelay(reason, time) {
      /**
       *  返回一个Promise对象，它在指定时间后才能确定失败
       */
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(reason)
        }, time)
      })
    }
  }

  window.Promise = Promise
})(window)
```

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class Promise {

  constructor(executor) {
    this.state = PENDING
    this.data = null;
    this.callbacks = []

    let resolve = value => {
      if(this.state !== PENDING) {
        return
      }
      this.state = RESOLVED
      this.data = value
      if(this.callbacks.length) {
        process.nextTick(() => {
          this.callbacks.forEach(item => {
            item.onResolved(this.data)
          })
        })
      }
    }

    let reject = reason => {
      if(this.state !== PENDING) {
        return
      }
      this.state = REJECTED
      this.data = reason
      if(this.callbacks.length) {
        process.nextTick(() => {
          this.callbacks.forEach(item => {
            item.onRejected(this.data)
          })
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

  then(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

    return new Promise((resolve, reject) => {
      let handle = callback => {
        try {
          const result = callback(this.data)
          if(result instanceof Promise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch(e) {
          reject(e)
        }
      }

      if(this.state === PENDING) {
        this.callbacks.push({
          onResolved() {
            handle(onResolved)
          }, 
          onRejected() {
            handle(onRejected)
          }
        })
      } else if(this.state === RESOLVED) {
        process.nextTick(() => {
          handle(onResolved)
        })
      } else {
        process.nextTick(() => {
          handle(onRejected)
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      if(value instanceof Promise) {
        value.then(resolve, reject)
      } else {
        resolve(value)
      }
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      if(reason instanceof Promise) {
        reason.then(reject, reject)
      } else {
        reject(reason)
      }
    })
  }

  static all(iterable) {
    return new Promise((resolve, reject) => {
      const  arry = []
      iterable.forEach((p, index) => {
        Promise.resolve(p).then(
          value => {
            arry[index] = value
            if(arry.length === iterable.length) {
              resolve(arry)
            }
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }
}

module.exports = Promise
```

### PromiseA+

```js
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function Promise(executor) {
  this.status = PENDING
  this.onResolvedCallback = []
  this.onRejectedCallback = []

  this.callbacks = []

  const resolve = value => {
    // 如果执行器函数中的 resolve 中传入的是一个 Promise
    if (value instanceof Promise) return value.then(resolve, reject)

    setTimeout(() => {
      // 如果promise的状态已经改变了
      if (this.status !== PENDING) return
      this.status = RESOLVED
      this.data = value
      if (this.callbacks.length) {
        this.callbacks.forEach(item => {
          item.onResolved()
        })
      }
    })
  }

  const reject = reason => {
    // reject不需要对reason是Promise进行处理
    // if (reason instanceof Promise) { reason.then(reject, reject);return}

    setTimeout(() => { // 异步执行所有的回调函数
      if (this.status !== PENDING) return
      this.status = REJECTED
      this.data = reason
      if (this.callbacks.length) {
        this.callbacks.forEach(item => {
          item.onRejected()
        })
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  var self = this
  var promise2
  onResolved = typeof onResolved === 'function' ? onResolved : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  }

  function resolvePromise(promise2, x, resolve, reject) {
    var then
    var thenCalledOrThrow = false
    if (promise2 === x) {
      // 防止循环调用
      /**
       * let p = new Promise((r, r) => {r(1)}).then(value=> {return p})
       */
      return reject(new TypeError('Chaining cycle detected for promise!'))
    }
    if (x instanceof Promise) {
      // onResolved或者onRejected的返回值是一个Promise对象
      if (x.status === PENDING) {
        // 如果这个promise还是pending状态，调用then方法
        // 如果一个promise失败了，不用管到底返回了什么
        // promise成功了要对返回值进行详细处理
        x.then(function (v) {
          resolvePromise(promise2, v, resolve, reject)
        }, reject)
      } else {
        x.then(resolve, reject)
      }
      return
    }
    if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
      /**
       * 如果不是promise，而是实现thenable接口的对象
       */
      try {
        then = x.then
        if (typeof then === 'function') {
          // 如果是鸭子类型，实现了thenable方法的对象
          then.call(x, function rs(y) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return resolvePromise(promise2, y, resolve, reject)
          }, function rj(r) {
            if (thenCalledOrThrow) return
            thenCalledOrThrow = true
            return reject(r)
          })
        } else {
          resolve(x)
        }
      } catch (e) {
        if (thenCalledOrThrow) return
        thenCalledOrThrow = true
        return reject(e)
      }
    } else {
      // onResolved返回值是一个Promise对象
      resolve(x)
    }
  }

  return promise2 = new Promise((resolve, reject) => {

    let handle = callback => {
      setTimeout(() => {
        try {
          var x = callback(this.data) // 得到返回值
          // promise2是then返回的Promise，x为onResolved|onRejected返回的值
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }

    if (self.status === PENDING) {
      // 当then的时候，state为pending，把回调函数绑定到当前promise上，等到状态更新resolve和reject会调用
      this.callbacks.push({
        onResolved() {
          handle(onResolved)
        },
        onRejected() {
          handle(onRejected)
        }
      })
    } else if (self.status === RESOLVED) {
      // then的时候，state为resolved，执行onResolved
      handle(onResolved)
    } else {
      // then的时候，state为rejected，执行onRejected
      handle(onRejected)
    }
  })

}
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}
```



### 测试代码

```
// then测试
new Promise
```



## 7.async与await

### async

- return 的返回值为 Promise

- Promise对象的结果由async函数执行的返回值决定

#### 语法

```js
// 定义async函数
async function name([参数1, 参数2...]) { 
  函数体 
}
```

#### 描述

使用async定义函数，函数内部可以使用await关键字，并且该异步函数会返回一个Promise

- 状态为 resolved => return普通值 | 成功的Promise
- 状态为 rejected => 函数内部错误 | 失败的Promise

#### 实例

```js
// return普通值	=> 成功的Promise
async function fn1() {
  return 1
}

let res = fn1()
console.log(res)
```

![image-20200511230554804](/assets/Promise.assets/image-20200511230554804.png)

```js
// return成功的Promise	=> 成功的Promise
async function fn2() {
  return Promise.resolve(2)
}

fn2().then(value => {
  console.log(value)
})
```

![image-20200511232016546](/assets/Promise.assets/image-20200511232016546.png)

```js
// 函数内部错误	=> 失败的Promisejs
async function fn3() {
  throw 3
}

fn3().catch(e => {
  console.log(e)
})
```

![image-20200511232242732](/assets/Promise.assets/image-20200511232242732.png)

```js
// return失败的Promise	=> 失败的Promise
async function fn4() {
  return Promise.reject(4)
}

fn4().then(
  () => {},
  reason => {console.log(reason)}
)
```

![image-20200511232623277](/assets/Promise.assets/image-20200511232623277.png)



### await

- 必须在 `async Function` 内部使用
- await 右侧的值为 
  1. Promise（返回值为Promise成功的值 | 失败只能用try..catch捕捉） 
  2. value（返回值为该value）

#### 语法

```js
[return_value] = await expression;
```

#### 参数

- 表达式

  一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 对象或者任何要等待的值。

- 返回值

   返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身。

   如果右侧Promise为失败，那么只能用 try...catch 捕捉 | catch方法捕捉

#### 实例

```js
// 右侧为 成功的Promise
async function f1() {
  console.log(1)
  const res = await Promise.resolve(3)
  console.log(res)
}

f1()
console.log(2)
```

![image-20200511233729010](/assets/Promise.assets/image-20200511233729010.png)

```js
// 右侧为 失败的Promise
async function f1() {
  console.log(1)
  try {
    const res = await Promise.reject(3)
  } catch(reason) {
    console.log(reason)
  }
}

f1()
console.log(2)

// 右侧为 失败的Promise
async function f1() {
  console.log(1)
  const res = await Promise.reject(3).catch((reason) => {
    console.log(reason)
  })
}

f1()
console.log(2)
```

![image-20200511233729010](/assets/Promise.assets/image-20200511233729010.png)

```js
// 右侧为 值
async function f1() {
  console.log(1)
  const res = await 3
  console.log(res)
}

f1()
console.log(2)
```

![image-20200511233729010](/assets/Promise.assets/image-20200511233729010.png)

### 注意

await必须写在async函数中，但async函数中可以没有await

如果await的Promise失败了，就会抛出异常，需要通过try...catch来捕获捕获处

## 8.JS宏队列微队列

宏队列微队列图解

![image-20200512193537812](/assets/Promise.assets/image-20200512193537812.png)

1. JS中用来储存待执行回调函数的队列包含2个不同特定的队列（宏队列 | 微队列）

2. 宏队列：用来保存待执行的宏任务（回调），比如：定时器回调/DOM时间回调/ajax回调

3. 微队列：用来保存待执行的微任务（回调），比如：Promise回调/MutaiionObserver回调

4. JS执行时会区别这两个队列：

   （1）JS引擎首先必须先执行所有主线程中的代码

   （2）每次准备取出一个宏任务执行前，**都要将所有的微任务一个一个个取出来执行**

   ```js
   // 1
   setTimeout(() => {  // 立即放入宏队列
     console.log('setTimeout()1')
   })
   
   Promise.resolve('Promise()3').then(
     value => {  // 立即放入微队列
       console.log(value)
     }
   )
   
   setTimeout(() => {  //  立即放入宏队列
     console.log('setTimeout()3')
   })
   
   Promise.resolve('Promise()4').then(
     value => {  // 立即放入微队列
       console.log(value)
     }
   )
   
   // 2
   setTimeout(() => {  // 立即放入宏队列
     Promise.resolve('Promise()1').then(
     value => {  // 立即放入微队列
       console.log(value)
     }
   )
   })
   
   setTimeout(() => {  //  立即放入宏队列
     console.log('setTimeout()3')
   })
   
   // 每次准备取出一个宏任务执行前，**都要将所有的微任务一个一个个取出来执行**
   // Promise()1 
   // setTimeout()3
   ```

   ![image-20200512194201234](/assets/Promise.assets/image-20200512194201234.png)

