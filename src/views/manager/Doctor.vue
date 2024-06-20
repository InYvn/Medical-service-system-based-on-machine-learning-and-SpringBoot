<template>
  <div>
    医生信息
    <div>
<!--      <el-input style="width: 200px" placeholder="查询用户名" v-model="username"></el-input>-->
      <el-input style="width: 200px; margin: 0 5px" placeholder="查询姓名" v-model="dname"></el-input>
<!--      <el-select style="width: 200px; margin: 0 5px" v-model="dsex" placeholder="请选择性别">-->
<!--        <el-option label="查询性别" value=""></el-option>-->
<!--        <el-option label="男" value="男"></el-option>-->
<!--        <el-option label="女" value="女"></el-option>-->
<!--      </el-select>-->
      <el-select v-model="kid" filterable placeholder="查询科室">
        <el-option
            v-for="item in offices"
            :key="item.kid"
            :label="item.kname"
            :value="item.kid">
        </el-option>

      </el-select>
      <el-button type="primary" @click="load(1)">查询</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>
    <el-table :data="doctors" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="ID"  width="70" align="center"></el-table-column>
      <el-table-column prop="dname" label="姓名"></el-table-column>
      <el-table-column prop="dsex" label="性别"></el-table-column>
      <el-table-column prop="kid" label="科室名">
        <template v-slot="scope">
          {{ offices[scope.row.kid - 1 ].kname }}
        </template>
      </el-table-column>
      <el-table-column prop="dphone" label="手机号"></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
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

    <el-dialog title="医生信息" :visible.sync="formVisible" width="30%">
      <el-form :model="form" label-width="80px" style="padding-right: 20px" :rules="rules" ref="formRef">
        <el-form-item label="姓名" prop="dname">
          <el-input v-model="form.dname" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="dsex">
          <el-radio-group v-model="form.dsex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="科室" prop="kid">
          <el-select v-model="form.kid" filterable placeholder="请选择">
            <el-option
                v-for="item in offices"
                :key="item.kid"
                :label="item.kname"
                :value="item.kid">
            </el-option>

          </el-select>
<!--          <el-input v-model="form.kid" placeholder="科室编号"></el-input>-->
        </el-form-item>
        <el-form-item label="手机号" prop="dphone">
          <el-input v-model="form.dphone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="form.position" placeholder="职位"></el-input>
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
  name: "Doctor",
  data() {
    return {
      doctors: [],
      pageNum:1,
      pageSize:10,
      dname:'',
      dsex:'',
      kid:'',
      total:0,
      offices:[],
      formVisible: false,
      form: {},
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ]
      },
      ids:[]
    }
  },
  created() {
    this.load()
    this.getDepartmentName()
  },
  mounted() {
    request.get('/doctor/selectAll').then(res => {
      this.doctors = res.data
    })
  },
  methods:{
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.id)
    },
    getDepartmentName() {
      // Send a request to the backend API to get the department name
      this.$request.get('/office/selectAll')
          .then(res => {
            if (res.code === '200') {
              //处理拿到的数据
              this.offices = [];
              console.log(res.data);
              res.data.forEach(item => {
                this.offices.push({
                  kid: item.id,
                  kname: item.kname
                });
              });
              console.log(this.offices[1].kname);
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(err => {
            console.error(err);
          });
    },
    displayDate(value) {
      return value ? moment(value).format('YYYY-MM-DD') : '';
    },
    delBatch() {
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确认批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/doctor/delete/batch', { data: this.ids }).then(res => {
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
        this.$request.delete('/doctor/delete/' + id).then(res => {
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
      this.dname=''
      this.dsex=''
      this.kid=''
      this.load()
    },
    load(pageNum){
      if(pageNum){
        this.pageNum=pageNum
      }
      this.$request.get('/doctor/selectByPage',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          dname:this.dname,
          dsex:this.dsex,
          kid:this.kid
        }
      }).then(res=>{
        this.getDepartmentName()
        this.doctors=res.data.records
        this.total=res.data.total
      })
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request({
            url: this.form.id ? '/doctor/update': '/doctor/add',
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