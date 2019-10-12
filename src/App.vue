<template>
    <div id="app">
            <g-row>
                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
                    <div class="demo"></div>
                </g-col>
                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
                    <div class="demo"></div>
                </g-col>
                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
                    <div class="demo"></div>
                </g-col>
                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
                    <div class="demo"></div>
                </g-col>
                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
                    <div class="demo"></div>
                </g-col>
                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">
                    <div class="demo"></div>
                </g-col>
            </g-row>
<!--        <g-row class="topbat">-->
<!--            <g-col span="24"-->
<!--                   :ipad="{span:8}"-->

<!--                   :pc="{span:2}"-->
<!--                   :wide-pc="{span:1}"-->
<!--                   class="demoBox">-->
<!--                <g-row ailgn="center">-->
<!--                    <g-col>1</g-col>-->
<!--                    <g-col>2</g-col>-->
<!--                    <g-col>3</g-col>-->
<!--                </g-row>-->
<!--            </g-col>-->
<!--            <g-col span="24"-->
<!--                   :ipad="{span:16}"-->

<!--                   :pc="{span:22}"-->
<!--                   :wide-pc="{span:23}"-->
<!--                   class="demoBox">-->
<!--                <g-row ailgn="right">-->
<!--                    <g-col>1</g-col>-->
<!--                    <g-col>2</g-col>-->
<!--                    <g-col>3</g-col>-->
<!--                    <g-col>1</g-col>-->
<!--                    <g-col>2</g-col>-->
<!--                    <g-col>3</g-col>-->
<!--                </g-row>-->
<!--            </g-col>-->
<!--        </g-row>-->
<!--        <g-row class="">-->
<!--            <g-col span="4" class="demoBox"></g-col>-->
<!--            <g-col span="14" class="demoBox"></g-col>-->
<!--            <g-col span="6" class="demoBox"></g-col>-->
<!--        </g-row>-->
<!--        <img alt="Vue logo" src="./assets/logo.png">-->
<!--        &lt;!&ndash;    <HelloWorld msg="Welcome to Your Vue.js App"/>&ndash;&gt;-->
<!--        <g-button icon="set" :loading="loading" icon-position="down" @click="loading = !loading">-->
<!--            按钮-->
<!--        </g-button>-->
<!--        <g-icon name="download"></g-icon>-->

<!--        <button-group>-->
<!--            <g-button icon="left">上一页</g-button>-->
<!--        <g-button>更多</g-button>-->
<!--            <g-button icon="right" icon-position="right">下一页</g-button>-->
<!--        </button-group>-->
<!--        <section style="margin-top: 20px">-->
<!--            <g-input value="1111" disabled/>-->
<!--            <g-input value="1111" readonly/>-->
<!--            <g-input value="1111" error="1111" v-model="testModel"/>-->
<!--            <p>{{testModel}}</p>-->
<!--            <button @click="testModel++">++</button>-->
<!--        </section>-->
<!--        <section style="border:1px solid #000">-->
<!--            <g-row>-->
<!--                <g-col>1</g-col>-->
<!--                <g-col>2</g-col>-->
<!--            </g-row>-->
<!--            <g-row gutter="20">-->
<!--                <g-col>1</g-col>-->
<!--                <g-col>2</g-col>-->
<!--                <g-col>3</g-col>-->
<!--                <g-col>4</g-col>-->
<!--            </g-row>-->
<!--            <g-row>-->
<!--                <g-col>1</g-col>-->
<!--                <g-col>2</g-col>-->
<!--                <g-col>3</g-col>-->
<!--                <g-col>4</g-col>-->
<!--                <g-col>5</g-col>-->
<!--                <g-col>6</g-col>-->
<!--            </g-row>-->
<!--            <g-row>-->
<!--                <g-col span="2">2</g-col>-->
<!--                <g-col span="20" offset="2">22</g-col>-->
<!--            </g-row>-->
<!--            <g-row gutter="20">-->
<!--                <g-col span="2">2</g-col>-->
<!--                <g-col span="20" offset="2">22</g-col>-->
<!--            </g-row>-->
<!--        </section>-->
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    // import GButton from './components/Button'

    export default {
        name: 'app',
        components: {
            // GButton
        },
        data:()=>({
           loading:false,
            testModel:'1'
        }),
        methods:{
            inputChange(e,value){
                console.log(1,e,value);
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        margin-top: 60px;
        padding: 50px;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    :root {
        --button-height: 32px;
        --font-size: 14px;
        --button-bg: white;
        --button-active-bg: #eee;
        --border-radius: 4px;
        --color: #333;
        --border-color: #999;
        --border-color-hover: #666;
    }
    .demoBox{
        height: 55px;
        background: #42b983;
        border: 1px solid red;
    }
    .demo{
        background: #ccc;
        border: 1px solid #666;
        height: 100px;
    }
</style>
