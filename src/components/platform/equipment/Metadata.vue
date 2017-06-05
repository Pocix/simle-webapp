<template>
    <div>
        <font class="table-title-style">首页 - 元数据配置</font>
        <div id="equTree">
            <el-input placeholder="输入关键字进行过滤"  v-model="filterText">
                <el-button slot="append" icon="search"></el-button>
            </el-input>
            <el-tree
                class="filter-tree"
                :data="treeData"
                :props="defaultProps"
                style="margin-top:11px;"
                default-expand-all
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                ref="tree2">
            </el-tree>
        </div>
        <div  style="float:right;width:83.5%">
            <div style="width: 100%; float: left">
                <span style="float:left" class="table-title-style">机房信息</span>
                <span style="float:right">
                    <el-button type="primary" @click="handleAdd" icon="plus">添加设备类型</el-button>
                    <el-button type="primary"  icon="edit"
                               @click="handleTypeEdit()">编辑</el-button>
                    <el-button type="primary" icon="delete"
                               @click="handleTypeDel()">删除</el-button>
                </span>
            </div>
            <div style="width: 100%; float: left">
                <el-form :model="editForm"  ref="editForm" :inline="true" class="demo-form-inline">

                    <font class="edit-type-class">设备类型名称 : {{ editForm.name }} </font>

                    <font class="edit-type-class">英文名称 : {{ editForm.nameEn }} </font>

                    <font class="edit-type-class">系统类型 : {{ editForm.systemTypeStr }} </font>
                </el-form>
            </div>

            <!--工具条-->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: -10px;">
                <div style="float:left">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-input v-model="filters.name" placeholder="测点名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="handleQuery" icon="search">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div style="float:right; margin-bottom: 8px;">
                    <!--顶部工具条-->
                    <el-button type="primary" @click="handleAddSurvey" icon="plus">添加测点</el-button>
                </div>
            </el-col>

            <!--列表-->
            <el-table :data="fixingSurveyDatas" border highlight-current-row v-loading="listLoading"  style="width: 100%;">
                <el-table-column prop="fixingSurveyNo" label="测点编号" sortable>
                </el-table-column>
                <el-table-column prop="surveyType" label="测点类型" :formatter="formatSurveyType"  sortable>
                </el-table-column>
                <el-table-column prop="name" label="测点名称">
                </el-table-column>
                <el-table-column prop="nameEn" label="测点字段名称" >
                </el-table-column>
                <el-table-column prop="dataType" label="数据类型" :formatter="formatDataType"  >
                </el-table-column>
                <el-table-column prop="unit" label="单位">
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template scope="scope">
                        <el-button size="small" icon="edit"
                                   @click="handleSurveyEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" icon="delete"
                                   @click="handleSurveyDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--底部工具条-->
            <el-col :span="24" class="toolbar">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page.pageNo"
                    :page-size="page.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="page.total" style="float:right;">
                </el-pagination>
            </el-col>

            <!--新增界面  添加设备类型 -->
            <el-dialog title="添加设备类型"  style="width:100%; left: 0.2%;" v-model="addFormVisible" :close-on-click-modal="false">
                <el-form :model="addForm" label-width="90px" :rules="addFormRules" ref="addForm" :inline="true" class="demo-form-inline">
                    <el-form-item label="设备名称" prop="name">
                        <el-input v-model="addForm.name" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="英文名称" prop="nameEn">
                        <el-input v-model="addForm.nameEn" ></el-input>
                    </el-form-item>

                    <el-form-item label="系统类型" prop="systemTypeNo">
                        <el-radio-group v-model="addForm.systemTypeNo">
                            <el-radio class="radio" :label="1">动环</el-radio>
                            <el-radio class="radio" :label="2">电力</el-radio>
                            <el-radio class="radio" :label="3">楼宇</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer foot" style="padding: 40px 3px 5px;">
                    <el-button @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
                </div>
            </el-dialog>

            <!--编辑界面 设备类型-->
            <el-dialog title="编辑设备类型"  style="width:80%; left: 10%;" v-model="editFormVisible" :close-on-click-modal="false">
                <el-form :model="editForm" label-width="90px" :rules="addFormRules" ref="editForm" :inline="true" class="demo-form-inline">
                    <el-input type="hidden" v-model="editForm.fixingTypeNo" ></el-input>
                    <el-form-item label="设备名称" prop="name">
                        <el-input v-model="editForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="英文名称" prop="nameEn">
                        <el-input v-model="editForm.nameEn" ></el-input>
                    </el-form-item>

                    <el-form-item label="系统类型" prop="systemTypeNo">
                        <el-radio-group v-model="editForm.systemTypeNo">
                            <el-radio class="radio" :label="1">动环</el-radio>
                            <el-radio class="radio" :label="2">电力</el-radio>
                            <el-radio class="radio" :label="3">楼宇</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style=" padding: 40px 2px 3px;">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
                </div>
            </el-dialog>

            <!--新增界面  添加测点 -->
            <el-dialog title="添加测点" size="large" v-model="addFormSurvey" :close-on-click-modal="false" class="el-dialog__title" style="left: 1%;">
                <el-form :model="addSurvey" label-width="90px"  ref="addSurvey" :inline="true" class="demo-form-inline">
                    <el-form-item v-for="(domain, index) in addSurvey.domains" >
                        <el-form-item  :prop="'domains.' + index + '.name'" :rules="{ required: true, message: '请输入测点名称', trigger: 'blur'}">
                            <el-input size="4" placeholder="测点名称" v-model="domain.name" ></el-input>
                        </el-form-item>

                        <el-form-item :prop="'domains.' + index + '.nameEn'" :rules="{ required: true, message: '请输入英文名称', trigger: 'blur'}">
                            <el-input placeholder="测点英文名称" v-model="domain.nameEn"></el-input>
                        </el-form-item>

                        <el-form-item label="测点类型" :prop="'domains.' + index + '.surveyType'" :rules="{ required: true, type: 'number', message: '请输入英文名称', trigger: 'blur'}">
                            <el-radio-group v-model="domain.surveyType">
                                <el-radio class="radio" :label="1">遥信</el-radio>
                                <el-radio class="radio" :label="2">遥测</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item >
                            <el-input  placeholder="单位" v-model="domain.unit"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select  style="width:140px;" v-model="domain.dataType"  placeholder="数据类型">
                                <el-option label="整型" value="1"></el-option>
                                <el-option label="浮点型" value="2"></el-option>
                                <el-option label="布尔型" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-form-item>
                    <el-button type="primary" @click="addDomain" icon="plus"></el-button>
                </el-form>
                <div slot="footer" class="dialog-footer" >
                    <el-button @click.native="addFormSurvey = false">取消</el-button>
                    <el-button type="primary" @click.native="addSubmitSurvey(addSurvey)" :loading="addSurveyLoading">提交</el-button>
                </div>
            </el-dialog>

            <!--编辑界面 设备测点-->
            <el-dialog title="编辑" v-model="editFormSurvey" :close-on-click-modal="false" style=" width: 100%; left: 5%;">
                <el-form :model="editSurvey" label-width="100px" ref="editSurvey" :inline="true" class="demo-form-inline">
                    <el-form-item label="测点名称">
                        <el-input v-model="editSurvey.name"></el-input>
                    </el-form-item>
                    <el-form-item label="测点英文名称" >
                        <el-input v-model="editSurvey.nameEn"></el-input>
                    </el-form-item>
                    <el-form-item label="数据类型" >
                        <el-select  style="width:192px;" v-model="editSurvey.dataType"  placeholder="数据类型">
                            <el-option label="整型" value="1"></el-option>
                            <el-option label="浮点型" value="2"></el-option>
                            <el-option label="布尔型" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单位">
                        <el-input v-model="editSurvey.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="测点类型" class="label">
                        <el-radio-group v-model="editSurvey.surveyType">
                            <el-radio class="radio" :label="1">遥信</el-radio>
                            <el-radio class="radio" :label="2">遥测</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-input type="hidden" v-model="editSurvey.fixingSurveyNo"></el-input>
                    <el-input type="hidden" v-model="editSurvey.fixingTypeNo"></el-input>
                </el-form>
                <div slot="footer" class="dialog-footer" style="padding:0px 1px 3px;">
                    <el-button @click.native="editFormSurvey = false">取消</el-button>
                    <el-button type="primary" @click.native="editSurveySubmit" :loading="editSurveyLoading">提交</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>
<script src="./metadata.js"></script>
<style scoped>
    #equTree{
        width:15.5%;
        height:100%;
        float: left;
        margin-right:10px;
    }
    .edit-type-class{
        float: none;
        display: inline-block;
        font-size: 16px;
        color: #48576a;
        line-height: 2;
        padding: 1% 6% 1% 0;
        box-sizing: border-box;
        padding-top: 3px;
        width: 30%;
    }
    .el-dialog__title{
        bavkground-color: #000!important
    }
    .el-dialog__header{
        height: 16px;
        background-color:  #eef1f6;
        ligh-height: 16px;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
    }
    .el-dialog{
        border-radius: 7px;
    }
    .el-input__inner{
        border-radius: 0;
    }
    .el-dialog el-dialog--small{
        left: 65%;
    }
    .el-pagination{
        padding: 15px 5px;
    }

    .el-dialog--small{
        width: 60%;
    }
    .label{
        margin-right: 135px;
    }


</style>
