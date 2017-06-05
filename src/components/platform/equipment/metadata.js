export default {
    data() {
        return {
            //设备类型树
            filterText: '',
            treeData: [],
            defaultProps: {
              children: 'children',
              label: 'name'
            },
            //测点列表
            filters: {
                name: ''
            },
            page: {
                pageNo: 1,
                pageSize: 5,
                total: 0
            },
            fixingSurveyDatas: [],
            fixingTypeNo: '',
            listLoading: false,

            //设备类型添加页面
            addFormVisible: false,//新增设备类型界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入设备类型名称', trigger: 'blur' }
                ],
                nameEn: [
                    { required: true, message: '请输入英文名称', trigger: 'blur' }
                ],
                systemTypeNo: [
                     { required: true, type: 'number', message: '请选择系统类型', trigger: 'change' }
                ]
            },
            //新增设备类型数据
            addForm: {
                name: '',
                nameEn: '',
                systemTypeNo: ''
            },
            editFormVisible: false,
            editFormVisible: false,
            editLoading:false,
            //编辑设备类型界面数据
            editForm: {
                fixingTypeNo: '',
            	name: '',
            	nameEn: '',
            	updateDate: '',
            	systemTypeNo: '',
            	systemTypeStr: ''
            },

            //测点信息添加页面
            addFormSurvey: false,//新增测点界面是否显示
            addSurveyLoading: false,

            addSurvey: {
                 domains: [{
                     name: '',
                     nameEn: '',
                     surveyType:'',
                     dataType: 0,
                     unit: ''
                 }]
            },

            //编辑测点信息界面
            editFormSurvey: false,//编辑界面是否显示
            editSurveyLoading: false,
            //编辑界面数据
            editSurvey: {
                 fixingSurveyNo: '',
                 name: '',
                 nameEn: '',
                 surveyType:'',
                 dataType:'',
                 unit:'',
                 fixingTypeNo:''
            }
        }

    },
    created() {
        this.queryFixingTypeTree();
        this.handleQuery();
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
        //获取设备类型树结构
        queryFixingTypeTree() {
            this.$http.post('api/fixing/metadata/queryFixingTypeTree')
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
            this.$store.state.fixingTypeData = data;
            this.getFixingType(data);
            this.fixingTypeNo = data.fixingTypeNo;
            this.handleQuery();
        },
        //根据设备编号获取设备类型信息
        getFixingType(data) {
            let para = {
                fixingTypeNo: data.fixingTypeNo
            };
            this.$http({
                  url: 'api/fixing/metadata/getFixingType',
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
//                  this.$store.state.data = res.data;
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
        //测点类型显示转换
        formatSurveyType: function (row, column) {
             return row.surveyType == 1 ? '遥信' : row.surveyType == 2 ? '遥测' : '';
        },
        //数据类型显示转换
        formatDataType: function (row, column) {
           return row.dataType == 1 ? '整形' : row.dataType == 2 ? '浮点型' : row.dataType == 3 ? '布尔型' : '';
        },
        //测点信息列表查询
        handleQuery() {
            let param = {
                fixingTypeNo: this.fixingTypeNo,
                pageNo: this.page.pageNo,
                pageSize: this.page.pageSize,
                name: this.filters.name
            };
            this.$http({
                  url: 'api/fixing/metadata/queryFixingSurvey',
                  method: 'get',
                  params: param
            })
            .then(res => {
                  this.fixingSurveyDatas = res.data.list;
                  this.page.pageNo = res.data.pageNo;
                  this.page.total = res.data.count;
             })
             .catch(err => {
                  console.log(err);
           })
        },
        //显示设备类型新增界面
        handleAdd: function () {
            this.addFormVisible = true;
            this.addForm = {
                name: '',
                nameEn: '',
                systemTypeNo: ''
            };
        },
        //新增设备类型
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        this.$http({
                            url: 'api/fixing/metadata/addFixingType',
                            method: 'post',
                            params: {
                             name: this.addForm.name,
                             nameEn: this.addForm.nameEn,
                             systemTypeNo: this.addForm.systemTypeNo,
                             tag:'N'
                            }
                        }) .then(res => {
                              this.$message('添加成功！！！');
                              console.log(res.data);
                              this.addLoading = false;
                              this.addFormVisible = false;
                              this.queryFixingTypeTree();
//                              this.handleQuery();
                              this.addForm = {
                                name: '',
                                nameEn: '',
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
        //显示测点信息新增界面
        handleAddSurvey: function () {
            this.addFormSurvey = true;
            this.addSurvey = {
                domains: [{
                    name: '',
                    nameEn: '',
                    surveyType:'',
                    dataType:'',
                    unit:''
                }]

            };
        },
        //新增测点信息
        addSubmitSurvey: function (formName) {
            console.log(formName.domains);
             let names = '';
             let nameEns = '';
             let surveyTypes = '';
             let dataTypes = '';
             let units = '';
            for(var i = 0; i < formName.domains.length; i++){
                if(formName.domains[i].unit == ""){
                    formName.domains[i].unit = null;
                }
                if(formName.domains[i].dataType == ""){
                    formName.domains[i].dataType = 0;
                }
                if(i == formName.domains.length-1){
                   names += formName.domains[i].name;
                   nameEns += formName.domains[i].nameEn;
                   surveyTypes += formName.domains[i].surveyType;
                   dataTypes += formName.domains[i].dataType;
                   units += formName.domains[i].unit;
                }else{
                   names += formName.domains[i].name+",";
                   nameEns += formName.domains[i].nameEn+",";
                   surveyTypes += formName.domains[i].surveyType+",";
                   dataTypes += formName.domains[i].dataType+",";
                   units += formName.domains[i].unit+",";
                }
            }
            this.$refs.addSurvey.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addSurveyLoading = true;
                        this.$http({
                            url: 'api/fixing/metadata/addFixingSurvey',
                            method: 'get',
                            params: {
                                   name: names,
                                   nameEn: nameEns,
                                   surveyTypes: surveyTypes,
                                   dataType: dataTypes,
                                   unit: units,
                                   fixingTypeNo:this.$store.state.fixingTypeData.fixingTypeNo
                            }
                         }) .then(res => {
                              this.$message('添加成功！！！');
                              console.log(res.data);
                              this.addSurveyLoading = false;
                              this.addFormSurvey = false;
                              this.handleQuery();
                              this.queryFixingTypeTree();
                              this.addSurvey = {
                                   domains: [{
                                       name: '',
                                       nameEn: '',
                                       surveyType:'',
                                       dataType:'',
                                       unit:''
                                   }]
                              };
                         }) .catch(e => {
                               this.addSurveyLoading = false;
                               this.$message('保存失败!');
                               console.log(e)
                         })
                    });
                }
            });
        },
        removeDomain(item) {
            var index = this.addSurvey.domains.indexOf(item)
            if (index !== -1) {
              this.addSurvey.domains.splice(index, 1)
            }
        },
        addDomain() {
            this.addSurvey.domains.push({
              name: '',
              nameEn: '',
              surveyType:'',
              dataType:'',
              unit:'',
              key: Date.now()
            });
        },
        //显示测点信息编辑界面
        handleSurveyEdit: function (index, row) {
            this.editFormSurvey = true;
            this.editSurvey = Object.assign({}, row);
        },
        //编辑测点信息
        editSurveySubmit: function () {
            this.$refs.editSurvey.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editSurveyLoading = true;
                        this.$http({
                            url: 'api/fixing/metadata/updateFixingSurvey',
                            method: 'post',
                            params: {
                                fixingSurveyNo: this.editSurvey.fixingSurveyNo,
                                name: this.editSurvey.name,
                                nameEn:  this.editSurvey.nameEn,
                                surveyType:  this.editSurvey.surveyType,
                                dataType:  this.editSurvey.dataType,
                                unit:  this.editSurvey.unit,
                                fixingTypeNo: this.editSurvey.fixingTypeNo
                            }
                         }) .then(res => {
                              this.$message('修改成功！！！');
                              console.log(res.data);
                              this.editSurveyLoading = false;
                              this.editFormSurvey = false;
                              this.handleQuery();
                              this.queryFixingTypeTree();
                              this.editSurvey = {
                                   name: '',
                                   nameEn: '',
                                   surveyType:'',
                                   dataType:'',
                                   unit:''
                              };
                         }) .catch(e => {
                               this.$message('编辑失败!');
                              console.log(e)
                         })
                    });
                }
            });
        },
        //删除测点
        handleSurveyDel: function(index, row){
            console.log(row.fixingSurveyNo);
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                 this.$http({
                    url: 'api/fixing/metadata/deleteFixingSurvey',
                    method: 'post',
                    params: {
                        fixingSurveyNo: row.fixingSurveyNo
                    }
                 }) .then(res => {
                    this.$message("删除成功！！");
                    console.log(res.data);
                    this.handleQuery();
                    this.queryFixingTypeTree();
                }).catch(e =>
                    console.log(e)
                )
             });
        },
        //显示设备类型编辑界面
        handleTypeEdit: function (data) {
            console.log(this.editForm);
            this.editFormVisible = true;
        },
        //编辑设备类型
        editSubmit: function(){
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        this.$http({
                            url: 'api/fixing/metadata/updateFixingType',
                            method: 'post',
                            params: {
                                fixingTypeNo: this.editForm.fixingTypeNo,
                                name: this.editForm.name,
                                nameEn: this.editForm.nameEn,
                                systemTypeNo: this.editForm.systemTypeNo
                            }
                        }) .then(res => {
                              this.$message('编辑成功！！！');
                              console.log(res.data);
                              this.editLoading = false;
                              this.editFormVisible = false;

                              this.queryFixingTypeTree();
                              this.getFixingType(this.editForm);
//                              this.editForm = {
//                                    fixingTypeNo: '',
//                                    name: '',
//                                    nameEn: '',
//                                    updateDate: '',
//                                    systemTypeNo: '',
//                                    systemTypeStr: ''
//                              }
                        }) .catch(e => {
                               this.$message('保存失败!');
                              console.log(e)
                        })
                    });
                }
            });
        },
        //删除设备类型
        handleTypeDel: function(){
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                 this.$http({
                    url: 'api/fixing/metadata/deleteFixingType',
                    method: 'post',
                    params: {
                        fixingTypeNo: this.editForm.fixingTypeNo,
                        tag:'Y'
                    }
                 }) .then(res => {
                    this.$message(res.data.msg);
                    console.log(res.data);
                    this.handleQuery();
                    this.queryFixingTypeTree();
                    if(res.data.result == 'success'){
                        this.editForm = {
                            fixingTypeNo: '',
                            name: '',
                            nameEn: '',
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

