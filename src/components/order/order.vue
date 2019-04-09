<template>
    <div class="order">
        <div class="header-control">
            <div class="h-left-col">
               <div class="f-l-item ">
                  <el-input v-model="orderNum" placeholder="请输入订单号"></el-input>
               </div>
                 <el-button type="primary" size="medium" @click="queryOrder">查询</el-button>
           </div>
            <div class="h-right-col">
                  <el-button type="primary" size="medium" @click="importOrder">导入</el-button>
           </div>
       </div>

        <div class="mian-content">
             <el-table
                    :data="orderTable"
                    border
                    style="width: 100%">
                    <el-table-column fixed  prop="date"  label="采购申请" width="150"></el-table-column>
                    <el-table-column prop="name" label="采购申请行项目" width="120"></el-table-column>
                    <el-table-column prop="province" label="采购订单" width="120"></el-table-column>
                    <el-table-column prop="city" label="采购订单行项目" width="120"></el-table-column>
                    <el-table-column prop="address" label="需求批次" width="150"></el-table-column>
                    <el-table-column prop="address" label="配送中心" width="150"></el-table-column>
                    <el-table-column prop="address" label="匹配编号" width="150"></el-table-column>
                    <el-table-column prop="address" label="是否图纸确认" width="150"></el-table-column>
                    <el-table-column prop="address" label="抽检审批状态" width="150"></el-table-column>
                    <el-table-column prop="address" label="物料编码" width="150"></el-table-column>
                    <el-table-column prop="address" label="物料描述" width="250"></el-table-column>
                    <el-table-column prop="address" label="物料类型" width="150"></el-table-column>
                    <el-table-column prop="address" label="技术规范书" width="150"></el-table-column>
                    <el-table-column prop="address" label="数量" width="150"></el-table-column>
                    <el-table-column prop="address" label="不含税单价" width="150"></el-table-column>
                    <el-table-column prop="address" label="税率" width="150"></el-table-column>
                    <el-table-column prop="address" label="税额" width="150"></el-table-column>
                    <el-table-column prop="address" label="不含税总价" width="150"></el-table-column>
                    <el-table-column prop="address" label="总价" width="150"></el-table-column>
                    <el-table-column prop="address" label="计量单位" width="150"></el-table-column>
                    <el-table-column prop="address" label="WBS" width="150"></el-table-column>
                    <el-table-column prop="address" label="框架协议" width="150"></el-table-column>
                    <el-table-column prop="address" label="框架协议行项目" width="150"></el-table-column>
                    <el-table-column prop="address" label="供应商编码" width="150"></el-table-column>
                    <el-table-column prop="address" label="供应商名称" width="150"></el-table-column>
                    <el-table-column prop="address" label="ERP交货日期" width="150"></el-table-column>
                    <el-table-column prop="address" label="采购组" width="150"></el-table-column>
                    <el-table-column prop="address" label="项目属性" width="150"></el-table-column>
                    <!-- <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="handleAuth(scope.row)" type="text" size="small">权限</el-button>
                            <el-button type="text" @click="handleDelete(scope.row)"  size="small">删除</el-button>
                        </template>
                    </el-table-column> -->
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
        <el-dialog
            title="导入数据"
            :visible.sync="importDialog"
            width="35%"
            append-to-body
             :before-close="handleClose"
            >
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelImport">取 消</el-button>
            </span>
        </el-dialog>
       
    </div>
</template>

<script>
export default {
    name:'order',
    data(){
        return{
            orderNum:'',//查询订单号
            importDialog:false,//导入订单弹框
            orderTable:[],//订单数据
            currentPage:1,//当前页面
            currentSize:10,//页面显示条数
            total:0,//总订单数量
            fileList:[],//上穿文件列表
            importDialog:false
        }
    },
    created(){

    },
    methods:{
        queryOrder(){//查询订单
            console.log(this.orderNum)
        },
        importOrder(){//导入订单
            this.importDialog=true
        },
        handleClose(){
            this.importDialog=false
            this.fileList=[]
        },
        cancelImport(){
            this.importDialog=false
        },
        submitUpload() {//上传文件
            this.$refs.upload.submit();
           
        },
        handleRemove(file, fileList) {//删除选中文件
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleSizeChange(val){
            this.currentSize=val
        },
        handleCurrentChange(val){
            this.currentPage=val
        }

    },
    watch:{
        
    }    
}
</script>
<style lang="less">

</style>
