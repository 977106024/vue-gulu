<template>
    <div class="tab-item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'guluTabsItem',
        props:{
            disabled:{
                type:Boolean,
                default:false
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>