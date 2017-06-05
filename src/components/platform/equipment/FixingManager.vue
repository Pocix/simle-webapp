<template>
    <div>
        <font class="table-title-style">首页 - 设备管理</font>
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
                <font style="float:left" class="table-title-style">机房信息</font>
                <font style="float:right">
                    <el-button type="primary" @click="handleAddRoom" icon="plus">添加机房</el-button>
                    <el-button type="primary"  icon="edit"
                               @click="handleTypeEdit()">编辑</el-button>
                    <el-button type="primary" icon="delete"
                               @click="handleTypeDel()">删除</el-button>
                </font>
            </div>
            <div style="width: 100%; float: left">
                <el-form :model="editForm"  ref="editForm" :inline="true" class="demo-form-inline">
                    <font class="edit-type-class">机房名称 : {{ editForm.name }} </font>
                    <font class="edit-type-class">系统类型 : {{ editForm.systemTypeStr }} </font>
                </el-form>

            </div>

            <!--工具条-->
            <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: -10px;">
                <div style="float:left">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-input v-model="filters.name" placeholder="设备名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" v-on:click="handleQuery" icon="search">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div style="float:right; margin-bottom: 8px;">
                    <!--顶部工具条-->

                    <el-button type="primary" @click="handleAddFixing" icon="plus">添加设备</el-button>
                </div>
            </el-col>

            <!--列表-->
            <el-table :data="fixingDatas" border highlight-current-row v-loading="listLoading"  style="width: 100%;">
                <el-table-column prop="fixingNo" label="设备编号" sortable>
                </el-table-column>
                <el-table-column prop="name" label="设备名称">
                </el-table-column>
                <el-table-column prop="nameEn" label="设备英文名称" >
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template scope="scope">

                        <el-button size="small" icon="edit"
                                   @click="handleFixingEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" icon="delete"
                                   @click="handleFixingDel(scope.$index, scope.row)">删除</el-button>
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

            <!--新增界面  添加机房 -->
            <el-dialog title="添加机房"  style="width:80%;" v-model="addFormVisible" :close-on-click-modal="false">
                <el-form :model="addForm" label-width="90px" :rules="addFormRules" ref="addForm" :inline="true" class="demo-form-inline">
                    <el-form-item label="机房名称" prop="name">
                        <el-input v-model="addForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="系统类型" prop="systemTypeNo">
                        <el-radio-group v-model="addForm.systemTypeNo">
                            <el-radio class="radio" :label="1">动环</el-radio>
                            <el-radio class="radio" :label="2">电力</el-radio>
                            <el-radio class="radio" :label="3">楼宇</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
                </div>
            </el-dialog>

            <!--编辑界面 机房信息-->
            <el-dialog title="编辑机房信息"  style="width:80%;" v-model="editFormVisible" :close-on-click-modal="false">
                <el-form :model="editForm" label-width="90px" :rules="addFormRules" ref="editForm" :inline="true" class="demo-form-inline">
                    <el-input type="hidden" v-model="editForm.roomNo"></el-input>

                    <el-form-item label="机房名称" prop="name">
                        <el-input v-model="editForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="系统类型" prop="systemTypeNo">
                        <el-radio-group v-model="editForm.systemTypeNo">
                            <el-radio class="radio" :label="1">动环</el-radio>
                            <el-radio class="radio" :label="2">电力</el-radio>
                            <el-radio class="radio" :label="3">楼宇</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormVisible = false">取消</el-button>
                    <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
                </div>
            </el-dialog>

            <!--新增界面  添加设备 -->
            <el-dialog title="添加设备"  v-model="addFormFixing" :close-on-click-modal="false">
                <el-form :model="addFixing" label-width="90px"  ref="addFixing" :inline="true" class="demo-form-inline">
                    <el-form-item v-for="(domain, index) in addFixing.domains" >
                        <el-form-item :prop="'domains.' + index + '.name'" :rules="{ required: true, message: '请输入测点名称', trigger: 'blur'}">
                            <el-input size="4" placeholder="设备名称" v-model="domain.name"></el-input>
                        </el-form-item>
                        <el-form-item :prop="'domains.' + index + '.nameEn'" :rules="{ required: true, message: '请输入英文名称', trigger: 'blur'}">
                            <el-input placeholder="设备英文名称" v-model="domain.nameEn" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select  style="width:192px;" :rules="{ required: true, message: '请输入英文名称', trigger: 'change'}"
                                        v-model="domain.fixingTypeNo" clearable filterable  placeholder="选择设备类型">
                                <el-option
                                    v-for="item in fixingTypeOption"
                                    :label="item.name"
                                    :value="item.fixingTypeNo"
                                    :disabled="item.disabled">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-form-item>
                    <el-button type="primary" @click="addDomain" icon="plus"></el-button>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="addFormFixing = false">取消</el-button>
                    <el-button type="primary" @click.native="addSubmitFixing(addFixing)" :loading="addFixingLoading">提交</el-button>
                </div>
            </el-dialog>

            <!--编辑界面  编辑设备 -->
            <el-dialog title="编辑设备"  v-model="editFormFixing" :close-on-click-modal="false">
                <el-form :model="editFixing" label-width="100px"  ref="editFixing" :inline="true" class="demo-form-inline">
                    <el-form-item label="设备名称">
                        <el-input v-model="editFixing.name"></el-input>
                    </el-form-item>
                    <el-form-item label="设备英文名称" >
                        <el-input v-model="editFixing.nameEn"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型" >
                        <el-select  style="width:192px;" v-model="editFixing.fixingTypeNo" clearable filterable  placeholder="选择设备类型">
                            <el-option
                                v-for="item in fixingTypeOption"
                                :label="item.name"
                                :value="item.fixingTypeNo">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-input type="hidden" v-model="editFixing.fixingNo"></el-input>
                    <el-input type="hidden" v-model="editFixing.roomNo"></el-input>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="editFormFixing = false">取消</el-button>
                    <el-button type="primary" @click.native="editFixingSubmit" :loading="editFixingLoading">提交</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>
<script src="./fixingManager.js"></script>
<style scoped>
    #equTree{
        width: 15.5%;
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
        padding: 1% 10% 1% 0;
        box-sizing: border-box;
        padding-top: 2px;
        width: 30%;
    }
</style>
