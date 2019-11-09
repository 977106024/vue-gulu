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
                type:Array,
                default:() => []
            },
            multiple:{
                type:Boolean,
                default:false
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
                    if(this.selected.indexOf(vm.name) >= 0){
                        vm.selected = true
                    }else{
                        vm.selected = false
                    }
                })
            },
            listenToChildren(){
                this.items.forEach(vm=>{
                    vm.$on('add:selected',(name)=>{
                        if(this.multiple){
                            if(this.selected.indexOf(name) < 0){
                                let copy = JSON.parse(JSON.stringify(this.selected))
                                copy.push(name)
                                this.$emit('update:selected',copy)
                            }
                        }else{
                            this.$emit('update:selected',[name])
                        }

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