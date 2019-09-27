<template>
    <div>
        <button class="g-button" :class="{[`icon-${iconPosition}`]:true}">
            <div class="icon" v-if="icon">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="`#i-${icon}`"></use>
                </svg>
            </div>

            <div class="content">
                <slot></slot>
            </div>
        </button>
    </div>
</template>

<script>
    export default {
        props:['icon','iconPosition']
    }
</script>

<style lang="scss" scoped>
    .g-button {
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        background: var(--button-bg);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        &:hover {
            border-color: var(--border-color-hover);
        }
        &:active {
            background-color: var(--button-active-bg);
        }
        &:focus {
            outline: none;
        }
        >.icon{
            order: 1;
            margin-right: .1em;
        }
        >.content{
            order: 2;
        }
        &.icon-right{
            &>.icon{
                order: 2;
                margin-right: 0;
                margin-left: .1em;
            }
            &>.content{
                order: 1;
            }
        }
    }
</style>