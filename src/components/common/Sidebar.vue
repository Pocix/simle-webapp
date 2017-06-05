<template>
        <Menu active-name="1" theme="dark" width="auto">
            <div class="layout-logo-left"></div>
            <Menu-item name="1" to="vuetable">
                <Icon type="ios-navigate" :size="iconSize"></Icon>
                <span class="layout-text" >选项 1</span>
            </Menu-item>
            <Menu-item name="2">
                <Icon type="ios-keypad" :size="iconSize"></Icon>
                <span class="layout-text">选项 2</span>
            </Menu-item>
            <Menu-item name="3">
                <Icon type="ios-analytics" :size="iconSize"></Icon>
                <span class="layout-text">选项 3</span>
            </Menu-item>
        </Menu>
</template>

<script>
    export default {
        computed: {
            onRoutes(){
                return this.$route.path.replace('/', '');
            }
        }
    }
</script>

<style scoped>
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
</style>
