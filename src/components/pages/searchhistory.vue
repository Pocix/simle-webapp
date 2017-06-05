<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 搜索</el-breadcrumb-item>
                <el-breadcrumb-item>搜索任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData" border style="width: 100%;margin: 0px">
            <el-table-column width="60px" prop="jobId" label="ID"/>
            <el-table-column width="120px" prop="jobName" label="任务名称"/>
            <el-table-column width="120px" prop="jobGroup" label="任务组"/>
            <el-table-column width="70px" prop="jobStatus" label="任务状态"></el-table-column>
            <el-table-column prop="cronExpression" label="频率"/>
            <el-table-column width="70px" prop="isConcurrent" label="是否同步"/>
            <el-table-column prop="beanClass" label="类路径"/>
            <el-table-column prop="springId" label="springId"/>
            <el-table-column prop="methodName" label="方法名"/>
            <el-table-column prop="description" label="描述"/>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col class="toolbar" style="padding:10px;">
            <el-pagination @current-change="findAll" :current-page="currentPage" :page-size="3"
                           layout="total, prev, pager, next, jumper" :total="total" style="float:right">
            </el-pagination>
        </el-col>
    </div>
</template>

<script src="./searchhistory.js"></script>
<style scoped>
</style>
