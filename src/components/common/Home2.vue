<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 300px;
        margin: 0 auto;
        height: inherit;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
</style>
<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" >
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <Menu-item name="home">
                    <Icon type="ios-navigate"></Icon>
                    首页
                </Menu-item>
                <Menu-item>
                    <Icon type="ios-keypad"></Icon>
                    导航二
                </Menu-item>
                <Menu-item name="3">
                    <Icon type="ios-analytics"></Icon>
                    导航三
                </Menu-item>
                <Menu-item name="4">
                    <Icon type="ios-paper"></Icon>
                    <a href="https://www.iviewui.com/docs/guide/install">导航四</a>
                </Menu-item>
            </div>
        </Menu>
        <div class="layout-content">
            <Row>
                <i-col span="4">
                    <Menu active-name="1-2" width="auto" :open-names="['1']" :active-name="setActive" @on-select="routeTo">
                        <Submenu>
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                表格
                            </template>
                            <Menu-item name="basetable">基础表格</Menu-item>
                            <Menu-item name="vuetable">Vue表格组件</Menu-item>
                        </Submenu>
                        <Submenu>
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                表单
                            </template>
                            <Menu-item name="baseform">基础表单</Menu-item>
                            <Menu-item name="vueeditor">编辑器</Menu-item>
                            <Menu-item name="markdown">markdown</Menu-item>
                            <Menu-item name="upload">文件上传</Menu-item>
                        </Submenu>
                        <Submenu>
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                图表
                            </template>
                            <Menu-item name="basecharts">基础图表</Menu-item>
                            <Menu-item name="mixcharts">混合图表</Menu-item>
                        </Submenu>
                        <Submenu>
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                搜索
                            </template>
                            <Menu-item name="searchhistory">搜索任务</Menu-item>
                            <Menu-item name="Test">Test</Menu-item>
                        </Submenu>
                        <Menu-item><a href="https://www.iviewui.com/docs/guide/install"><Icon type="ios-navigate"></Icon>&nbsp;&nbsp;Iview官网</a></Menu-item>
                    </Menu>
                </i-col>
                <i-col span="20">
                    <div class="layout-content-main">
                        <transition name="move" mode="out-in"><router-view></router-view></transition>
                    </div>
                </i-col>
            </Row>
        </div>
        <div class="layout-copy">
            2011-2017 &copy; Smile - xx
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 4.5,
                spanRight: 19.5
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 4.5 ? 14 : 24;
            },
            setActive() {
                return this.$route.path.replace('/','');
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 4.5) {
                    this.spanLeft = 1.5;
                    this.spanRight = 22.5;
                } else {
                    this.spanLeft = 4.5;
                    this.spanRight = 19.5;
                }
            },
            routeTo(e) {
                //console.log(e);
                this.$router.push(e);
            }
        }
    }
</script>
