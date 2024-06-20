<template>
  <div>
    药品信息
    <div>
<!--      <el-input style="width: 200px" placeholder="查询用户名" v-model="username"></el-input>-->
      <el-input style="width: 200px; margin: 0 5px" placeholder="查询药品名" v-model="medname"></el-input>
      <el-button type="primary" @click="load(1)">查询</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>
    <el-table :data="medicines" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="mid" label="药品编号" width="70" align="center"></el-table-column>
      <el-table-column prop="medname" label="药品名"></el-table-column>
      <el-table-column prop="factory" label="生产厂家"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="badtime" label="保质期"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template v-slot="scope">
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" plain @click="del(scope.row.mid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="药品信息" :visible.sync="formVisible" width="30%">
      <el-form :model="form" label-width="80px" style="padding-right: 20px" :rules="rules" ref="formRef">
        <el-form-item label="药品名" prop="medname">
          <el-input v-model="form.medname" placeholder="药品名"></el-input>
        </el-form-item>
        <el-form-item label="生产厂家" prop="factory">
          <el-input v-model="form.factory" placeholder="生产厂家"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="保质期" prop="badtime">
          <el-input v-model="form.badtime" placeholder="保质期"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import moment from 'moment';
export default {
  name: "Medicine",
  data() {
    return {
      medicines: [],
      pageNum:1,
      pageSize:10,
      mid:'',
      medname:'',
      factory:'',
      price:'',
      badtime:'',
      total:0,
      formVisible: false,
      form: {},
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      rules: {
        // name: [
        //   { required: true, message: '请输入姓名', trigger: 'blur' },
        // ]
      },
      ids:[]
    }
  },
  created() {
    this.load()
  },
  mounted() {
    // 页面加载完成之后触发
    // axios.get('http://localhost:9090/user/selectAll').then(res => {
    //   console.log(res.data)   // 后台返回的数据
    //   // res.data = {   // 数据格式
    //   //   code: '200',
    //   //   msg: '请求成功',
    //   //   data: {
    //   //
    //   //   }
    //   // }
    //   })
    request.get('/medicine/selectAll').then(res => {
      this.medicines = res.data
    })
  },
  methods:{
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.mid)
    },
    // displayDate(value) {
    //   return value ? moment(value).format('YYYY-MM-DD') : '';
    // },
    delBatch() {
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确认批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/medicine/delete/batch', { data: this.ids }).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {})
    },
    handleEdit(row){
      this.form =JSON.parse(JSON.stringify(row))
      this.formVisible=true
    },
    handleAdd(){
      this.form={role:"用户"}
      this.formVisible=true
    },
    del(id) {
      this.$confirm('您确认删除吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/medicine/delete/' + id).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {})
    },
    reset(){
      this.medname=''
      this.load()
    },
    load(pageNum){
      if(pageNum){
        this.pageNum=pageNum
      }
      this.$request.get('/medicine/selectByPage',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          medname:this.medname,
          // dsex:this.dsex
        }
      }).then(res=>{
        this.medicines=res.data.records
        this.total=res.data.total
      })
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request({
            url: this.form.mid ? '/medicine/update': '/medicine/add',
            method: this.form.mid ? 'PUT' : 'POST',
            data: this.form
          }).then(res => {
            if (res.code === '200') {  // 表示成功保存
              this.$message.success('保存成功')
              this.load(1)
              this.formVisible = false
            } else {
              this.$message.error(res.msg)  // 弹出错误的信息
            }
          })
        }
      })
    },
    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load(pageNum)
    }
  }
}
</script>

<style scoped>

</style>