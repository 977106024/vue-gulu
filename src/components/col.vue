<template>
    <div class="col" :class="colClass" :style="colStyle">
        <div class="wrap">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    //props检查
    let validator = (value) => {
        let keys = Object.keys(value)//对象的key
        let valid = true
        keys.forEach((key)=>{
            if(['span','offset'].includes(key)){ //对象的key是不是这个数组的其中之一
                valid = false
            }
        })
        return valid
    }
    export default {
        name:'guluCol',
        props:{
            span:[Number,String],
            offset:{
                type:[Number,String]
            },
            ipad:{
                type:Object,
                validator
            },
            narrowPc:{
                type:Object,
                validator
            },
            pc:{
                type:Object,
                validator
            },
            widePc:{
                type:Object,
                validator
            },
        },
        data:(vm)=>({
            gutter:0,
        }),
        computed:{
            colClass(){
                let {span,offset,ipad,narrowPc,pc,widePc} = this
                let phoneClass = []
                return [
                    span &&  `col-${span}`, //布局
                    offset && `offset-${offset}`, //设置边距
                    ipad && [`col-ipad-${ipad.span}`],
                    narrowPc && [`col-narrow-pc-${narrowPc.span}`],
                    pc && [`col-pc-${pc.span}`],
                    widePc && [`col-wide-pc-${widePc.span}`],
                ]
            },
            colStyle () { //所有元素间隙
                return {
                    paddingLeft:this.gutter/2 + 'px',
                    paddingRight:this.gutter/2 + 'px'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col{
        height: 100px;
        .wrap{
            height: 100px;
            border: 1px solid #ccc;
        }
    }

    /*col宽度*/
    @for $i from 1 through 24
    {
        .col-#{$i}
        {
            width:($i/24) * 100%;
        }
    }

    @for $i from 1 through 24
    {
        .offset-#{$i}
        {
             margin-left:($i/24) * 100%;
        }
    }


    @media (min-width:568px) and (max-width:768px) {
        @for $i from 1 through 24
        {
            .col-ipad-#{$i}
            {
                width:($i/24) * 100%;
            }
        }

        @for $i from 1 through 24
        {
            .offset-ipad-#{$i}
            {
                margin-left:($i/24) * 100%;
            }
        }
    }

    @media (min-width:769px) and (max-width:992px) {
        @for $i from 1 through 24
        {
            .col-narrow-pc-#{$i}
            {
                width:($i/24) * 100%;
            }
        }

        @for $i from 1 through 24
        {
            .offset-narrow-pc-#{$i}
            {
                margin-left:($i/24) * 100%;
            }
        }
    }


    @media (min-width:993px) and (max-width:1200px) {
        @for $i from 1 through 24
        {
            .col-pc-#{$i}
            {
                width:($i/24) * 100%;
            }
        }

        @for $i from 1 through 24
        {
            .offset-pc-#{$i}
            {
                margin-left:($i/24) * 100%;
            }
        }
    }

    @media (min-width:1201px) {
        @for $i from 1 through 24
        {
            .col-wide-pc-#{$i}
            {
                width:($i/24) * 100%;
            }
        }

        @for $i from 1 through 24
        {
            .offset-wide-pc-#{$i}
            {
                margin-left:($i/24) * 100%;
            }
        }
    }
</style>