<template>
    <div id="g-input" :class="{error}">
        <input ref="input" type="text" :value="value" :disabled="disabled" :readonly="readonly"
               @change="$emit('change')"
               @input="$emit('input',$event.target.value)"
               @focus="$emit('focus')"
               @blur="$emit('blur')"
        >
        <template v-if="error">
            <g-icon name="set"></g-icon>
            <span>{{error}}</span>
        </template>
    </div>
</template>

<script>
    export default {
        props:{
            value:String,
            disabled:{
                type:Boolean,
                default:false
            },
            readonly:{
                type:Boolean,
                default:false
            },
            error:{
                type:String
            }
        },
        methods:{
            setRawValue(value){
                this.$refs.input.value = value
            }
        }
    }
</script>

<style lang="scss" scoped>
    $height:32px;
    $border-color:#999;
    $border-color-hover:#666;
    $border-radius:4px;
    $font-size:12px;
    $box-shadow-color:rgba(0,0,0,.5);
    #g-input{
        font-size: $font-size;
        >input{
            height: $height;
            border: 1px solid $border-color;
            border-radius: $border-radius;
            padding:0 8px;
            font-size: inherit;
            &:hover{
                border-color: $border-color-hover;
            }
            &:focus{
                outline: none;
                box-shadow: inset 0 1px 3px $box-shadow-color;
            }
            &[disabled],&[readonly]{
                border-color: #bbb;
                color: #bbb;
                cursor: not-allowed;
            }
        }
        &.error{
            >input{
                border-color: palevioletred;
            }
        }
    }
</style>