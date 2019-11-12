class Validator {
    constructor(){}

    static add (name,fn){
        Validator.prototype[name] = fn
    }

    validate(data,rules){
        let errors = {}
        rules.forEach((rule)=>{
            let value = data[rule.key]
            if(rule.required){
                let error = this.required(value)
                if(error){
                    ensureObject(errors,rule.key)
                    errors[rule.key].required = error
                    return
                }
            }

            //找到key 用key来调用所有函数
            let validators = Object.keys(rule).filter(key => key !== 'key' && key !== 'required') //有哪些key就调用哪些函数
            validators.forEach(validatorKey=>{
                if(this[validatorKey]){
                    let error = this[validatorKey](value,rule)
                    if(error){
                        ensureObject(errors,rule.key)
                        errors[rule.key][validatorKey] = error
                    }
                }else{
                    throw `不存在的校验器${validatorKey}`
                }
            })
        })
        console.log(errors,this)
        return errors
    }
    required (value) {
        if(value || value === 0){
            return '未填写'
        }
    }

    pattern (value,rule){
        if(rule.pattern.test(value) === false){
            return '格式不正确'
        }
    }

    minLength(value,rule){
        if(value.length < rule.minLength){
            return '太短'
        }
    }

    maxLength (value,rule) {
        if(value.length > rule.maxLength){
            return '太长'
        }
    }
}


function ensureObject(obj,key){
    if(typeof obj[key] !== 'object'){
        obj[key] = {}
    }
}

export default Validator