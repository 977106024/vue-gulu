<template>
    <div class="cascader">
        <slot></slot>
        <div class="popover">
            <div v-for="item in source">
                <cascader-item :sourceItem="item"></cascader-item>
            </div>
        </div>
    </div>
</template>

<script>
    import cascaderItem from './cascader-item'
    export default {
        name: "cascader",
        components:{cascaderItem},
        props:{
            source:Array
        }
    }
</script>

<style scoped>
    .cascader{

    }
</style>