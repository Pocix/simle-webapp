<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>基础图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="用户名称"></el-table-column>
            <el-table-column prop="loginName" label="登录名"></el-table-column>
            <el-table-column prop="loginDate" label="创建时间" sortable></el-table-column>
        </el-table>
        <el-col class="toolbar" style="padding:10px;">
            <el-pagination @current-change="findAll" :current-page="currentPage" :page-size="3"
                           layout="total, prev, pager, next, jumper" :total="total" style="float:right">
            </el-pagination>
        </el-col>
    </div>
</template>

<script src="./userInfo.js"></script>
