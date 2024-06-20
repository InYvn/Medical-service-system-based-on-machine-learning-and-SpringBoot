<template>
  <div>
    药单信息
    <div style="margin: 10px 0">
      <el-input v-model="uid" placeholder="扫描条形码光标置于此处" style="width: 200px;margin-right: 10px"  @keyup.enter.native="load(1)"></el-input>
      <el-button type="info" @click="reset">重置</el-button>
      <el-button type="primary" plain @click="handleAdd()">开药</el-button>
      <el-button type="danger" plain @click="delBatch()">批量删除</el-button>
      <el-button type="primary" plain @click="changeStateBatch()">批量取药</el-button>
      <el-button type="primary" @click="load(1)">查询</el-button>
    </div>

    <el-table :data="vwmedicines" stripe border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="开药编号" prop="oid" width="70" align="center"></el-table-column>
      <el-table-column label="药品名" prop="medname" width="300" align="center"></el-table-column>
      <el-table-column label="病人名" prop="realname" width="150" align="center"></el-table-column>
      <el-table-column label="医生名" prop="dname" width="150" align="center"></el-table-column>
      <el-table-column label="药品数量" prop="mnumber" width="90" align="center"></el-table-column>
      <el-table-column label="开药时间" prop="ptime" width="90" align="center"></el-table-column>
      <el-table-column label="取药"  width="150" align="center">
        <template v-slot="scope">
          <el-button type="primary" plain @click="changeState(scope.row.oid)" v-if ="scope.row.state=='未取'" >取药</el-button>
          <el-button type="primary" plain disabled v-if ="scope.row.state=='已取'">取药</el-button>
        </template>
      </el-table-column>
      <el-table-column label="取药状态" prop="state" width="82" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <el-button size="mini" type="danger" plain @click="del(scope.row.oid)">删除</el-button>
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

    <el-dialog title="开药" :visible.sync="formVisible" width="30%" @close="resetForm()">
      <el-form :model="form" label-width="80px" style="padding-right: 20px" ref="formRef">
        <el-form-item label="药品名" prop="mid">
          <template>
            <el-select v-model="form.mid" filterable placeholder="请选择">
              <el-option
                  v-for="item in medicines"
                  :key="item.mid"
                  :label="item.medname"
                  :value="item.mid">
              </el-option>
            </el-select>
          </template>
<!--          <el-input v-model="form.medname" placeholder="药品名"></el-input>-->
        </el-form-item>
        <el-form-item label="病人名" prop="uid">
          <template>
            <el-select v-model="form.uid" filterable placeholder="请选择">
              <el-option
                  v-for="item in patients"
                  :key="item.uid"
                  :label="item.realname"
                  :value="item.uid">
              </el-option>
            </el-select>
          </template>
<!--          <el-input v-model="form.realname" placeholder="病人名"></el-input>-->
        </el-form-item>
        <el-form-item label="医生名" prop="did">
          <template>
            <el-select v-model="form.did" filterable placeholder="请选择">
              <el-option
                  v-for="item in doctors"
                  :key="item.did"
                  :label="item.dname"
                  :value="item.did">
              </el-option>
            </el-select>
          </template>
<!--          <el-input v-model="form.dname" placeholder="医生名"></el-input>-->
        </el-form-item>
        <el-form-item label="药品数量" prop="mnumber">
          <el-input v-model="form.mnumber" placeholder="药品数量"></el-input>
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
  name: "Vwmedicine",
  data() {
    return {
      vwmedicines: [],
      pageNum: 1,
      pageSize: 10,
      medname: '',
      realname: '',
      uid: '',
      dname: '',
      mnumber: '',
      name: '',
      mid: '',
      did: '',
      total: 0,
      formVisible: false,
      form: {},
      medicines: [],
      patients: [],
      doctors: [],
      ids: []
    }
  },
  created() {
    this.load();
    this.getMedicineName();
    this.getUserName();
    this.getDoctorName();
  },
  // mounted() {
  //   request.get('/Vwmedcine/selectAll').then(res => {
  //     this.vwmedicines = res.data
  //   })
  // },
  methods: {
    load(pageNum) {
      if (pageNum) {
        this.pageNum = pageNum
      }
      this.$request.get('/Vwmedcine/selectByPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          uid: this.uid
        }
      }).then(res => {
        this.vwmedicines = res.data.records
        console.log(this.vwmedicines)
        this.total = res.data.total
        this.uid= ''
      })

    },
    getMedicineName() {
      this.$request.get('/medicine/selectAll')
          .then(res => {
            if (res.code === '200') {
              this.medicines = [];
              res.data.forEach(item => {
                this.medicines.push({
                  mid: item.mid,
                  medname: item.medname
                });
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
    },
    getUserName() {
      this.$request.get('/user/selectAll')
          .then(res => {
            if (res.code === '200') {
              this.patients = [];
              res.data.forEach(item => {
                this.patients.push({
                  uid: item.id,
                  realname: item.realname
                });
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
    },
    getDoctorName() {
      this.$request.get('/doctor/selectAll')
          .then(res => {
            if (res.code === '200') {
              this.doctors = [];
              res.data.forEach(item => {
                this.doctors.push({
                  did: item.id,
                  dname: item.dname
                });
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
    },
    resetForm(){
      for (let key in this.form) {
        this.form[key] = '';
      }
    },
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.oid)
    },


    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.formVisible = true
    },
    handleAdd() {
      // this.form = {role: "用户"}
      this.formVisible = true
    },
    changeState(oid) {//取药
      this.$confirm('确认取药吗？', '确认取药', {type: "warning"}).then(response => {
        this.$request.put('/Vwmedcine/state/' + oid).then(res => {
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
    changeStateBatch() {
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确认已取这些药品吗？', '确认取药', {type: "warning"}).then(response => {
        this.$request.request('/Vwmedcine/states/batch', {data: this.ids}).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            //重新加载页面
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    del(oid) {
      this.$confirm('您确认删除吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/Vwmedcine/delete/' + oid).then(res => {
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
    delBatch() {
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确认批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/Vwmedcine/delete/batch', {data: this.ids}).then(res => {
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
      this.uid = ''
      this.load()
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request({
            url:  '/Vwmedcine/add',
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