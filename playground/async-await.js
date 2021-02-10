const add = (a,b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if(a < 0 || b < 0){
                return reject('please dont input any negative numbers')
            }
            resolve(a+b)
        }, 2000);
    })
}

const doWork = async()=>{
    const result = await add(-1, 99)
    return result
}

doWork().then((result)=>{
    console.log(result)
}).catch((reject)=>{
    console.log(reject)
})

console.log('test')