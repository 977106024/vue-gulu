<template>
    <div class="g-slides">
        <div class="g-slides-window">
            <div class="g-slides-wrap">
                <slot></slot>
            </div>
        </div>
        <div class="g-slides-dots">
            <span v-for="n in childrenLength" :class="{active:n-1 === selectedIndex}" @click="select(n-1)">{{n}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            selected:String,
            autoPlay:{
                type:Boolean,
                default:true
            }
        },
        data:()=>({
           childrenLength:0,
            lastSelectedIndex:undefined
        }),
        mounted() {
            this.updateChildren()
            this.playAutomatically()
            this.childrenLength = this.$children.length
        },
        updated(){
            this.updateChildren()
        },
        computed:{
          selectedIndex(){
              return this.names.indexOf(this.getSelected())
          },
          names(){
              return this.$children.map(vm=>vm.name)
          }
        },
        methods:{
            select(n){
                this.lastSelectedIndex = this.selectedIndex //$emit更新前 保存上次的值index
                console.log( this.lastSelectedIndex,'没更新的值')
                this.$emit('update:selected',this.names[n]) //更新之后 计算属性才会更新
            },
            playAutomatically(){
                let index = this.names.indexOf(this.getSelected())
                let run = () => {
                    let newIndex = index-1
                    if(newIndex === -1){newIndex = this.names.length -1 }
                    if(newIndex === this.names.length){ newIndex = 0 }
                    this.$emit('update:selected',this.names[newIndex])
                    setTimeout(run,3000)
                }
                // setTimeout(run,3000)
            },
            getSelected(){
                let first = this.$children[0]
                return this.selected || first.name
            },
            updateChildren(){
                let selected = this.getSelected()
                this.$children.forEach(vm=>{
                    vm.reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
                    this.$nextTick(()=>{
                        vm.visible = selected === vm.name
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-slides{
        border:2px solid green;
        &-window{
            overflow: hidden;
        }
        &-wrap{
           position: relative;
        }
        .g-slides-dots{
            >span{
                &.active{
                    color: red;
                }
            }
        }
    }
</style>