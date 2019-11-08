<template>
    <div class="g-slides" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
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
            lastSelectedIndex:undefined,
            timerId:undefined
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
                this.$emit('update:selected',this.names[n]) //更新之后 计算属性才会更新
            },
            onMouseEnter(){
                this.pause()
            },
            onMouseLeave(){
                this.playAutomatically()
            },
            playAutomatically(){
                if(this.timerId){return}
                let run = () => {
                    let index = this.names.indexOf(this.getSelected())
                    let newIndex = index-1
                    if(newIndex === -1){newIndex = this.names.length -1 }
                    if(newIndex === this.names.length){ newIndex = 0 }
                    this.select(newIndex)
                    this.timerId = setTimeout(run,3000)
                }
                this.timerId = setTimeout(run,3000)
            },
            pause(){
                window.clearTimeout(this.timerId)
                this.timerId = undefined
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