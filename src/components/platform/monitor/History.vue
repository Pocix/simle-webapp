<template>
    <div>
        <h3 class="table-title-style">首页-历史数据查看</h3>
        <div >
            <el-form :inline="true"  :model="powerenvi">
                <el-tabs type="border-card">
                    <el-tab-pane label="动环监控">
                        <el-col>
                            <el-form-item label="机   房"  label-width="68px">
                                <el-input v-model="powerenvi.machineRoom"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类型" style="margin-left: 25px;">
                                <el-input v-model="powerenvi.deviceType"></el-input>
                            </el-form-item>
                            <el-form-item label="设备名称">
                                <el-input v-model="powerenvi.deviceName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-form-item label="起始时间">
                            <el-col :span="21">
                                <el-date-picker type="datetime" placeholder="选择时间" v-model="powerenvi.endTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="结束时间">
                            <el-col :span="21">
                                <el-date-picker type="datetime" placeholder="选择时间" v-model="powerenvi.endTime" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-button type="primary" @click="historySearch" style="margin:44px 49px 0px 363px;">历史查询</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="电力监控"></el-tab-pane>
                    <el-tab-pane label="门禁">门禁</el-tab-pane>
                    <el-tab-pane label="楼宇">楼宇</el-tab-pane>
                </el-tabs>
            </el-form>
        </div>
        <div style="margin-top: 30px;"></div>
        <div>
            <el-table :data="tableData3" height="250" border style="width: 100%">
                <el-table-column prop="date" label="A相电压">
                </el-table-column>
                <el-table-column prop="name" label="B相电压">
                </el-table-column>
                <el-table-column prop="address" label="C相电压">
                </el-table-column>
                <el-table-column prop="address" label="A相电流">
                </el-table-column>
                <el-table-column prop="address" label="B相电流">
                </el-table-column>
                <el-table-column prop="address" label="C相电流">
                </el-table-column>
                <el-table-column prop="address" width="180" label="采集时间">
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                powerenvi: {
                    machineRoom: '',
                    deviceType:'',
                    deviceName:'',
                    startTime:'',
                    endTime:''

                }
            }
        },
        methods: {
            historySearch() {
                let para={
                    machineRoom:this.powerenvi.machineRoom,
                    deviceType:this.powerenvi.deviceType,
                    deviceName:this.powerenvi.deviceName,
                    startTime:this.powerenvi.startTime,
                    endTime:this.powerenvi.endTime

                };
            }
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
    .el-tabs--border-card>.el-tabs__header{
        background: white;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        background-color: #20a0ff;
        color:#fff;
    }
    .el-tabs__item{
        padding: 0 103.7px;
    }
   .el-form--inline .el-form-item{
        margin-right: 220px;
   }


</style>
