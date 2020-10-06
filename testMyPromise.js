const Promise = require('./promiseRealize') 
console.log('script start')

let p = new Promise((resolve, reject) => {
//    throw new Error('11111111')
    // reject('失败了');
    setTimeout(()=>{
        reject('失败了');
        // resolve('hello')

    },2000)

});
p.then((data) => { // 成功的回调
    console.log('success', data)
}, (reason) => { // 失败的回调
    console.log('fail', reason)
})
p.then((data) => { // 成功的回调
    console.log('success', data)
}, (reason) => { // 失败的回调
    console.log('fail', reason)
})
// console.log(2);
// promise 的链式调用问题
// 1.如果then 方法中 成功或者失败 返回的不是一个promise会将这个值传递非外城下一次的then 的成功结果
// 2.如果 执行的then 方法中的方法出了错  抛出异常  就会走到下一个的失败中
// 3. 如果返回的是一个promise 会用这个promise的结果作为下一次then 的成功或者失败

// ?? 什么情况当前then走完了会走到下一个的失败中去 ？
// 1。出错会走到失败   2.返回的promise 出错

//错误处理 采用就近原则,到最近的一个 reject 方法中 或者catch 中
// catch 没有返回值  但是catch 可以继续往后面then走 结果返回到下一个then的成功里面去
// catch 相当于一个then 的别名 只传了成功没传失败的处理
// then 方法为什么可以链式调用， 每次调用then 返回的都是一个新的promise