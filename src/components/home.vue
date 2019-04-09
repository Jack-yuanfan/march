<template>
    <article>
        <header class="header">
            <h1 class="mian-title">后台管理系统</h1>
            <div class="right-bdg">amdin</div>
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
    </article>
</template>

<script>
export default {
    name:'home',
    data(){
        return{
            menus:[
                {
                    name:'user',
                    path:"/user",
                    text:"用户管理",
                    icon:"el-icon-setting"
                },
                 {
                    name:'order',
                    path:"/order",
                    text:"订单管理",
                    icon:"el-icon-document"
                },
                 {
                    name:'menu',
                    path:"/menu",
                    text:"菜单管理",
                    icon:"el-icon-menu"
                }
            ]
        }
    },
    created(){

    },
    methods:{
        handleMenu(data){
            this.$router.push({name:data})
        }
    }
}
</script>
