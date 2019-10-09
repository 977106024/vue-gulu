<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <g-button icon="set" :loading="loading" icon-position="down" @click="loading = !loading">
            按钮
        </g-button>
        <g-icon name="download"></g-icon>

        <button-group>
            <g-button icon="left">上一页</g-button>
        <g-button>更多</g-button>
            <g-button icon="right" icon-position="right">下一页</g-button>
        </button-group>
        <section style="margin-top: 20px">
            <g-input value="1111" disabled/>
            <g-input value="1111" readonly/>
            <g-input value="1111" error="1111" v-model="testModel"/>
            <p>{{testModel}}</p>
            <button @click="testModel++">++</button>
        </section>
        <section>
            <g-row>
                <g-col>1</g-col>
                <g-col>2</g-col>
            </g-row>
            <g-row>
                <g-col>1</g-col>
                <g-col>2</g-col>
                <g-col>3</g-col>
                <g-col>4</g-col>
            </g-row>
            <g-row>
                <g-col>1</g-col>
                <g-col>2</g-col>
                <g-col>3</g-col>
                <g-col>4</g-col>
                <g-col>5</g-col>
                <g-col>6</g-col>
            </g-row>
            <g-row>
                <g-col span="2">2</g-col>
                <g-col span="22">22</g-col>
            </g-row>
        </section>
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
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
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
</style>
