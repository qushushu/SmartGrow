<template>
    <div>
        <!-- 头部 start -->
        <Head></Head>
        <!-- 头部 end -->
        <!-- 导航 start -->
        <Nav></Nav>
        <!-- 导航 end -->
        <div class="container-fluid ym-main">
            <a-card>
                <!-- 标题 start -->
                <PageHeader title="用户管理" goBack=false></PageHeader>
                <!-- 标题 end -->
                <!-- 创建用户 start -->
                <div class="space-btm1">
                    <el-button type="primary" size="small" @click="showCreateUser">创建用户</el-button>
                </div>
                <!-- 创建用户 end -->
                <el-table :data="tableData" border style="width: 100%"stripe size="small"tooltip-effect="dark"> 
                    <el-table-column prop="id" label="id" width="40"> </el-table-column>
                    <el-table-column prop="account" label="用户名"> </el-table-column>
                    <el-table-column prop="role" label="身份" width="94"> </el-table-column>
                    <el-table-column prop="phone" label="电话"> </el-table-column>
                    <el-table-column prop="email" label="email"> </el-table-column>
                    <el-table-column label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button size="mini" type="danger" v-if="scope.row.role == '普通用户'" @click="delUser(scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="创建用户" :visible.sync="dialogVisible">
                    <el-form ref="r" :model="r" label-width="80px" size="mini" modal="true" :rules="rules">
                        <el-form-item label="用户名" prop="account"><el-input v-model="r.account"></el-input></el-form-item>
                        <el-form-item label="密码" prop="password" ><el-input v-model="r.password" show-password></el-input></el-form-item>
                        <el-form-item label="电话" prop="phone"><el-input v-model="r.phone"></el-input></el-form-item>
                         <el-form-item label="email" prop="email"><el-input v-model="r.email"></el-input></el-form-item>
                        <el-form-item> 
                            <el-button @click="resetForm('r')">取 消</el-button>
                            <el-button type="primary" @click="submitForm('r')">确 定</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </a-card>
        </div>
    </div>
</template>
<style scoped>
    .space-btm1 {margin-bottom: 20px;}
</style>
<script>
    import Head from "./common/Head"
    import Nav from "./common/Nav"
    import PageHeader from "./common/PageHeader"
    import {getUserPower} from "../assets/tools/tool"
    import axios from 'axios'
    import md5 from "md5"
    export default {
        data() {
            return {
                tableData: [],
                dialogVisible: false,
                r: {
                    account: "",
                    password: "",
                    phone: "",
                    email: "",
                },
                rules: {
                    account: [{ required: true, message: '请输入用户名', trigger: 'change' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'change'}]
                }
            }
        },
        components: {
            Head,
            Nav,
            PageHeader
        },
        computed: {
            apiurl() {
                return this.$store.state.apiurl;
            },
            userPower() {
                return this.$store.state.userPower;
            }
        },
        methods: {
            delUser({id}) {
                this.$confirm('确认删除该用户？', '确认信息', {
                  distinguishCancelAndClose: true,
                  confirmButtonText: '确认',
                  cancelButtonText: '取消'
                }).then(_=> {
                    axios({
                        method: "post",
                        url: `${this.apiurl}/la/user/delete`,
                        data: {
                            data: {
                                id
                            }
                        }
                    }).then(data => {
                        if(data.data.code === 200) {
                            this.$message({
                              type: 'success',
                              message: '删除成功'
                            });
                            this.getAllUser();
                        } else {
                            this.$message({
                              type: 'error',
                              message: '删除失败'
                            });
                        }
                    })
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false;
                this.r.account = "";
                this.r.password = "";
                this.r.phone = "";
                this.r.email = "";
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if(valid) {
                        let data = {
                            account: this.r.account,
                            password: md5(this.r.password),
                            role: 1,
                            phone: this.r.phone,
                            email: this.r.email,
                        }
                        axios({
                            method: "post",
                            url: `${this.apiurl}/la/user/add`,
                            data: {
                                data
                            }
                        }).then(data=> {
                            if(data.data.code === 200) {
                                this.$message({
                                  type: 'success',
                                  message: '创建成功'
                                });
                                this.resetForm(formName);
                                this.getAllUser();
                            }
                        })
                    } else {
                        return false;
                    }
                })
            },
            showCreateUser() {
               this.dialogVisible = true;
            },
            getAllUser() {
                axios({
                    url: `${this.apiurl}/la/user/get_list`,
                    method: "post",
                    data: {
                        data: {
                            
                        }
                    }
                }).then(data => {
                    data.data.data = data.data.data.map(item => {
                        switch(item.role) {
                            case '1':
                                item.role = "普通用户"
                            break;
                            case '2':
                                item.role = "管理员"
                            break;
                        }
                        return item;
                    })
                    this.tableData = data.data.data;
                })
            },
            autoJump() {
                if(getUserPower() !== 2) {
                    this.$router.replace("/");
                }
            }
        },
        mounted() {
            this.getAllUser();
            this.autoJump();
        }
    }
</script>