<template>
    <svg class="icon" aria-hidden="true" @click="$emit('click')">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
    export default{
        props:['name']
    }
</script>

<style lang="scss" scoped>
    .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>