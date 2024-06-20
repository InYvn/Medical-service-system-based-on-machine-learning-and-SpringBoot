<template>
  <div>
    用户信息
    <div>
      <el-input style="width: 200px" placeholder="查询用户名" v-model="username"></el-input>
      <el-input style="width: 200px; margin: 0 5px" placeholder="查询姓名" v-model="realname"></el-input>
      <el-select style="width: 200px; margin: 0 5px" v-model="sex" placeholder="请选择性别">
        <el-option label="查询性别" value=""></el-option>
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
      </el-select>
      <el-select style="width: 200px; margin: 0 5px" v-model="role" placeholder="请选择角色">
        <el-option label="查询角色" value=""></el-option>
        <el-option label="管理员" value="管理员"></el-option>
        <el-option label="用户" value="用户"></el-option>
      </el-select>
      <el-button type="primary" @click="load(1)">查询</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>
<!--    <el-table :data="users" stripe @selection-change="handleSelectionChange">-->
<!--      <el-table-column type="selection" width="55" align="center"></el-table-column>-->
<!--      <el-table-column prop="id" label="ID"  width="70" align="center"></el-table-column>-->
<!--      <el-table-column prop="username" label="用户名"></el-table-column>-->
<!--      <el-table-column prop="realname" label="姓名"></el-table-column>-->
<!--      <el-table-column label="性别">-->
<!--        <template v-slot="scope">-->
<!--          {{ displayGender(scope.row.sex) }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="phone" label="手机号"></el-table-column>-->
<!--      <el-table-column prop="email" label="邮箱"></el-table-column>-->
<!--      <el-table-column prop="address" label="地址"></el-table-column>-->
<!--&lt;!&ndash;      <el-table-column prop="birthday" label="出生日期"></el-table-column>&ndash;&gt;-->
<!--      <el-table-column label="出生日期">-->
<!--        <template v-slot="scope">-->
<!--          {{ displayDate(scope.row.birthday) }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="role" label="角色"></el-table-column>-->
<!--      <el-table-column label="操作" align="center" width="180">-->
<!--        <template v-slot="scope">-->
<!--          <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>-->
<!--          <el-button size="mini" type="danger" plain @click="del(scope.row.id)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

    <el-table :data="users" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="ID"  width="70" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="60" ></el-table-column>
      <el-table-column prop="realname" label="姓名" width="60" ></el-table-column>
      <el-table-column label="性别" width="50">
        <template v-slot="scope">
          {{ displayGender(scope.row.sex) }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号"  width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <!--      <el-table-column prop="birthday" label="出生日期"></el-table-column>-->
      <el-table-column label="出生日期" width="90">
        <template v-slot="scope">
          {{ displayDate(scope.row.birthday) }}
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template v-slot="scope">
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" plain @click="del(scope.row.id)">删除</el-button>
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

    <el-dialog title="用户信息" :visible.sync="formVisible" width="30%">
      <el-form :model="form" label-width="80px" style="padding-right: 20px" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="form.realname" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="textarea" v-model="form.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
              v-model="form.birthday"
              align="right"
              type="date"
              placeholder="选择日期"
              >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="form.role">
            <el-radio label="管理员"></el-radio>
            <el-radio label="用户"></el-radio>
          </el-radio-group>
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
  name: "User",
  data() {
    return {
      users: [],
      pageNum:1,
      pageSize:5,
      username:'',
      realname:'',
      sex:'',
      role:'',
      total:0,
      formVisible: false,
      form: {},
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
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
    request.get('/user/selectAll').then(res => {
      this.users = res.data
    })
  },
  methods:{
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.id)
    },
    displayDate(value) {
      return value ? moment(value).format('YYYY-MM-DD') : '';
    },
    displayGender(value) {
      if (value === '1') {
        return '男';
      } else if (value === '2') {
        return '女';
      } else {
        return '';
      }
    },
    delBatch() {
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确认批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/user/delete/batch', { data: this.ids }).then(res => {
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
        this.$request.delete('/user/delete/' + id).then(res => {
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
      this.realname=''
      this.username=''
      this.sex=''
      this.role=''
      this.load()
    },
    load(pageNum){
      if(pageNum){
        this.pageNum=pageNum
      }
      this.$request.get('/user/selectByPage',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          username:this.username,
          realname:this.realname,
          role:this.role,
          sex:this.sex
        }
      }).then(res=>{
        this.users=res.data.records
        this.total=res.data.total
      })
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request({
            url: this.form.id ? '/user/update': '/user/add',
            method: this.form.id ? 'PUT' : 'POST',
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