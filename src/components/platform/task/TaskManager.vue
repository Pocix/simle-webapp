<template>
    <div>
        <h3  class="table-title-style h3">首页-元数据配置-任务管理</h3>
        <div  style="margin-top: 30px; text-align: right; margin-bottom: 8px;">
            <!--顶部工具条-->
            <el-button type="primary" icon="plus" @click="handleAdd">新增</el-button>
            <el-button type="primary" icon="circle-close"  @click="deleteTask" :disabled="this.sels.length===0">删除</el-button>
        </div>

        <div>
            <el-table :data="taskData.list" highlight-current-row v-loading="listLoading"  element-loading-text="拼命加载中" @selection-change="selsChange"  style="width: 100%">
                <el-table-column type="selection"   label="选择">
                </el-table-column>
                <el-table-column prop="taskNo" label="任务编号">
                </el-table-column>
                <el-table-column prop="taskName" label="任务名称">
                </el-table-column>
                <el-table-column prop="collectoryInfoNo" label="采集系统">
                </el-table-column>
                <el-table-column prop="protocolType" label="协议类型">
                </el-table-column>
                <el-table-column prop="intervalValue" label="采集频率(秒)">
                </el-table-column>
                <el-table-column prop="startDay" label="运行时间(天)">
                </el-table-column>
                <el-table-column  width="280" label="操作">
                    <template scope="scope">
                    <el-button size="small" @click="noticeTask(scope.$index, scope.row,1)">启动</el-button>
                        <el-button size="small" @click="noticeTask(scope.$index, scope.row,2)">禁用</el-button>
                        <el-button size="small" @click="editTask(scope.$index, scope.row)">修改</el-button>
                </template>
                </el-table-column>
            </el-table>


            <el-col :span="24" class="toolbar">
                <el-pagination
                    @current-change="nextPage"
                    :current-page="page.pageNo"
                    :page-size="page.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="page.total" style="float:right;">
                </el-pagination>
            </el-col>
        </div>
        <!--新增界面-->
        <el-dialog :title="acti_tile" v-model="addFormVisible" size="large" :close-on-click-modal="false">
            <el-tabs v-model="activeName" type="border-card" >
                <el-tab-pane label="动换监控" name="first"  v-loading="taskLoading"  element-loading-text="拼命加载中">
                    <el-tabs>
                        <el-form :inline="true" :model="addTask" ref="addTask" :rules="addTaskRules">
                            <el-row :gutter="0">
                                <el-col :span="0">
                                    <el-form-item label="任务名称" :rules="{ required: true, message: '请输入任务名称', trigger: 'blur'}" >
                                        <el-input class="inputsize" size="small" v-model="addTask.taskName"></el-input>
                                    </el-form-item>
                                    <el-form-item label="通讯方式">
                                        <el-select class="sel" size="small" v-model="addTask.communicateType"  placeholder="请选择">
                                            <el-option label="共计自定义接口" value=1></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="采集系统">
                                        <el-select class="sel" v-model="addTask.collectoryInfoNo" size="small" placeholder="请选择">
                                            <el-option label="共计" value=1></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="采集频率(秒)">
                                        <el-input-number class="inputnumber" v-model="addTask.intervalValue" :min="1" :max="10000"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="" >
                                        <el-checkbox v-model="addTask.isEnable">启用</el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item v-for="(m, index) in addTask.modbus">
                            <el-row :gutter="0">
                                <el-col :span="0">
                                    <el-form-item label="地址码" :prop="'modbus.' + index + '.addressCode'" :rules="{ required: true, message: '请输入地址码', trigger: 'blur'}">
                                        <el-input class="inputsize"   v-model="m.addressCode"  size="small"></el-input>
                                    </el-form-item>
                                    <el-form-item label="功能号" :prop="'modbus.' + index + '.functionCode'" :rules="{ required: true, message: '请输入功能号', trigger: 'blur'}">
                                        <el-input class="inputsize"  v-model="m.functionCode" size="small"></el-input>
                                    </el-form-item>
                                    <el-form-item label="寄存器起始地址" :prop="'modbus.' + index + '.registerStartAddress'" :rules="{ required: true, message: '请输入寄存器起始地址', trigger: 'blur'}">
                                        <el-input class="inputsize"  v-model="m.registerStartAddress"  size="small"></el-input>
                                    </el-form-item>
                                    <el-form-item label="寄存器个数" :prop="'modbus.' + index + '.registerCount'" :rules="{required: true, message: '请输入寄存器个数', trigger: 'blur'}">
                                        <el-input class="inputsize"  v-model="m.registerCount" size="small"></el-input>
                                    </el-form-item>
                                    <i class="el-icon-plus"@click="generatorRow()"></i>
                                    <i class="el-icon-minus"@click="removeRow(m)"></i>
                                </el-col>
                            </el-row>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" style="float:right" @click.native="submitForm('addTask')" :disabled="this.submitStatus==true">确定</el-button>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="电力监控" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="楼宇监控" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="门禁系统" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>


</template>
<script>
    export default {
        data() {
            return {
                submitStatus:false,//添加或修改的启用或禁用
                act:false,//修改还是添加任务
                taskNo:0,//修改任务的任务编号
                acti_tile:"",//弹框标题
                page: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 0
                },
                listLoading: false,
                taskLoading:false,
                sels: [],//列表选中列
                taskData:{},
                IntervalValue:1,//采集频率
                communicateType:1,//通讯方式
                activeName: 'first',
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addTaskRules: {
                    taskName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    addressCode:[{ required: true, message: '请输入地址码', trigger: 'blur'}]
                }
                ,addTask:{
                    taskName:"",
                    communicateType:'1',
                    collectoryInfoNo:'1',
                    intervalValue:1,
                    isEnable:false,
                    modbus:[{
                        addressCode: '',
                        functionCode: '',
                        registerStartAddress:'',
                        registerCount:''
                    }]
                }
            }
        },
        methods: {
            nextPage(val) {
            this.page.pageNo = val;
            this.getList();
        },

        /**
         * 启动和停止采集
         */
        noticeTask(index,row,status){
            let _this = this;
            _this.$message('启动采集');
            _this.$http({url:'api/task/noticeTask',method:'post',params: {taskNo:row.taskNo,status:status}}).then(response => {
                _this.$message.error('系统错误');
            });
        },
            /**
             *获取表格选择的行
             */
            selsChange: function (sels) {
                this.sels = sels;
            },
            /**
             *获取用户列表
             */
            getList(){
                let _this = this;
                let para = { page: this.page};
                this.listLoading = true;
                _this.$http.get('api/task/list', {params: {pageNo: _this.page.pageNo, pageSize: _this.page.pageSize}}).then(response => {
                    return response.json();
                }, response => {
                    _this.$message.error('系统错误');
                }).then(data => {
                    _this.taskData = data;
                    _this.page.pageNo = data.pageNo;
                    _this.page.total = data.count;
                this.listLoading = false;
            });
            },
            submitForm(formName) {
                this.submitStatus=true;
                var addTask=this.addTask;
                var _this=this;
                var addressCode="";
                var functionCode="";
                var registerStartAddress="";
                var registerCount="";
                for(var i = 0; i < addTask.modbus.length; i++){
                    addressCode+=addTask.modbus[i].addressCode+",";
                    functionCode+=addTask.modbus[i].functionCode+",";
                    registerStartAddress+=addTask.modbus[i].registerStartAddress+",";
                    registerCount+=addTask.modbus[i].registerCount+",";
                }
                addressCode=addressCode.substring(0,addressCode.length-1);
                functionCode=functionCode.substring(0,functionCode.length-1);
                registerStartAddress=registerStartAddress.substring(0,registerStartAddress.length-1);
                registerCount=registerCount.substring(0,registerCount.length-1);
                let para = {"taskName":addTask.taskName,
                    "communicateType":addTask.communicateType,
                    "collectoryInfoNo":addTask.collectoryInfoNo,
                    "intervalValue":addTask.intervalValue,
                    "isEnable":addTask.isEnable,
                    "addressCode":addressCode,
                    "functionCode":functionCode,
                    "registerStartAddress":registerStartAddress,
                    "registerCount":registerCount
                };
                if(!this.act){
                    this.submitAddTask(_this,formName,para);
                }else{
                    para.taskNo=this.taskNo;
                    this.submitEditTask(_this,formName,para);
                }
            },
            submitAddTask:function(_this,formName,para){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$http({url:'api/task/addTask',method:'post',params:para}).then(res=>{
                            if(res.status=200&&res.body){
                                _this.$message("添加成功");
                                this.addFormVisible = false;
                                //_this.$refs[formName].resetFields();//TODO 不起作用,后续完善
                                this.$refs['addTask'].resetFields();
                                this.addTask.intervalValue=1;
                                _this.getList();
                            }else{
                                _this.$message.error("添加失败");
                            }
                            this.submitStatus=false;
                        }).catch(e=>{
                            _this.$message.error("添加失败");
                            this.submitStatus=false;
                        })
                    }
                });
            },
            submitEditTask:function(_this,formName,para){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$http({url:'api/task/editTask',method:'post',params:para}).then(res=>{
                            if(res.status=200&&res.body){
                                _this.$message("修改成功");
                                this.addFormVisible = false;
                               /// _this.$refs[formName].resetFields();//TODO 不起作用,后续完善
                                this.$refs['addTask'].resetFields();
                                this.addTask.intervalValue=1;
                                _this.getList();
                            }else{
                                _this.$message.error("修改失败");
                            }
                            this.submitStatus=false;
                        }).catch(e=>{
                            _this.$message.error("修改失败");
                            this.submitStatus=false;
                        })
                    }
                });
            },
            //显示新增界面
            handleAdd: function () {
                this.acti_tile="新增任务";
                this.addFormVisible = true;
                this.$refs['addTask'].resetFields();
                this.addTask.intervalValue=1;
            },
            //修改任务
        editTask: function (index,row) {
            this.acti_tile = "修改任务";
            this.addFormVisible = true;
            let _this = this;
            this.act=true;
            this.taskLoading=true;
            this.$http.get('api/task/editTask', {params: {taskNo:row.taskNo}}).then(res =>
            {
               if(res.status=200&&res.body){
                   _this.addTask = {
                       taskName: res.body.taskName,
                       intervalValue:res.body.intervalValue,
                       communicateType:'1',
                       collectoryInfoNo: '1',
                       modbus:res.body.modbus
                   };
                   _this.taskNo=res.body.taskNo
                   this.taskLoading=false;
               }
            }).catch(e=>{
                _this.$message.error('系统错误');
                this.taskLoading=false;
            });
            },
            /**
             *删除任务
             */
            deleteTask() {
                var ids = this.sels.map(item => item.taskNo).toString();
                let _this = this;
                    _this.$http({url:'/api/task/delete',method:'post',params:{taskNo:ids}}).then(res=>{
                        this.$message('删除成功');
                    this.getList();
                });

            },
            generatorRow:function(){
                this.addTask.modbus.push({
                    addressCode: '',
                    functionCode: '',
                    registerCount:'',
                    registerStartAddress:''
                });
            },
            removeRow:function(item){
                var index = this.addTask.modbus.indexOf(item);
                if (index !== -1&&this.addTask.modbus.length>1) {
                    this.addTask.modbus.splice(index, 1)
                }
            }
        }, watch: {

        },
        created() {
            this.getList();
        }
    };

</script>
<style scoped>
    .inputsize {
        width: 111px;
    }
    .sel{
        width: 140px;
    }
    .inputnumber{
        width: 116px;
    }
    .el-tabs__nav .el-tabs__item{
        padding: 0 12.7px;
    }
    .rate{
        padding-bottom: 15px;
    }

    .h3{
        float: left;
    }
    .el-dialog__header{
        height: 20px;
        background-color:  #eef1f6;
        ligh-height: 20px;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .inputsize[data-v-bd28967e]{
        width: 80px;
    }
    .el-icon-plus{
        cursor:pointer;
        color:#20a0ff;
    }
</style>
