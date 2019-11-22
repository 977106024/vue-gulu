<template>
    <div class="g-upload">
        <div @click="onClickUpload">
            <slot></slot>
        </div>
        <slot name="tips"></slot>
        <div class="temp" ref="temp"></div>
<!--        <img :src="imgUrl" alt="">-->

        <ol>
            <li v-for="file in fileList" :key="file.name">
                <img :src="file.imgUrl" width="150px" height="150px" alt="">
                {{file.name}}
            </li>
        </ol>
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
            },
            fileList:{
              type:Array,
              default:()=>[]
            }
        },
        data:()=>({
            imgUrl:''
        }),
        methods:{
            onClickUpload(){
                let input = this.createInput()
                input.addEventListener('change',()=>{
                    let file = input.files[0]
                    input.remove()
                    this.updateFile(file)
                })
                input.click()
            },
            updateFile(file){
                //upadteFile
                let formData = new FormData()
                formData.append(this.name,file)
                let {name,size,type} = file
                this.doUpdateFile(formData,(response)=>{
                    let imgUrl = this.parseResponse(response) //用户给我可预览的url
                    this.imgUrl = imgUrl
                    while(this.fileList.filter(f=>f.name === name).length > 0){
                        let dotIndex = name.lastIndex('.')
                        let first = name.substring(0,dotIndex)
                        let last = name.substring(dotIndex)
                        name = first + '(1)' + last
                    }
                    this.$emit('update:fileList',[...this.fileList,{name,size,type,imgUrl}])
                })
            },
            doUpdateFile(formData,success){
                let xhr = new XMLHttpRequest()
                xhr.open(this.method,this.action)
                xhr.onload = () => {
                    success(xhr.response)
                }
                xhr.send(formData)
            },
            createInput(){
                //create input
                let input = document.createElement('input')
                input.type = 'file'
                this.$refs.temp.appendChild(input)
                return input
            },
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