export default {
    data() {
        return {
            tableData: [],
            activeIndex: '1',
            currentPage: 1,
            total: 10,
            listLoading: false,
            username: null,
            items:[],
            fields: {
                jobId: {
                    label: 'ID',
                    sortable: true
                },
                jobName: {
                    label: '任务名称',
                    sortable: true
                },
                jobGroup: {
                    label: '任务组'
                },
                jobStatus: {
                    label: '任务状态'
                },
                cronExpression: {
                    label: '频率'
                },
                isConcurrent: {
                    label: '是否同步'
                },
                beanClass: {
                    label: '类路径'
                },
                springId: {
                    label: 'springId'
                },
                methodName: {
                    label: '方法名'
                },
                description: {
                    label: '描述'
                },
                actions: {
                    label: 'Actions'
                }
            },
            perPage: 5,
            filter: null
        }
    },
    mounted: function() {
        this.findAll();
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.$message('编辑第'+(index+1)+'行');
        },
        handleDelete(index, row) {
            this.$message.error('删除第'+(index+1)+'行');
        },
        findAll(currentPage) {
            this.listLoading = true;
            if (!isNaN(currentPage)) {
                this.currentPage = currentPage;
            }
            var params_ = {
                pageNum: this.currentPage,
                pageSize: this.perPage
            };
            if (this.username && this.username.trim() != "") {
                params_['username'] = this.username;
            }
            this.$http.get("/api/task/taskList", {
                params: params_
            }).then(function(response) {
                this.total = response.data.count;
                this.tableData =  response.data.list;
                this.items =  response.data.list;
            }).
            catch(function(response) {
                console.error(response);
            });
            this.listLoading = false;
        },
        formatDate: function getNowFormatDate(time) {
            var date = new Date(time);
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
            return currentdate;
        },
        formatCreateDate: function(row, column) {
            if (row.createTime != null) {
                return this.formatDate(row.createTime);
            } else {
                return '';
            }
        },
        testadddata:function(currentPage){
            if(currentPage !== 1){
                var params_ = {
                    pageNum: this.currentPage,
                    pageSize: this.perPage
                };
                this.$http.get("/api/task/taskList", {
                    params: params_
                }).then(function(response) {
                    this.total = response.data.count;
                    this.tableData =  response.data.list;
                    console.log(response.data.list);
                    for(var i=0; i<this.tableData.length; i++){
                        this.items.push(this.tableData[i]);
                    }
                }).
                catch(function(response) {
                    console.error(response);
                });
            }
        }
    }
}
