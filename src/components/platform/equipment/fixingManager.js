export default {
    data() {
        return {
            //机房设备树
            filterText: '',
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },

            //设备列表
            filters: {
                name: ''
            },
            fixingDatas: [],
             page: {
                 pageNo: 1,
                 pageSize: 5,
                 total: 0
             },
            roomNo: '',
            listLoading: false,

            //机房 添加页面
            addFormVisible: false,//新增机房界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入机房名称', trigger: 'blur' }
                ],
                systemTypeNo: [
                     { required: true, type: 'number', message: '请选择系统类型', trigger: 'change' }
                ]
            },
            //新增机房数据
            addForm: {
                name: '',
                systemTypeNo: ''
            },
            editFormVisible: false,
            editLoading:false,
            //编辑设备类型界面数据
            editForm: {
                roomNo: '',
            	name: '',
            	remark: '',
            	updateDate: '',
            	systemTypeNo: '',
            	systemTypeStr: ''
            },

            //设备信息添加页面
            addFormFixing: false,//新增设备界面是否显示
            addFixingLoading: false,

            fixingTypeOption:[],//设备类型选择

            addFixing: {
                 domains: [{
                     name: '',
                     nameEn: '',
                     fixingTypeNo:''
                 }]
            },

            //编辑设备信息界面
            editFormFixing: false,//编辑界面是否显示
            editFixingLoading: false,
            //编辑界面数据
            editFixing: {
                 fixingNo: '',
                 name: '',
                 nameEn: '',
                 fixingTypeNo:'',
                 roomNo:''
            }
        }
    },
    created() {
        this.queryRoomFixingTree();
        this.handleQuery();
    },
    watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },
    methods: {
        //获取设备类型树结构
        queryRoomFixingTree() {
            this.$http.post('api/fixing/manage/queryRoomFixingTree')
            .then(res => {
                console.log(res.data);
                this.treeData = res.data;
            })
            .catch(err => {
                console.log(err);
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        //点击树节点，获取设备类型信息
        handleNodeClick(data) {
            this.$store.state.roomInfo = data;
            this.getRoomInfo(data);
            this.roomNo = data.roomNo;
            this.handleQuery();
        },
        //根据机房编号获取机房信息
        getRoomInfo(data) {
            let para = {
                roomNo: data.roomNo
            };
            this.$http({
                  url: 'api/fixing/manage/getRoomInfo',
                  method: 'post',
                  params: para
            })
            .then(res => {
                  if(res.data.systemTypeNo == 1){
                     res.data.systemTypeStr = "动环";
                  }else if(res.data.systemTypeNo == 2){
                     res.data.systemTypeStr = "电力";
                  }else if(res.data.systemTypeNo == 3){
                     res.data.systemTypeStr = "楼宇";
                  }
                  this.editForm = res.data;
                  console.log(res.data);
             })
             .catch(err => {
                  console.log(err);
           })
        },
         //分页方法
         handleCurrentChange(val) {
             this.page.pageNo = val;
             this.handleQuery();
         },
        //监测设备信息列表查询
        handleQuery() {
            let param = {
                roomNo: this.roomNo,
                pageNo: this.page.pageNo,
                pageSize: this.page.pageSize,
                name: this.filters.name
            };
            this.$http({
                  url: 'api/fixing/manage/queryFixing',
                  method: 'get',
                  params: param
            })
            .then(res => {
                  this.fixingDatas = res.data.list;
                  this.page.pageNo = res.data.pageNo;
                  this.page.total = res.data.count;
                  console.log(res.data);
             })
             .catch(err => {
                  console.log(err);
           })
        },
        //显示机房新增界面
        handleAddRoom: function () {
            this.addFormVisible = true;
            this.addForm = {
                name: '',
                systemTypeNo: ''
            };
        },
        //新增机房
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        this.$http({
                            url: 'api/fixing/manage/addRoomInfo',
                            method: 'post',
                            params: {
                              name: this.addForm.name,
                              systemTypeNo: this.addForm.systemTypeNo,
                            }
                        }) .then(res => {
                              this.$message('添加成功！！！');
                              console.log(res.data);
                              this.addLoading = false;
                              this.addFormVisible = false;
                              this.queryRoomFixingTree();
//                              this.handleQuery();
                              this.addForm = {
                                name: '',
                                systemTypeNo: ''
                              };
                        }) .catch(e => {
                               this.$message('保存失败!');
                              console.log(e)
                        })
                    });
                }
            });
        },
       //获取设备类型树结构
        queryFixingType() {
             let param = {
                 tag: 'N'
             };
             this.$http({
                   url: 'api/fixing/metadata/queryFixingType',
                   method: 'post',
                   params: param
             })
             .then(res => {
                   this.fixingTypeOption = res.data;
                   console.log(res.data);
              })
              .catch(err => {
                   console.log(err);
            })
        },
        //显示设备信息新增界面
        handleAddFixing: function () {
            this.addFormFixing = true;
            this.addFixing = {
                domains: [{
                    name: '',
                    nameEn: '',
                    fixingTypeNo: ''
                }]
            };
            this.queryFixingType();
        },
        //新增设备信息
        addSubmitFixing: function (formName) {
             let names = '';
             let nameEns = '';
             let fixingTypeNos = '';
            for(var i = 0; i < formName.domains.length; i++){
                if(i == formName.domains.length-1){
                   names += formName.domains[i].name;
                   nameEns += formName.domains[i].nameEn;
                   fixingTypeNos += formName.domains[i].fixingTypeNo;
                }else{
                   names += formName.domains[i].name+",";
                   nameEns += formName.domains[i].nameEn+",";
                   fixingTypeNos += formName.domains[i].fixingTypeNo+",";
                }
            }
            this.$refs.addFixing.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addFixingLoading = true;
                        this.$http({
                            url: 'api/fixing/manage/addFixing',
                            method: 'post',
                            params: {
                                   name: names,
                                   nameEn: nameEns,
                                   fixingTypeNoStr: fixingTypeNos,
                                   roomNo:this.$store.state.roomInfo.roomNo
                            }
                         }) .then(res => {
                              this.$message('添加成功！！！');
                              console.log(res.data);
                              this.addFixingLoading = false;
                              this.addFormFixing = false;
                              this.handleQuery();
                              this.queryRoomFixingTree();
                              this.addFixing = {
                                    domains: [{
                                        name: '',
                                        nameEn: '',
                                        fixingTypeNo: ''
                                    }]
                              }
                         }) .catch(e => {
                               this.$message('保存失败!');
                              console.log(e)
                         })
                    });
                }
            });
        },
        removeDomain(item) {
            var index = this.addFixing.domains.indexOf(item)
            if (index !== -1) {
              this.addFixing.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.addFixing.domains.push({
              name: '',
              nameEn: '',
              fixingTypeNo: '',
              key: Date.now()
            });
        },
        //显示设备信息编辑界面
        handleFixingEdit: function (index, row) {
            this.editFormFixing = true;
            this.editFixing = Object.assign({}, row);
            this.queryFixingType();
        },
        //编辑设备信息
        editFixingSubmit: function () {
            this.$refs.editFixing.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editFixingLoading = true;
                        this.$http({
                            url: 'api/fixing/manage/updateFixing',
                            method: 'post',
                            params: {
                                fixingNo: this.editFixing.fixingNo,
                                name: this.editFixing.name,
                                nameEn:  this.editFixing.nameEn,
                                roomNo:  this.editFixing.roomNo,
                                fixingTypeNo: this.editFixing.fixingTypeNo
                            }
                         }) .then(res => {
                              this.$message('修改成功！！！');
                              console.log(res.data);
                              this.editFixingLoading = false;
                              this.editFormFixing = false;
                              this.handleQuery();
                              this.queryRoomFixingTree();
                              this.editFixing = {
                                 fixingNo: '',
                                 name: '',
                                 nameEn: '',
                                 fixingTypeNo:'',
                                 roomNo:''
                              };
                         }) .catch(e => {
                               this.$message('编辑失败!');
                              console.log(e)
                         })
                    });
                }
            });
        },
        //删除设备
        handleFixingDel: function(index, row){
            console.log(row.fixingNo);
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                 this.$http({
                    url: '/fixing/manage/deleteFixing',
                    method: 'post',
                    params: {
                        fixingNo: row.fixingNo
                    }
                 }) .then(res => {
                    this.$message("删除成功！！");
                    console.log(res.data);
                    this.handleQuery();
                    this.queryRoomFixingTree();
                }).catch(e =>
                    console.log(e)
                )
             });
        },
        //显示机房信息编辑界面
        handleTypeEdit: function (data) {
            console.log(this.editForm);
            this.editFormVisible = true;
        },
        //编辑机房信息
        editSubmit: function(){
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        this.$http({
                            url: 'api/fixing/manage/updateRoomInfo',
                            method: 'post',
                            params: {
                                roomNo: this.editForm.roomNo,
                                name: this.editForm.name,
//                                nameEn: this.editForm.nameEn,
                                systemTypeNo: this.editForm.systemTypeNo
                            }
                        }) .then(res => {
                              this.$message('编辑成功！！！');
                              console.log(res.data);
                              this.editLoading = false;
                              this.editFormVisible = false;

                              this.queryRoomFixingTree();
                              this.getRoomInfo(this.editForm);

                        }) .catch(e => {
                               this.$message('保存失败!');
                              console.log(e)
                        })
                    });
                }
            });
        },
        //删除机房
        handleTypeDel: function(){
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                 this.$http({
                    url: 'api/fixing/manage/deleteRoomInfo',
                    method: 'post',
                    params: {
                        roomNo: this.editForm.roomNo
                    }
                 }) .then(res => {
                    this.$message(res.data.msg);
                    console.log(res.data);
                    this.handleQuery();
                    this.queryRoomFixingTree();
                    if(res.data.result == 'success'){
                        this.editForm = {
                            roomNo: '',
                            name: '',
                            remark: '',
                            updateDate: '',
                            systemTypeNo: '',
                            systemTypeStr: ''
                        }
                    }

                }).catch(e =>
                    console.log(e)
                )
             });
        },


    }
};
