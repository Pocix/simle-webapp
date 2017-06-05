<template>
    <b-navbar toggleable type="inverse" variant="success">
        <b-link class="navbar-brand" to="home">
            <span>BootstrapVue</span>
        </b-link>
        <b-nav is-nav-bar>
            <b-nav-item-dropdown text="表格">
                <b-dropdown-item to="basetable">基础表格</b-dropdown-item>
                <b-dropdown-item to="vuetable">Vue表格组件</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="表单">
                <b-dropdown-item to="baseform">基础表单</b-dropdown-item>
                <b-dropdown-item to="vueeditor">编辑器</b-dropdown-item>
                <b-dropdown-item to="markdown">markdown</b-dropdown-item>
                <b-dropdown-item to="upload">文件上传</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="图表">
                <b-dropdown-item to="basecharts">基础图表</b-dropdown-item>
                <b-dropdown-item to="mixcharts">混合图表</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="搜索">
                <b-dropdown-item to="searchhistory">搜索任务</b-dropdown-item>
                <b-dropdown-item to="test">Test</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-nav>
        <b-nav is-nav-bar class="ml-auto">
            <!-- Navbar dropdowns -->
            <b-nav-item-dropdown text="Lang" right-alignment>
                <b-dropdown-item to="#">EN</b-dropdown-item>
                <b-dropdown-item to="#">ES</b-dropdown-item>
                <b-dropdown-item to="#">RU</b-dropdown-item>
                <b-dropdown-item to="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown right-alignment>
                <!-- Using text slot -->
                <template slot="text">
                    <span style="font-weight: bold;">User</span>
                </template>
                <b-dropdown-item to="#">Profile</b-dropdown-item>
                <b-dropdown-item to="#">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-nav>
    </b-navbar>
</template>
<script>
    export default {
        data() {
            return {
                name: 'linxin'
            }
        },
        computed: {
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods: {
            handleCommand(command) {
                if (command == 'loginout') {
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
