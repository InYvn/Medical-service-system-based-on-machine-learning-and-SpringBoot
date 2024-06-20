<template>
  <div>
    科室信息
    <div style="margin: 10px 0">
      <el-input v-model="kname" placeholder="请输入科室名" style="width: 200px;margin-right: 10px"></el-input>
<!--      <el-input v-model="kdoctor" placeholder="请输入科室主任" style="width: 200px;margin-right: 10px"></el-input>-->
      <el-button type="primary" @click="load(1)">查询</el-button>
      <el-button type="info" @click="reset">重置</el-button>
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>

    <el-table :data="offices" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="ID" prop="id" width="70" align="center"></el-table-column>
      <el-table-column label="科室名" prop="kname"></el-table-column>
      <el-table-column prop="kdoctor" label="科室主任">
        <template v-slot="scope">
          {{ doctors[scope.row.kdoctor - 1 ].dname ? doctors[scope.row.kdoctor - 1 ].dname : ''}}
        </template>
      </el-table-column>
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

    <el-dialog title="科室" :visible.sync="formVisible" width="30%">
      <el-form :model="form" label-width="80px" style="padding-right: 20px" ref="formRef">
        <el-form-item label="科室名" prop="kname">
          <el-input v-model="form.kname" placeholder="科室名"></el-input>
        </el-form-item>
        <el-form-item label="科室主任" prop="kdoctor">
          <el-select v-model="form.kdoctor" filterable placeholder="请选择">
            <el-option
                v-for="item in doctors"
                :key="item.kdoctor"
                :label="item.dname"
                :value="item.kdoctor">
            </el-option>

          </el-select>
          <!--          <el-input v-model="form.kid" placeholder="科室编号"></el-input>-->
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

export default {
  name: "Office",
  data() {
    return {
      offices: [],
      pageNum: 1,
      pageSize: 5,
      kname: '',
      dname: '',
      kdoctor: '',
      name: '',
      doctors:[],
      total: 0,
      formVisible: false,
      form: {},
      ids: []
    }
  },
  created() {
    this.load()
    this.getDoctorName();
  },
  mounted() {
    request.get('/office/selectAll').then(res => {
      this.offices = res.data
    })
  },
  methods: {
    load(pageNum) {
      if (pageNum) {
        this.pageNum = pageNum
      }
      this.$request.get('/office/selectByPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          kname: this.kname,
          kdoctor: this.kdoctor
        }
      }).then(res => {
        this.getDoctorName()
        this.offices = res.data.records
        this.total = res.data.total
      })

    },
    getDoctorName() {
      // Send a request to the backend API to get the department name
      this.$request.get('/doctor/selectAll')
          .then(res => {
            if (res.code === '200') {
              //处理拿到的数据
              this.doctors = [];
              console.log(res.data);
              res.data.forEach(item => {
                this.doctors.push({
                  kdoctor: item.id,
                  dname: item.dname
                });
              });
              console.log(this.doctors);
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(err => {
            console.error(err);
          });
    },
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.id)
    },
    delBatch() {
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确认批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/office/delete/batch', {data: this.ids}).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.formVisible = true
    },
    handleAdd() {
      // this.form = {role: "用户"}
      this.form = {}
      this.formVisible = true
    },
    del(id) {
      this.$confirm('您确认删除吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/office/delete/' + id).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    reset() {
      this.kname = ''
      this.kdoctor = ''
      this.load()
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request({
            url: this.form.id ? '/office/update' : '/office/add',
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
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load(pageNum)
    }
  }
}
</script>

<style scoped>

</style>