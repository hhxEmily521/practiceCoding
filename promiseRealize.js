const STATUS={
    PENDING:'PENDING',
    FUFILLED:'FUFILLED',
    REJECTED:'REDECTED'
}
class Promise {
    constructor(executor) {
        this.status=STATUS.PENDING;
        this.val=undefined;
        this.resason=undefined;
        this.onResolveCallBacks=[] //存放成功的回调函数
        this.onRejectCallBacks=[]//存放失败的回调函数

        const resolve = (val) => {
            if(this.status===STATUS.PENDING){
                this.status=STATUS.FUFILLED;
                this.val=val;
                this.onResolveCallBacks.forEach(fn=>fn());
            }
        }
        const reject=(resaon)=>{
            if(this.status===STATUS.PENDING){
                this.status=STATUS.REJECTED;
                this.resason=resaon;
                this.onRejectCallBacks.forEach(fn=>fn());
            }
        }
        try{
            executor(resolve,reject);
        }catch(e){
            reject(e)
        }
    }
    then(onFufilled,onRejected){
        if(this.status==STATUS.FUFILLED){
            onFufilled(this.value);
        }
        if(this.resaon==STATUS.REJECTED){
            onRejected(this.resaon)
        }
        if(this.status===STATUS.PENDING){
            //切片编程
            this.onResolveCallBacks.push(()=>{
                onFufilled(this.val)
            })
            this.onRejectCallBacks.push(()=>{
                onRejected(this.resason)
            })
        }
    }
}
module.exports= Promise;