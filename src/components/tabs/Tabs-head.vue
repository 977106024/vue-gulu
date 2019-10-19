<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:'guluTabsHead'
    }
</script>

<style lang="scss" scoped>
    $tabs-height:40px;
    .tabs-head{
        height: $tabs-height;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid red;
        .actions{
            margin-left: auto;
        }
    }
</style>