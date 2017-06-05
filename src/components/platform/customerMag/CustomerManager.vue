<template>
    <section>
    <div>
    <font class="table-title-style">首页-客户服务管理</font>
        <div style="margin-top: 20px;margin-bottom: 8px;">
            <div  style="text-align: left;float:left;">
                <el-input v-model="filters.name" placeholder="客户名称" class="customer" ></el-input>
            </div>
            <div  style="text-align: left;float:left;">
                <el-button type="primary" icon="search" v-on:click="getExternalSystemData" class="check">查询</el-button>
            </div>
            <div  style="text-align: right;float:right;margin-bottom: 8px;">
                <!--顶部工具条-->
                <el-button type="primary" icon="plus"  @click="handleAdd" style="margin-left: 0px;" >新增</el-button>

                <el-button type="primary" icon="circle-close" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
            </div>
        </div>

        <!--列表-->
      <el-table :data="externalSystemData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" stripe  border style="text-align:center;width: 100%">
          <el-table-column type="selection" width="80" align="center">
          </el-table-column>
          <el-table-column prop="systemNo" label="客户编号" align="center" sortable>
          </el-table-column>
          <el-table-column prop="name" label="系统名称" align="center">
          </el-table-column>
          <el-table-column prop="nameEn" label="英文名" align="center">
          </el-table-column>
          <el-table-column prop="websit" label="网址" align="center"  >
          </el-table-column>
          <el-table-column prop="keyCodeExpireDate" label="有效时间" align="center">
          </el-table-column>
          <el-table-column prop="keyCode" label="授权码" width="450" align="center">
          </el-table-column>
          <el-table-column prop="valid" label="状态" align="center" :formatter="formatIsValid">
          </el-table-column>
          <el-table-column label="操作" width="310" align="center">
               <template scope="scope">
                   <el-button size="small"
                             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                   <el-button size="small"
                             @click="switchIsValid(scope.$index, scope.row)">{{scope.row.valid?'禁用':'启用'}}</el-button>
                   <el-button size="small"
                             @click="powerMag(scope.$index, scope.row)">权限管理</el-button>
               </template>
          </el-table-column>
      </el-table>
    </div>

        <!--底部工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page.pageNo"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="系统名称" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="英文名">
                    <el-input v-model="editForm.nameEn" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网址">
                    <el-input v-model="editForm.websit" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="有效时间" prop="keyCodeExpireDate" >
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.keyCodeExpireDate"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="padding: 70px 3px 5px;">
                <el-button  @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>


        <!--权限管理界面-->
        <el-dialog title="权限管理" v-model="powerMagVisible" :close-on-click-modal="false">
            <el-form :model="powerMagForm" label-width="80px" :rules="powerMagFormRules" ref="powerMagForm">
                <el-input placeholder="输入关键字进行过滤"  v-model="filterText">
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
                <el-tree
                    class="filter-tree"
                    :data="treeData"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="initTree"
                    :props="defaultProps"
                    style="margin-top:11px;"
                    default-expand-all
                    :filter-node-method="filterNode"
                    ref="tree2">
                </el-tree>

            </el-form>
            <div slot="footer" class="dialog-footer" style="padding: 10px 2px 5px;">
                <el-button @click.native="powerMagVisible = false">取消</el-button>
                <el-button type="primary" @click.native="powerMagSubmit" :loading="powerMagLoading">提交</el-button>
            </div>
        </el-dialog>


        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
                <el-form-item label="系统名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="英文名">
                    <el-input v-model="addForm.nameEn" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="网址">
                    <el-input v-model="addForm.websit" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="有效时间" prop="keyCodeExpireDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.keyCodeExpireDate"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer footer" style="padding: 80px 2px 7px;">
                <el-button class="cancel" @click.native="addFormVisible = false">取消</el-button>
                <el-button class="submit" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>

</template>
<script>
  import util from './util'
  export default {
    data() {
      return {
            filters: {
					name: ''
			},
			filterText: '',
			initTree:[],
			externalSystemData: [],
			treeData: [],
			defaultProps: {
              children: 'children',
              label: 'name'
            },
			total: 0,
			page: 1,
			listLoading: false,
            sels: [],//列表选中列

            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            //编辑界面数据
            editForm: {
                systemNo: 0,
                name: '',
                nameEn: '',
                websit: '',
                keyCode:'',
                keyCodeExpireDate: ''
            },

            powerMagVisible: false,//权限界面是否显示
            powerMagLoading: false,
            powerMagFormRules: {

            },
            //权限界面数据
            powerMagForm: {
                systemNo: 0,
                name: '',
                nameEn: '',
                websit: '',
                keyCode:'',
                keyCodeExpireDate: ''
            },

            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            //新增界面数据
            addForm: {
                name: '',
                nameEn: '',
                websit: '',
                keyCode:'',
                keyCodeExpireDate: ''
            }
      }
    },
    methods: {
            //性别显示转换
			formatIsValid: function (row, column) {
			    //console.log(row.valid);
				return row.valid? '可用' :  '不可用' ;
			},
          filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
          },
        handleCurrentChange(val) {
				this.page = val;
				this.getExternalSystemData();
        },
        //获取客户列表
        getExternalSystemData() {
            let para = {
                page: this.page,
                pageSize: 10,
                name: this.filters.name
            };
            this.listLoading = true;

            this.$http.get('api/external/system/getListData', { params: para }).then((res) => {

                //console.log(res.status);
                this.total = res.data.body.total;
                this.externalSystemData = res.data.body.ExternalSystemData;
                this.listLoading = false;
            }).catch(err => {
                    this.$message.error('获取数据失败!');
                    console.log(err);
            });
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //显示权限管理界面
        powerMag(index, row) {
            this.powerMagVisible = true;
            this.powerMagForm = Object.assign({}, row);
            let para = {
                systemNo: this.powerMagForm.systemNo
            };
            this.$http.get('api/external/system/queryRoominfoTree', { params: para }).then(res => {
                  //console.log(res.data);
                  console.log(res.data.body.elist);
                  this.initTree = res.data.body.elist;
                  this.treeData = res.data.body.treeMap;
                })
                .catch(err => {
                    this.$message.error('权限数获取失败!');
                    console.log(err);
                })


        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = {
                name: '',
                nameEn: '',
                websit: '',
                keyCode:'',
                keyCodeExpireDate: ''
            };
        },
        //编辑提交
        editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;

                        let para = Object.assign({}, this.editForm);
                        para.keyCodeExpireDate = (!para.keyCodeExpireDate || para.keyCodeExpireDate == '') ? '' : util.formatDate.format(new Date(para.keyCodeExpireDate), 'yyyy-MM-dd');
                        this.$http.get('api/external/system/saveAndUpdate', { params: para }).then((res) => {
                            this.editLoading = false;
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getExternalSystemData();
                        })
                         .catch(err => {
                            this.$message.error('提交失败!');
                            console.log(err);
                        });

                    });
                }
            });
        },
        //权限管理提交
        powerMagSubmit: function () {
            var array = this.$refs.tree2.getCheckedNodes(true);

            this.$refs.powerMagForm.validate((valid) => {
                if(array.length === 0){
                    this.$message('请选择树节点');
                    return
                }
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.powerMagLoading = true;
                        //得到被选择的树数据

                        let para = {
                            systemNo: this.powerMagForm.systemNo,
                            array:JSON.stringify(array)
                        };
                        //console.log(JSON.stringify(array));
                        //权限管理保存
                        this.$http.get('api/external/system/savelimit', { params: para }).then((res) => {
                            this.powerMagLoading = false;
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['powerMagForm'].resetFields();
                            this.powerMagVisible = false;
                            this.getExternalSystemData();
                        }).catch(err => {
                            this.$message.error('权限保存失败!');
                            console.log(err);
                        });

                    });
                }
            });
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;

                        let para = Object.assign({}, this.addForm);
                        para.keyCodeExpireDate = (!para.keyCodeExpireDate || para.keyCodeExpireDate == '') ? '' : util.formatDate.format(new Date(para.keyCodeExpireDate), 'yyyy-MM-dd');
                        //增加数据
                        this.$http.get('api/external/system/saveAndUpdate', { params: para }).then((res) => {
                            this.addLoading = false;
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.getExternalSystemData();
                        }).catch(err => {
                            this.$message.error('新增失败!');
                            console.log(err);
                        });
                    });
                }
            });
        },
        selsChange: function (sels) {
            this.sels = sels;
        },
        //批量删除
        batchRemove: function () {
            var systemNos = this.sels.map(item => item.systemNo).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;

                let para = { systemNos: systemNos };

                 this.$http.get('api/external/system/deleteAll', { params: para }).then((res) => {
                    this.listLoading = false;
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getExternalSystemData();
                 }).catch(err => {
                    this.$message.error('删除失败!');
                    console.log(err);
                 });
            });
        },
        switchIsValid(index, row) {
            let data = Object.assign({}, row);

            let para = {
                isValid:  data.valid,
                systemNo: data.systemNo
            }
            //增加数据
            this.$http.get('api/external/system/switchIsValid', { params: para }).then((res) => {
                console.log(res.data);
                if(res.data){
                    this.$message({
                        message: '启用成功',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '禁用成功',
                        type: 'success'
                     });
                }
                this.getExternalSystemData();
            }).catch(err => {
                    this.$message.error('更改状态失败!');
                    console.log(err);
             });

        }
    },
    mounted() {
       this.getExternalSystemData();
	},
	watch: {
          filterText(val) {
            this.$refs.tree2.filter(val);
          }
    }
  };
</script>

<style>

  h3{
    padding-bottom: 9px;
    float: left;
    color: blue;
  }
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
    background: blue;
    color:white
  }
  .el-tabs__item{
    padding: 0 103.7px;
  }

    .add{
        margin-left: 960px;
    }
    .delete{
        margin-left: 10px;
    }
    .customer{
        width: 130%;
        border-radio: 5px;
    }
    .check{
        margin-left: 80px;
    }
    .el-dialog__header{
        height: 16px;
        background-color: #eef1f6;
        ligh-height: 16px;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;

    }
    .el-dialog el-dialog--small{
        border-radio: 7px;
    }

</style>
