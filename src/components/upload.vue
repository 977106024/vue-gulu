<template>
    <div class="g-upload">
        <div @click="onClickUpload">
            <slot></slot>
        </div>
        <slot name="tips"></slot>
        <div class="temp" ref="temp"></div>
        <img :src="imgUrl" alt="">
    </div>
</template>

<script>
    export default {
        name: "guluUpload",
        props:{
          name:{
              type:String,
              require:true
          },
            action:{
                type:String,
                require: true
            },
            method:{
                type:String,
                default:'POST'
            },
            parseResponse:{
              type:Function,
              require:true
            }
        },
        data:()=>({
            imgUrl:''
        }),
        methods:{
            onClickUpload(){
                let input = document.createElement('input')
                input.type = 'file'
                this.$refs.temp.appendChild(input)
                input.addEventListener('change',()=>{
                    let file = input.files[0]
                    input.remove()
                    let formData = new FormData()
                    formData.append(this.name,file)
                    console.log(formData)

                    let xhr = new XMLHttpRequest()
                    xhr.open(this.method,this.action)
                    xhr.onload = () => {
                        this.imgUrl = this.parseResponse(xhr.response)
                    }
                    xhr.send(formData)
                })
                input.click()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-upload{
       .temp{
           width: 0;
           height: 0;
           overflow: hidden;
       }
    }
</style>