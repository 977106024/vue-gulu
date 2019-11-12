<template>
    <div class="g-nav" :class="{vertical}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "guluNav",
        provide(){
            return {
                root: this,
                vertical:this.vertical
            }
        },
        props:{
            selected:{
                type:String,
            },
            vertical:{
                type:Boolean,
                default:false
            }
        },
        data:()=>({
            items:[],
            namePath:[]
        }),
        mounted() {
            console.log(this.items);
            this.updateChildren()
            this.listenToChildren()
        },
        updated(){
           this.updateChildren()
        },
        methods:{
            addItem(vm){
                this.items.push(vm)
            },
            updateChildren(){
                this.items.forEach(vm=>{
                    if(this.selected === vm.name){
                        vm.selected = true
                    }else{
                        vm.selected = false
                    }
                })
            },
            listenToChildren(){
                this.items.forEach(vm=>{
                    vm.$on('update:selected',(name)=>{
                        this.$emit('update:selected',name)
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-nav{
        display:flex;
        border-bottom: 1px solid #ccc;
        user-select: none;
        &.vertical{
            flex-direction: column;
            border: 1px solid #ccc;
         }
    }
</style>