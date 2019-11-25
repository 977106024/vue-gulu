<template>
    <div class="g-upload">
        <div @click="onClickUpload">
            <slot></slot>
        </div>
        <ol class="g-upload-file">
            <li v-for="(file,index) in fileList" :key="file.name">
                <template v-if="file.status=== 'uploading' ">
                    菊花
                </template>
                <template v-if="file.type.indexOf('image') === 0">
                    <img :src="file.imgUrl" width="150px" height="150px" alt="">
                </template>
                <template v-else>
                    <div></div>
                </template>
                <span class="g-upload-name" :class="{[file.status]:file.status}">{{file.name}}</span>
                <button @click="onRemoveFile(index)">删除</button>
            </li>
        </ol>
        <div class="temp" ref="temp"></div>
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
            },
            sizeLimit:{
              type:Number,
                default:2 * 1024 * 1024
            }
        },
        data:()=>({
            imgUrl:'',
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
            onClickUpload(){ //1.点击上传
                let input = this.createInput()//2.创建input
                input.addEventListener('change',()=>{//3.监听input change事件
                    this.updateFiles(input.files) //4.上传文件
                    input.remove() //5.删除input
                })
                input.click() //触发input点击
            },
            beforeUploadFiles(rawFiles,newNames){
                rawFiles = Array.from(rawFiles)
                for(let i=0;i<rawFiles.length;i++){
                    let {name,size,type} = rawFiles[i]
                    if(size > this.sizeLimit){ //默认是b 然后是kb m
                        this.$emit('error','文件过大')
                        return false
                    }
                }
                let x = rawFiles.map((rawFil,i)=>{ //把多个file合并起来更新给父组件
                    let {size,type} = rawFil
                    return {name:newNames[i],size,type,status:'uploading'}
                })
                this.$emit('update:fileList',[...this.fileList,...x])
                return true
            },
            updateFiles(rawFiles){
                let newNames = []
                for(let i=0;i<rawFiles.length;i++){ //取到多文件的name
                    let rawFile = rawFiles[i]
                    let {name,size,type} = rawFile
                    let newName = this.generateName(name)
                    newNames = newName[i]
                }

                if(!this.beforeUploadFiles(rawFiles,newNames))return //上传之前

                for(let i=0;i<rawFiles.length;i++){ //每个文件依次调用上传
                    let rawFile = rawFiles[i]
                    let newName = newNames[i]
                    let formData = new FormData()
                    formData.append(this.name,rawFile)
                    this.doUpdateFile(formData,(response)=>{ //调用接口上传
                        let imgUrl = this.parseResponse(response) //用户给我可预览的url
                        this.imgUrl = imgUrl
                        this.afterUploadFile(newName,imgUrl) //上传成功
                    },(xhr)=>{
                        this.uploadError(newName,xhr) //上传失败
                    })
                }
            },
            afterUploadFile(newName,imgUrl){
                let file = this.fileList.filter(f=>f.name === newName)[0] //file是props中拿出来的 props 要深拷贝
                let index = this.fileList.indexOf(file)
                let fileCopy = JSON.parse(JSON.stringify(file))
                fileCopy.imgUrl = imgUrl
                fileCopy.status = 'success'
                let fileListCopy = [...this.fileList]
                fileListCopy.splice(index,1,fileCopy)
                this.$emit('update:fileList',fileListCopy)
            },
            uploadError(newName,xhr){
                let file = this.fileList.filter(f=>f.name === newName)[0]
                let index = this.fileList.indexOf(file)
                let fileCopy = JSON.parse(JSON.stringify(file))
                fileCopy.status = 'fail'
                // fileCopy.failMessage = '尺寸过大'
                let fileListCopy = [...this.fileList]
                fileListCopy.splice(index,1,fileCopy)
                this.$emit('update:fileList',fileListCopy)
                let message
                if(xhr.status === 0){
                    message = '网络无法连接'
                }
                this.$emit('error',message)
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
            doUpdateFile(formData,success,fail){
                let xhr = new XMLHttpRequest()
                xhr.open(this.method,this.action)
                xhr.onload = () => {
                    success(xhr.response)
                }
                xhr.onerror = () => {
                    fail(xhr)
                }
                xhr.send(formData)
            },
            createInput(){
                this.$refs.temp.innerHTML = ''
                //create input
                let input = document.createElement('input')
                input.type = 'file'
                input.multiple = true //实际开发 改成props 让用户传
                input.accept = 'image/*' //实际开发 改成props 让用户传
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
        &-name{
            &.success{
                background: yellowgreen;
            }
            &.fail{
                background: red;
            }
        }
    }
</style>