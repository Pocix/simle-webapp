<template>
    <div class="layout-header">
        <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
        </i-button>
    </div>
</template>
<style scoped>
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
</style>
