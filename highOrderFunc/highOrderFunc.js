// 高阶函数 “2个特点满足一个就是高阶函数 1） 我们给一个函数传入一个函数  回调 2. 一个函数返回一个函数”

// 装饰器模式  （对原本的功能进行包装）  切片编程

Function.prototype.before =function (beforeFun){
    return (...arg) =>{
        beforeFun();
        this(...args);//箭头函数使 this 指向被调用者 也就是 xxx.before
    }
}
function core (){
    console.log('core')
}
let newFF=core.before(()=>{
    console.log('core before')
})