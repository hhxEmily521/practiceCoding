const {
    resolve
} = require("path");
const {
    rejects
} = require("assert");

const STATUS = {
    PENDING: 'PENDING',
    FUFILLED: 'FUFILLED',
    REJECTED: 'REDECTED'
}
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING;
        this.val = undefined;
        this.resason = undefined;
        this.onResolveCallBacks = [] //存放成功的回调函数
        this.onRejectCallBacks = [] //存放失败的回调函数

        const resolve = (val) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FUFILLED;
                this.val = val;
                //发布
                this.onResolveCallBacks.forEach(fn => fn());
            }
        }
        const reject = (resaon) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.REJECTED;
                this.resason = resaon;
                //发布
                this.onRejectCallBacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => { //new Promise 中传入的executor 会立即执行。   用 Promise 包一层 返回一个 promise 实现链式调用
            if (this.status == STATUS.FUFILLED) {
                try {
                    let x = onFufilled(this.value);
                    resolve(x)
                } catch (error) {
                    reject(error)
                }

            }
            if (this.status == STATUS.REJECTED) {
                try {
                    let x = onRejected(this.resaon)
                    resolve(x) //这里是resolve的原因是因为  如果返回的只要不是 promise  我们都将结果返回到下一个 then中的成功回调里面去
                } catch (error) { // 只有 执行的过程中出错了才走到下一个then的 错误reject或者catch中去
                    reject(error)
                }
            }
            if (this.status === STATUS.PENDING) {
                //切片编程
                //订阅
                this.onResolveCallBacks.push(() => {
                    try {
                        let x = onFulfilled(this.val)
                        resolve(x)
                    } catch (error) {
                        reject(error)
                    }
                })
                //订阅
                this.onRejectCallBacks.push(() => { //再套用一层是为了 可以除了传入的 回调函数外 可以 再加一些其他的逻辑
                    try {
                        let x = onRejected(this.resason)
                        resolve(x)
                    } catch (error) {
                        reject(error)
                    }

                })
            }
        })


        return promise2;
    }
}
module.exports = Promise;