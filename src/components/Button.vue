<template>
    <div>
        <button class="g-button">
            <slot></slot>
        </button>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    .g-button{
        font-size: var(--font-size);
        height: var(--button-height);
    }
</style>