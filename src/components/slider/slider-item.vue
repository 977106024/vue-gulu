<template>
    <transition name="slide">
        <div class="g-slides-item" v-if="visible">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default{
        props:{
          name:{
              type:String,
              require:true
          },
        },
        data:()=>({
            visible:false
        })
    }
</script>

<style lang="scss" scoped>
    .g-slides-item{

    }
    .slide-leave-active{
        position:absolute;
        top: 0;
        left: 0;
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 1s;
    }
    .slide-enter{
        transform:translateX(100%);
    }
    .slide-leave-to{
        transform:translateX(-100%);
    }
</style>