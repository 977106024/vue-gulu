<template>
    <div class="col" :class="`col-${span}`">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'guluCol',
        props:{
            span:[Number,String]
        }
    }
</script>

<style lang="scss" scoped>
    .col{
        width: 50%;
        height: 100px;
        border: 1px solid #ccc;
    }

    @for $i from 1 through 24
    {
        .col-#{$i}
        {
            width:($i/24) * 100%;
        }
    }

</style>