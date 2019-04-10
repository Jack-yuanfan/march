<template>
    <div class="user">
       <div class="header-control">
           <div class="h-left-col">
               <div class="f-l-item ">
                  <el-input v-model="userName" placeholder="请输入用户名"></el-input>
               </div>
                 <el-button type="primary" size="medium" @click="queryUser">查询</el-button>
           </div>
            <div class="h-right-col">
                  <el-button type="primary" size="medium" @click="addUser">新增</el-button>
           </div>
       </div>
         
         <div class="mian-content">
               <el-table
                    :data="userData"
                    border
                    style="width: 100%">
                    <el-table-column fixed  prop="name"  label="用户名" width="150"></el-table-column>
                    <el-table-column prop="loginName" label="登录账号" width=""></el-table-column>
                    <el-table-column prop="phone" label="电话号码" width="120"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="handleAuth(scope.row)" type="text" size="small">权限</el-button>
                            <el-button type="text" @click="handleDelete(scope.row)"  v-popover:popover5 size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="currentSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
         </div>
         
        <el-dialog title="新增用户" :visible.sync="addUserDialog">
            <el-form :model="addUserFrom" class="el-row"  :rules="addUserRules"  ref="addUserFrom" >
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="name"  class="el-col el-col-12">
                    <el-input v-model="addUserFrom.name" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="登录账号" :label-width="formLabelWidth" prop="loginName"  class="el-col el-col-12">
                    <el-input v-model="addUserFrom.loginName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone" class="el-col el-col-12">
                    <el-input v-model="addUserFrom.phone" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="登录密码" :label-width="formLabelWidth" prop="password" class="el-col el-col-12">
                    <el-input type="password" v-model="addUserFrom.password" auto-complete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="submitAdd">确 定</el-button>
            </div>
        </el-dialog>
          <el-dialog title="编辑用户信息" :visible.sync="editUserDialog">
            <el-form :model="editUserFrom" class="el-row"  :rules="addUserRules"  ref="editUserFrom" >
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="name"  class="el-col el-col-12">
                    <el-input v-model="editUserFrom.name" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="登录账号" :label-width="formLabelWidth" prop="loginName"  class="el-col el-col-12">
                    <el-input v-model="editUserFrom.loginName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone" class="el-col el-col-12">
                    <el-input v-model="editUserFrom.phone" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="重置密码" :label-width="formLabelWidth" class="el-col el-col-12">
                     <el-checkbox v-model="resetPasswprd">重置后的密码为：123456</el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelEdit">取 消</el-button>
                <el-button type="primary" @click="submitEdit">确 定</el-button>
            </div>
        </el-dialog>
       
    </div>
</template>

<script>
export default {
    name:'user',
    data(){
        return{
            userName:'',//查询用户名
            addUserDialog:false,//新增用户弹框
            editUserDialog:false,//编辑用户弹框
            formLabelWidth:'120px',
        
            addUserFrom:{//新增用户表单
                name:'',
                loginName:'',
                phone:'',
                password:''

            },
            resetPasswprd:false,
            editUserFrom:{
                name:'',
                loginName:'',
                phone:'',
                password:''
            },
            addUserRules:{
                name:[
                    { required: true, message: '请输用户名', trigger: 'input' },
                    { min: 3, max: 8, message: '长度在 3 到 6 个字符' }    
                ],
                loginName:[
                    { required: true, message: '请输用登录账号', trigger: 'input' },
                    { min: 3, max: 8, message: '长度在 6 到 12 个字符' }  
                ],
                phone:[//联系电话
                    { required: true, message: '请输入电话号码', trigger: 'input' },
                    { min: 5, max: 11, message: '电话号码长度不正确' }  
                    ],
                password:[//登录密码
                    { required: true, message: '密码不能为空', trigger: 'input' },
                    { min: 6, max: 18, message: '密码长度在 6 到 18 个字符' } 
                ]     
            },
            currentPage:1,
            currentSize:10,
            total:0,
            userData: [{
                loginName: '1234',
                name: '王小虎1',
                phone: 12345678910,
                }, {
                loginName: '1234',
                name: '王小虎2',
                phone: 12345678910,
                }, {
                loginName: '1234',
                name: '王小虎3',
                phone: 12345678910,
                }, {
               loginName: '1234',
                name: '王小虎4',
                phone: 12345678910,
                }]
        }
    },
    created(){
        this.queryUser()
    },
    methods:{
        queryUser(){
            this.$axios.post('/user/list').then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        },
        handleClick(data){//表格行按钮点击事件
            console.log(data)
        },
        addUser(){//打开新增用户弹框
            this.addUserDialog=true
        },
        cancelAdd(){//取消添加
            this.addUserDialog=false   
             this.$refs['addUserFrom'].resetFields();
        },
        submitAdd(){//确认添加
            this.$refs['addUserFrom'].validate((valid) => {
                if (valid) {
                    let params=this.addUserFrom;
                    //  this.$axios.post('',params).then(res=>{
                    //      this.$message({
                    //          type:'success',
                    //          message:'添加用户成功'
                    //      })
                    //  }).catch(err=>{
                    //      this.$message({
                    //          type:'error',
                    //          message:'添加用户失败'
                    //      })
                    //  })
                    this.addUserDialog=false;
                    this.$refs['addUserFrom'].resetFields();
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        handleEdit(data){//编辑用户信息
            console.log(data)
            this.editUserDialog=true
            this.editUserFrom=data
        },
         handleDelete(data){//删除用户
              this.$confirm('是否删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
        handleAuth(data){//修改用户权限
            console.log(data)
        },
        cancelEdit(){//取消编辑
            this.editUserDialog=false
            this.$refs['editUserFrom'].resetFields();
        },
        submitEdit(){//提交修改
            this.editUserDialog=false
            this.$refs['editUserFrom'].resetFields();
        },
        handleSizeChange(val){
            this.currentSize=val
        },
        handleCurrentChange(val){
            this.currentPage=val
        }

        
    }  
}
</script>
<style lang="less">

</style>
