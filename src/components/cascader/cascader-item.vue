<template>
    <div class="cascader-item">
        {{sourceItem.name}}
        <cascader-item v-if="sourceItem.children" v-for="item in sourceItem.children" :source-item="item"></cascader-item>
    </div>
</template>

<script>
    export default {
        name:'cascaderItem',
        props:{
            sourceItem:Object
        }
    }
</script>

<style lang="scss" scoped>
    .cascader-item{
        border: 1px solid green;
        margin: 10px;
    }
</style>