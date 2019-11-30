<template>
    <div class="g-table-column">

    </div>
</template>

<script>
    export default {
        name: "guluTableColumn",
        props:{
            title:{
                type:String,
                require:true
            },
            field:{
                type:String,
                require:true
            },
            width:{
                type:Number
            }
    }
    }
</script>
