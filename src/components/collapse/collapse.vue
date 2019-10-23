<template>
    <div class="collapse">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "guluCollapse",
        data:()=>({
            eventBus:new Vue()
        }),
        provide:function(){
            return {
                eventBus: this.eventBus
            }
        }
    }
</script>

<style lang="scss" scoped>
    .collapse{
        border:1px solid #ddd;
        border-radius: 5px;
    }
</style>