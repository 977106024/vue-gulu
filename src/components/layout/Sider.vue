<template>
    <transition name="sider">
        <div class="sider" v-show="isShow">
            <slot></slot>
            <button @click="isShow = false">close</button>
        </div>
    </transition>
</template>
<script>
    export default{
        name:'guluSider',
        data:()=>({
            isShow:true
        })
    }
</script>

<style>
    .sider{

    }

    .sider-enter-active, .sider-leave-active {
        transition: opacity .5s;
    }
    .sider-enter, .sider-leave-to  {
        margin-left: -250px;
    }
</style>