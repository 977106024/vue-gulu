<template>
    <div id="app">
<!--        scroll-->
        <g-scroll style="height: 300px;overflow: hidden">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
            <p>13</p>
            <p>14</p>
            <p>15</p>
            <p>16</p>
            <p>17</p>
            <p>18</p>
            <p>19</p>
            <p>20</p>
            <p>21</p>
            <p>22</p>
            <p>23</p>
            <p>24</p>
            <p>25</p>
            <p>26</p>
            <p>27</p>
            <p>28</p>
            <p>29</p>
            <p>30</p>
            <p>31</p>
            <p>32</p>
            <p>33</p>
            <p>34</p>
            <p>35</p>
            <p>36</p>
            <p>37</p>
            <p>38</p>
            <p>39</p>
            <p>40</p>
            <p>41</p>
            <p>42</p>
            <p>43</p>
            <p>44</p>
            <p>45</p>
            <p>46</p>
            <p>47</p>
            <p>48</p>
            <p>49</p>
            <p>50</p>
            <p>51</p>
            <p>52</p>
            <p>53</p>
            <p>54</p>
            <p>55</p>
            <p>56</p>
            <p>57</p>
            <p>58</p>
            <p>59</p>
            <p>60</p>
            <p>61</p>
            <p>62</p>
            <p>63</p>
            <p>64</p>
            <p>65</p>
            <p>66</p>
            <p>67</p>
            <p>68</p>
            <p>69</p>
            <p>70</p>
            <p>71</p>
            <p>72</p>
            <p>73</p>
            <p>74</p>
            <p>75</p>
            <p>76</p>
            <p>77</p>
            <p>78</p>
            <p>79</p>
            <p>80</p>
            <p>81</p>
            <p>82</p>
            <p>83</p>
            <p>84</p>
            <p>85</p>
            <p>86</p>
            <p>87</p>
            <p>88</p>
            <p>89</p>
            <p>90</p>
            <p>91</p>
            <p>92</p>
            <p>93</p>
            <p>94</p>
            <p>95</p>
            <p>96</p>
            <p>97</p>
            <p>98</p>
            <p>99</p>
            <p>100</p>
        </g-scroll>

<!--        日历-->
        <g-date-picker :value.sync="dateValue" :scoped="[new Date(1950,1),new Date(2019,6)]"></g-date-picker>

<!--        sticky-->
        <p>这是一段话</p>
        <p>这是一段话</p>
        <p>这是一段话</p>
        <p>这是一段话</p>
        <p>这是一段话</p>
        <p>这是一段话</p>
        <g-sticky :distance="100">
            <p>吸附在顶上的内容</p>
        </g-sticky>
        <p>这是一段话</p>
        <p>这是一段话</p>
        <p>这是一段话</p>
        <p>这是一段话</p>
        <p>这是一段话</p>
        <p>这是一段话</p>
        <p>这是一段话</p>

<!--        图片上传-->
        <div>只能上传 300kb 以内的 png、jpeg 文件</div>
        <g-upload accept="image/*" method="POST" action="https://upload-serve.herokuapp.com/upload" name="file"
        :parse-response="parseResponse" :file-list.sync="fileList"
        @error="errorAlert" :size-limit="1024*1024">
            <g-button>上传</g-button>
        </g-upload>
        <g-button>保存</g-button>





<!--        table-->
        {{tableChecked}}
        <g-table :data="tableData" :selected-items.sync="tableChecked" :orderBy.sync="orderBy" @update:orderBy="loadData"
                 :loading="loading" :height="400" bordered expend-key="description" :checkable="true">
            <template slot-scope="td">
                <button @click="edit(td.item)">编辑</button>
                <button @click="view(td.item)">查看</button>
            </template>
            <g-table-column title="姓名" field="name" width="100">
                <template slot-scope="props">
                    <a href="#">{{props.value}}</a>
                </template>
            </g-table-column>
            <g-table-column title="年龄" field="age" width="100"></g-table-column>

        </g-table>
<!--        pager-->
        <g-pager :total-page="10" :current-page.sync="currentPage" :hide-if-one-page="false" style="margin-bottom: 50px"></g-pager>
<!--        nav-->
        <g-nav :selected.sync="selectedNav" @update:selected="onChange" vertical style="width:200px">
            <g-nav-item name="home">首页</g-nav-item>
            <g-sub-nav name="about">
                <template slot="title">关于</template>
                <g-nav-item name="about1">企业文化</g-nav-item>
                <g-nav-item name="about2">开发团队</g-nav-item>
                <g-sub-nav name="tel">
                    <template slot="title">联系电话</template>
                    <g-nav-item name="wechat">微信</g-nav-item>
                    <g-nav-item name="qq">qq</g-nav-item>
                    <g-sub-nav name="ccc">
                        <template slot="title">手机</template>
                        <g-nav-item name="yidong">移动</g-nav-item>
                        <g-nav-item name="liantong">联通</g-nav-item>
                        <g-nav-item name="dianxin">电信</g-nav-item>
                    </g-sub-nav>
                </g-sub-nav>
            </g-sub-nav>
            <g-nav-item name="hire">招聘</g-nav-item>
        </g-nav>

<!--        滚轮-->
<!--        <pd-select-box style="position: fixed;bottom: 0;width: 100%">-->
<!--            <pd-select-item ref="month" :listData="listData" v-model="month"></pd-select-item>-->
<!--            <pd-select-item ref="day" :listData="listData2" type="cycle" v-model="day"></pd-select-item>-->
<!--        </pd-select-box>-->
<!--&lt;!&ndash;        slider&ndash;&gt;-->
<!--        <g-slider :selected.sync="slideSelected">-->
<!--            <g-slider-item name="你好">-->
<!--                <div class="box">1</div>-->
<!--            </g-slider-item>-->
<!--            <g-slider-item name="小月">-->
<!--                <div class="box">2</div>-->
<!--            </g-slider-item>-->
<!--            <g-slider-item name="柏宏">-->
<!--                <div class="box">3</div>-->
<!--            </g-slider-item>-->
<!--        </g-slider>-->



<!--        <cascader-->
<!--        <p>1234445</p>-->
<!--        <g-cascader :source.sync="source" popover-height="300px" :selected.sync="selected2" :load-data="loadData"></g-cascader>-->
<!--        <p>1212121212</p>-->
<!--        <g-cascader :source.sync="source" popover-height="300px" :selected.sync="selected2" :load-data="loadData"></g-cascader>-->
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
    // import db from '@/assets/db'

    //模拟数据加载
    // function ajax(parentId=0){
    //     return new Promise((success,fail)=>{
    //         let result = db.filter(item => item.parent_id == parentId) //filter总是返回数组
    //         result.forEach(node =>{
    //             let children = db.filter(item=>item.parent_id === node.id) //根据数据结构来看 id === parent_id有的话 就说明有children
    //             if(children.length > 0){
    //                 node.isLeaf = false //然后children里面还有值 就是没到叶子
    //             }else{
    //                 node.isLeaf = true
    //             }
    //         })
    //         setTimeout(()=>{
    //             success(result)
    //         },2000)
    //     })
    // }

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
            selectedNav:'home',

            listData: Array.from({length: 12}, (value, index) => 1 + index),
            listData2: Array.from({length: 30}, (value, index) => 'customValue' + index),
            month: 100,
            day: 'customValue15',

            currentPage:1,

            tableData:[
                {
                    id: '1',
                    name: '胡彦斌',
                    age: 3,
                    address: '西湖区湖底公园1号',
                    description:'1233444444'
                },{
                    id: '2',
                    name: '胡彦祖',
                    age: 42,
                    address: '西湖区湖底公园1号',
                    description:'描述撒撒大多'
                },{
                    id: '3',
                    name: '胡彦祖',
                    age: 42,
                    address: '西湖区湖底公园1号',
                },{
                    id: '4',
                    name: '胡彦祖',
                    age: 55,
                    address: '西湖区湖底公园1号',
                },{
                    id: '5',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '6',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '7',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '8',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '9',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '10',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '11',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '12',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '13',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '14',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },{
                    id: '15',
                    name: '胡彦祖',
                    age: 46,
                    address: '西湖区湖底公园1号',
                },
            ],
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                    width:100
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                    width:100
                },
                {
                    title: '住址',
                    dataIndex: 'address',
                    key: 'address',
                },
            ],
            tableChecked:[],
            orderBy:{
               name:true, age:'asc'
            },

            //upload
            fileList:[],

            dateValue:new Date(2019,6)
        }),
        created(){
            // ajax(0).then(res=>{
            //     this.source = res
            //     console.log(res)
            // })
            this.source = dd
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
            // setTimeout(()=>{
            //     //验证 model 联动
            //     this.after()
            // },3000)
        },
        methods:{
            errorAlert(msg){
              alert(msg)
            },
            parseResponse(response){
                let obj = JSON.parse(response)
                let url = `https://upload-serve.herokuapp.com/preview/${obj.id}`
                return url
            },
            edit(val){
                alert(`编辑${val.id}`)
            },
            view(val){
                alert(`查看${val.id}`)
            },
            loadData(){
                console.log('请求排序数据')
                this.loading = true
                setTimeout(()=>{
                    this.tableData = this.tableData.map(item=>item).sort((a,b)=>a.age-b.age)
                    this.loading = false
                },3000)
            },
            onChangeCheck({selected,index,val}){
                if(selected){
                    this.tableChecked.push(val)
                }else{
                    let valIndex = this.tableChecked.indexOf(val)
                    this.tableChecked.splice(valIndex,1)
                }
            },
            onChange(selected){
                console.log(selected)
            },
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
            // xxx(){
            //     ajax(this.selected2[0].id).then(res=>{
            //             let selectedObj = this.source.filter(item => item.id === this.selected2[0].id)[0] //找出选择的对象
            //             this.$set(selectedObj,'children',res) //把res设置成选中项的children
            //     })
            // },
            //动态加载数据
            // loadData({id},callback){
            //     ajax(id).then(res=>{
            //         callback(res)
            //     })
            // }
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
