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