<template>
    <article>
        <header class="header">
            <h1 class="mian-title">后台管理系统</h1>
             <ul class='right-bdg'>
                <li class="header-right-controls-items"   title="退出登录">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{currentUser}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
                        <el-dropdown-item command="changePassWord" >修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
        </header>
        <section class="main">
            <nav class="side-nav">
                 <el-menu
                   :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    
                    <el-menu-item v-for="item in menus" :key="item.index" :index="item.path" @click="handleMenu(item.name)">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.text}}</span>
                    </el-menu-item>
                </el-menu>
            </nav>
            <section class="main-body">
                <router-view/>
            </section>
        </section>
         <el-dialog   
                width="30%"
                title="修改用户密码" 
                append-to-body
                :visible.sync="changePss">

            <el-form :model="passWordForm" :rules="changeRules" ref='passWordForm'>

            <el-form-item label="当前密码" :label-width="formLabelWidth" prop="nowPassWord">
                <el-input  type='password'  v-model="passWordForm.nowPassWord" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassWord">
                <el-input  type='password' v-model="passWordForm.newPassWord" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="再次输入新密码" :label-width="formLabelWidth" prop="checkPassWord">
                <el-input  type='password' v-model="passWordForm.checkPassWord" autocomplete="off"></el-input>
            </el-form-item>
            
            </el-form>

            <div slot="footer" class="dialog-footer">
            <el-button @click="cancelChange('passWordForm')">取 消</el-button>
            <el-button type="primary" @click="submitChange('passWordForm')">确 定</el-button>
            </div>
        </el-dialog>
    </article>
</template>

<script>
export default {
    name:'home',
    data(){
            let nowPassWordR=(rule, value, callback)=>{
          if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
    };
     let newPassWordR=(rule, value, callback)=>{
          if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.passWordForm.checkPassWord !== '') {
            this.$refs.passWordForm.validateField('checkPassWord');
          }
          callback();
        }
    };
     let checkPassWordR=(rule, value, callback)=>{
          if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value !== this.passWordForm.newPassWord) {
            callback(new Error('两次输入密码不一致!'));
          }else{
            callback();
          }
       
        }
    }
        return{
            changePss:false,
            passWordForm:{
            nowPassWord:'',
            newPassWord:'',
            checkPassWord:''
          },
          formLabelWidth:'120px',
           changeRules:{
             nowPassWord: [ //当前密码
                  { validator: nowPassWordR, trigger: 'blur' }      
              ],
              newPassWord:[//新密码
                  { validator: newPassWordR, trigger: 'blur' }                       
              ],
              checkPassWord:[//再次输入密码
                  { validator: checkPassWordR, trigger: 'blur' }
              ],
          },
            menus:[
                // {
                //     name:'user',
                //     path:"/user",
                //     text:"用户管理",
                //     icon:"el-icon-setting"
                // },
                //  {
                //     name:'order',
                //     path:"/order",
                //     text:"订单管理",
                //     icon:"el-icon-document"
                // },
                //  {
                //     name:'menu',
                //     path:"/menu",
                //     text:"菜单管理",
                //     icon:"el-icon-menu"
                // }
            ],
            currentUser:'admin',
            useRot:{}
        }
    },
    created(){
        let userRouter=JSON.parse(sessionStorage.getItem('userRouter'));
        // console.log(userRouter)
        this.menus=this.handleRouter(userRouter[0].children)
    },
    methods:{
        handleRouter(data){
            let menus=[]
            data.forEach(item=>{
                let men={}
                men.name=item.name;
                men.path=item.path;
                men.text=item.meta.text;
                men.icon=item.meta.icon;
                menus.push(men)
            })
            return menus;
        },
        handleMenu(data){
            this.$router.push({name:data})
        },
        logOut(){
            this.$router.push({name:"login"})
        },
        changePassWord(){
               this.changePss=true;
        },
        handleCommand(command){
            if(command=='logOut'){
                this.logOut()
            }else if(command=='changePassWord'){
                this.changePassWord()
            }
        },
        cancelChange(formName){//取消修改密码并清空输入框
            this.changePss=false;
            this.$refs[formName].resetFields();
        },
        submitChange(formName){//提交修改密码
            // let userId=JSON.parse(sessionStorage.getItem('user')).userId
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.changePss=false;
                // console.log(valid,this.passWordForm)
                // this.$axios.post('/user/modifyPwd',{userId:this.userId,newPassword :this.passWordForm.checkPassWord,password:this.passWordForm.nowPassWord}).then(res=>{
                //     this.$message({
                //         type:'success',
                //         message:'密码修改成功'
                //     })
                // }).catch(err=>{
                // this.$message({
                //         type:'error',
                //         message:'密码修改失败'
                //     })
                // })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    }
}
</script>
