<template>
    <div class="g-table">
        <table>
            <tr>
                <th v-for="item in columns">{{item.title}}</th>
            </tr>
            <tr v-for="item in data">
                <td>{{item.name}}</td>
                <td>{{item.age}}</td>
                <td>{{item.address}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "guluTable",
        props:{
            columns:{
                type:Array,
                require:true
            },
            data:{
                type:Array,
                require: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-table{
        table{
            width: 100%;
            text-align: left;
            border: 1px solid #ccc;
            tr{
                /*border: 1px solid #ccc;*/
                &:nth-child(even){
                    background: #eee;
                }
            }
        }
    }
</style>