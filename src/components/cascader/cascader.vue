<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            <slot></slot>
        </div>
        <div class="popover" v-if="popoverVisible">
            <cascader-item :items="source" :height="popoverHeight" :selected="selected" @update:selected="onUpdateSelected"></cascader-item>
        </div>
    </div>
</template>

<script>
    import cascaderItem from './cascader-item'
    export default {
        name: "cascader",
        components:{cascaderItem},
        props:{
            source:Array,
            popoverHeight:String,
            selected:{
                type:Array,
                default:()=>[]
            }
        },
        data:()=>({
            popoverVisible:false,
        }),
        methods:{
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../var';
    .cascader{
        position:relative;
        .trigger{
            width: 250px;
            height: 32px;
            border: 1px solid red;
        }
        .popover{
            display: flex;
            position:absolute;
            top: 100%;
            left: 0;
            background: white;
            @extend .box-shadow;
        }
    }
</style>