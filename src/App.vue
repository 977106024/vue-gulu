<template>
    <div id="app">
<!--        nav-->
        <g-nav :selected.sync="selectedNav">
            <g-nav-item name="home">首页</g-nav-item>
            <g-nav-item name="about">关于</g-nav-item>
            <g-nav-item name="hire">招聘</g-nav-item>
        </g-nav>

<!--        滚轮-->
        <pd-select-box style="position: fixed;bottom: 0;width: 100%">
            <pd-select-item ref="month" :listData="listData" v-model="month"></pd-select-item>
            <pd-select-item ref="day" :listData="listData2" type="cycle" v-model="day"></pd-select-item>
        </pd-select-box>
<!--        slider-->
        <g-slider :selected.sync="slideSelected">
            <g-slider-item name="你好">
                <div class="box">1</div>
            </g-slider-item>
            <g-slider-item name="小月">
                <div class="box">2</div>
            </g-slider-item>
            <g-slider-item name="柏宏">
                <div class="box">3</div>
            </g-slider-item>
        </g-slider>



<!--        <cascader-->
        <p>1234445</p>
        <g-cascader :source.sync="source" popover-height="300px" :selected.sync="selected2" :load-data="loadData"></g-cascader>
        <p>1212121212</p>
        <g-cascader :source.sync="source" popover-height="300px" :selected.sync="selected2" :load-data="loadData"></g-cascader>
<!--        <p>{{source}}</p>-->
        <!--        手风琴-->
<!--        <g-collapse single :selected.sync="selected">-->
<!--            <g-collapse-item title="ahong" name="1">帅哥</g-collapse-item>-->
<!--            <g-collapse-item title="ahong" name="2">帅哥</g-collapse-item>-->
<!--            <g-collapse-item title="ahong" name="3">帅哥</g-collapse-item>-->
<!--        </g-collapse>-->
<!--        <p>{{selected}}</p>-->
<!--        popover-->
<!--        <g-popover position="left">-->
<!--            <template slot="content" slot-scope="{close}">-->
<!--                <div>哈哈加斯哈哈对话框哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈</div>-->
<!--                <button @click="close">关闭</button>-->
<!--            </template>-->
<!--            <g-button>点我</g-button>-->
<!--        </g-popover>-->
<!--        <g-popover>-->
<!--            <template slot="content">-->
<!--                <div>sadsadasdsadasdsaljkdsajkdlkasjdlsajdklajsdkljaskdljakldjalks</div>-->
<!--            </template>-->
<!--            <g-button>点我</g-button>-->
<!--        </g-popover>-->
<!--        <g-popover position="bottom">-->
<!--            <template slot="content">-->
<!--                <div>sadsadasdsadasdsaljkdsajkdlkasjdlsajdklajsdkljaskdljakldjalks</div>-->
<!--            </template>-->
<!--            <g-button>点我</g-button>-->
<!--        </g-popover>-->
<!--        <g-popover position="right">-->
<!--            <template slot="content">-->
<!--                <div>sadsadasdsadasdsaljkdsajkdlkasjdlsajdklajsdkljaskdljakldjalks</div>-->
<!--            </template>-->
<!--            <g-button>点我</g-button>-->
<!--        </g-popover>-->

<!--        <g-popover position="left" trigger="hover">-->
<!--            <template slot="content">-->
<!--                <div>哈哈加斯哈哈对话框哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈</div>-->
<!--            </template>-->
<!--            <g-button>点我</g-button>-->
<!--        </g-popover>-->
<!--        <g-popover trigger="hover">-->
<!--            <template slot="content">-->
<!--                <div>sadsadasdsadasdsaljkdsajkdlkasjdlsajdklajsdkljaskdljakldjalks</div>-->
<!--            </template>-->
<!--            <g-button>点我</g-button>-->
<!--        </g-popover>-->
<!--        <g-popover position="bottom" trigger="hover">-->
<!--            <template slot="content">-->
<!--                <div>sadsadasdsadasdsaljkdsajkdlkasjdlsajdklajsdkljaskdljakldjalks</div>-->
<!--            </template>-->
<!--            <g-button>点我</g-button>-->
<!--        </g-popover>-->
<!--        <g-popover position="right" trigger="hover">-->
<!--            <template slot="content">-->
<!--                <div>sadsadasdsadasdsaljkdsajkdlkasjdlsajdklajsdkljaskdljakldjalks</div>-->
<!--            </template>-->
<!--            <g-button>点我</g-button>-->
<!--        </g-popover>-->

<!--            tabs-->
<!--        <g-tabs :selected.sync="selectedTab">-->
<!--            <g-tabs-head>-->
<!--                <template slot="actions">-->
<!--                    <button>add</button>-->
<!--                </template>-->
<!--                <g-tabs-item name="tab1" disabled>-->
<!--                    <g-icon name="set"></g-icon>-->
<!--                    资讯-->
<!--                </g-tabs-item>-->
<!--                <g-tabs-item name="tab2">头条</g-tabs-item>-->
<!--                <g-tabs-item name="tab3">热点</g-tabs-item>-->
<!--            </g-tabs-head>-->
<!--            <g-tabs-body>-->
<!--                <g-tabs-pane name="tab1">资讯</g-tabs-pane>-->
<!--                <g-tabs-pane name="tab2">头条</g-tabs-pane>-->
<!--                <g-tabs-pane name="tab3">热点</g-tabs-pane>-->
<!--            </g-tabs-body>-->
<!--        </g-tabs>-->

<!--        <button @click="showToast1">top</button>-->
<!--        <button @click="showToast2">middle</button>-->
<!--        <button @click="showToast3">bottom</button>-->
<!--                <g-layout style="height: 100vh;">-->
<!--                    <g-sider class="demo1">sider</g-sider>-->
<!--                    <g-layout>-->
<!--                        <g-header class="demo1">header</g-header>-->
<!--                        <g-content class="demo1">content</g-content>-->
<!--                        <g-footer class="demo1">footer</g-footer>-->
<!--                    </g-layout>-->
<!--                </g-layout>-->
<!--            <g-row>-->
<!--                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">-->
<!--                    <div class="demo"></div>-->
<!--                </g-col>-->
<!--                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">-->
<!--                    <div class="demo"></div>-->
<!--                </g-col>-->
<!--                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">-->
<!--                    <div class="demo"></div>-->
<!--                </g-col>-->
<!--                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">-->
<!--                    <div class="demo"></div>-->
<!--                </g-col>-->
<!--                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">-->
<!--                    <div class="demo"></div>-->
<!--                </g-col>-->
<!--                <g-col  span="24" :ipad="{span:12}" :narrow-pc="{span:8}">-->
<!--                    <div class="demo"></div>-->
<!--                </g-col>-->
<!--            </g-row>-->
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
    import db from '@/assets/db'

    //模拟数据加载
    function ajax(parentId=0){
        return new Promise((success,fail)=>{
            let result = db.filter(item => item.parent_id == parentId) //filter总是返回数组
            result.forEach(node =>{
                let children = db.filter(item=>item.parent_id === node.id) //根据数据结构来看 id === parent_id有的话 就说明有children
                if(children.length > 0){
                    node.isLeaf = false //然后children里面还有值 就是没到叶子
                }else{
                    node.isLeaf = true
                }
            })
            setTimeout(()=>{
                success(result)
            },2000)
        })
    }

    const dd = [{
        name:'湖北',
        children:[
            {name:'武汉',
                children:[
                    {name:'武昌区'},
                    {name:'洪山区'},
                    {name:'硚口区'}
                ]},
            {name:'咸宁',
                children:[
                    {name:'温泉'},
                    {name:'咸安'}
                ]},
            {name:'仙桃'}
        ]
    },
        {
            name:'浙江',
            children:[
                {
                    name:'杭州',
                },
                {
                    name:'宁波'
                }
            ]
        },
        {
            name:'北京'
        }
    ]

    export default {
        name: 'app',
        components: {
            // GButton
        },
        data:()=>({
           loading:false,
            testModel:'1',
            selectedTab:'tab1',
            selected:['1','2'],
            selected2:[],
            source:[],
            slideSelected:undefined,
            selectedNav:['home'],

            listData: Array.from({length: 12}, (value, index) => 1 + index),
            listData2: Array.from({length: 30}, (value, index) => 'customValue' + index),
            month: 100,
            day: 'customValue15'
        }),
        created(){
            ajax(0).then(res=>{
                this.source = res
                console.log(res)
            })
            // this.source = dd
            // let n = 1
            // setInterval(()=>{
            //     this.slideSelected = n.toString()
            //     n++
            //     if(n>3){
            //         n = 1
            //     }
            // },3000)
        },
        mounted(){
            setTimeout(()=>{
                //验证 model 联动
                this.after()
            },3000)
        },
        methods:{
            after () {
                this.day = 'customValue0'
                this.$refs.day.init()
            },
            inputChange(e,value){
                console.log(1,e,value);
            },
            showToast1(){
                this.clickToast('top')
            },
            showToast2(){
                this.clickToast('middle')
            },
            showToast3(){
                this.clickToast('bottom')
            },
            clickToast(position){
                this.$toast('s<p>事实上是是是是是是</p><a href="qq.com">沙雕</a>',{
                    closeButton: {
                        text:'知道了',
                        callback(toast){
                            toast.log() //调用toast组件内部方法
                            console.log('好的，知道了！')
                        }
                    },
                    position,
                    enableHtml:false,
                    autoClose:3, //false是关闭 传数字是autoCloseDelay
                    // autoCloseDelay: 55
                })
            },
            xxx(){
                ajax(this.selected2[0].id).then(res=>{
                        let selectedObj = this.source.filter(item => item.id === this.selected2[0].id)[0] //找出选择的对象
                        this.$set(selectedObj,'children',res) //把res设置成选中项的children
                })
            },
            //动态加载数据
            loadData({id},callback){
                ajax(id).then(res=>{
                    callback(res)
                })
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
        margin-left: 80px;
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
    .demo1{
        min-height: 100px;
        border: 1px solid #ccc;
    }
    .sider{
        width: 250px;
        background: #42b983;
    }
    .header{
        background: #2c3e50;
    }
    .footer{
        background: #2c3e50;
    }
    .box{
        width: 100%;
        height: 150px;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
