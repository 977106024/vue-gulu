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
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    // import GButton from './components/Button'

    export default {
        name: 'app',
        data:()=>({
           loading:false,
        }),
        components: {
            // GButton
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
