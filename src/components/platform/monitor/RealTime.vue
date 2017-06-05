<template>
    <div>
        <h3 class="table-title-style">首页-实时数据查看</h3>
        <div >
            <el-form :inline="true"  :model="device">
                <el-tabs type="border-card">
                    <el-tab-pane label="动环监控">
                        <el-col>
                            <el-form-item label="机   房"  label-width="68px">
                                <el-input v-model="device.machineRoom"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类型" style="margin-right: 38px;margin-left: 25px;">
                                <el-select v-model="device.deviceType" @change="loadTypeName">
                                    <el-option  v-for="item in device.deviceTypes" :label="item.name" :value="item.fixingTypeNo"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="设备名称">
                                <el-select v-model="device.deviceTypeName">
                                    <el-option  v-for="item in device.deviceTypeNames" :label="item.deviceName" :value="item.deviceName"></el-option>
                                </el-select>

                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="realTimeSearch" style="margin:44px 49px 0px 32px">实时查询</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col>
                            <span>当前选中设备:</span>  <span>采集时间:</span>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane label="电力监控"></el-tab-pane>
                    <el-tab-pane label="门禁">门禁</el-tab-pane>
                    <el-tab-pane label="楼宇">楼宇</el-tab-pane>
                </el-tabs>
            </el-form>
        </div>
        <div style="margin-top: 30px;"></div>
        <div>
            <el-table height="250" border style="width: 100%">
                <el-table-column prop="date" label="属性">
                </el-table-column>
                <el-table-column prop="name" label="值">
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                device: {
                    machineRoom: '',
                    deviceType:'',
                    deviceName:'',
                    startTime:'',
                    endTime:'',
                    deviceTypes:[],
                    deviceTypeNames:[]
                }
            }

        },
        methods: {
            realTimeSearch(){

            },
           loadSelectData(){
                let _this = this;
                _this.$http.get('api/realtime/getDeviceType').then(response => {
                    return response.json();
                }).then(data => {
                    this.device.deviceTypes=data;
                }).catch(e=>{
                    _this.$message.error('系统错误');
                });
            },
            loadTypeName(typeNo){
                let _this = this;
                _this.$http.get('api/realtime/getDeviceName', {params: {fixingTypeNo:typeNo}}).then(response => {
                    return response.json();
                }).then(data => {
                    this.device.deviceTypeNames=data;
                }).catch(e=>{
                    _this.$message.error('系统错误');
                });
            }
        }
        ,created(){
            this.loadSelectData();
        }
    };
</script>

<style scoped>
    .el-tabs {
        clear: left;

    }
    .el-tab-pane{
        background-color:transparent;
    }
    .el-form-item{
        float: left;
    }
    .el-tabs--border-card>.el-tnpmabs__header{
        background: white;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        background: #20a0ff;
        color:white
    }
    .el-tabs__item{
        padding: 0 103.7px;
    }
</style>
