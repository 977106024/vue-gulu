<template>
    <div class="g-upload">
        <div @click="onClickUpload">
            <slot></slot>
        </div>
        <slot name="tips"></slot>
        <div class="temp" ref="temp"></div>
<!--        <img :src="imgUrl" alt="">-->

        <ol>
            <li v-for="(file,index) in fileList" :key="file.name">
                <template v-if="file.status=== 'uploading' ">
                    菊花
                </template>
                <img :src="file.imgUrl" width="150px" height="150px" alt="">
                {{file.name}}
                <button @click="onRemoveFile(index)">删除</button>
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
            onRemoveFile(index){
                let answer = window.confirm('你确定要删除这张图片吗？')
                if(answer){
                    let copy = [...this.fileList]
                    copy.splice(index,1) //这里和老师写的不一样 老师都是用indexOf(file)
                    this.$emit('update:fileList',copy)
                }
            },
            onClickUpload(){
                let input = this.createInput()
                input.addEventListener('change',()=>{
                    this.updateFile(input.files[0])
                    input.remove()
                })
                input.click()
            },
            beforeUploadFile(rawFile,newName){
                let {name,size,type} = rawFile
                this.$emit('update:fileList',[...this.fileList,{name:newName,size,type,status:'uploading'}])
            },
            updateFile(rawFile){
                let {name,size,type} = rawFile
                let newName = this.generateName(name)
                this.beforeUploadFile(rawFile,newName)
                //upadteFile
                let formData = new FormData()
                formData.append(this.name,rawFile)
                this.doUpdateFile(formData,(response)=>{
                    let imgUrl = this.parseResponse(response) //用户给我可预览的url
                    this.imgUrl = imgUrl
                    this.afterUploadFile(rawFile,newName,imgUrl)
                })
            },
            afterUploadFile(rawFile,newName,imgUrl){
                let {name,size,type} = rawFile
                let file = this.fileList.filter(f=>f.name === newName)[0] //file是props中拿出来的 props 要深拷贝
                let index = this.fileList.indexOf(file)
                let fileCopy = JSON.parse(JSON.stringify(file))
                fileCopy.imgUrl = imgUrl
                fileCopy.status = 'success'
                let fileListCopy = [...this.fileList]
                fileListCopy.splice(index,1,fileCopy)
                this.$emit('update:fileList',fileListCopy)
            },
            generateName(name){
                while(this.fileList.filter(f=>f.name === name).length > 0){
                    let dotIndex = name.lastIndex('.')
                    let first = name.substring(0,dotIndex)
                    let last = name.substring(dotIndex)
                    name = first + '(1)' + last
                }
                return name
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