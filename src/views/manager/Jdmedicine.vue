<template>
  <div>
    <div>
<!--      <el-input style="width: 200px" placeholder="查询用户名" v-model="username"></el-input>-->
      <el-input style="width: 200px; margin: 0 5px" placeholder="查询药品名" v-model="name"></el-input>
      <el-button type="primary" @click="load(1)">查询</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>
    <el-table :data="jdmedicines" stripe @selection-change="handleSelectionChange" height="490">
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column type="expand" width="20">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="有效期">
              <span>{{ props.row.validity }}</span>
            </el-form-item>
            <el-form-item label="药品分类">
              <span>{{ props.row.drugClassification }}</span>
            </el-form-item>
            <el-form-item label="剂型">
              <span>{{ props.row.dosageForm }}</span>
            </el-form-item>
            <el-form-item label="储存条件">
              <span>{{ props.row.storageCondition }}</span>
            </el-form-item>
            <el-form-item label="使用剂量">
              <span>{{ props.row.useDose }}</span>
            </el-form-item>
            <el-form-item label="功能主治">
              <span>{{ props.row.indications }}</span>
            </el-form-item>
            <el-form-item label="不良反应">
              <span>{{ props.row.adverseReaction }}</span>
            </el-form-item>
            <el-form-item label="儿童用药">
              <span>{{ props.row.medicineChildren }}</span>
            </el-form-item>
            <el-form-item label="老年用药">
              <span>{{ props.row.medicineGeriatric }}</span>
            </el-form-item>
            <el-form-item label="禁忌">
              <span>{{ props.row.taboo }}</span>
            </el-form-item>
            <el-form-item label="批准文号">
              <span>{{ props.row.approvalCertificate }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="药品编号" width="70" align="center"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="genericName" label="药品通用名" width="180"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
<!--      <el-table-column prop="validity" label="有效期"></el-table-column>-->
<!--      <el-table-column prop="drugClassification" label="药品分类"></el-table-column>-->
<!--      <el-table-column prop="dosageForm" label="剂型"></el-table-column>-->
<!--      <el-table-column prop="storageCondition" label="储存条件"></el-table-column>-->
<!--      <el-table-column prop="useDose" label="使用剂量"></el-table-column>-->
<!--      <el-table-column prop="indications" label="适用症/功能主治"></el-table-column>-->
<!--      <el-table-column prop="adverseReaction" label="不良反应"></el-table-column>-->
<!--      <el-table-column prop="medicineChildren" label="儿童用药"></el-table-column>-->
<!--      <el-table-column prop="medicineGeriatric" label="老年用药"></el-table-column>-->
<!--      <el-table-column prop="taboo" label="禁忌"></el-table-column>-->
<!--      <el-table-column prop="approvalCertificate" label="批准文号"></el-table-column>-->
      <el-table-column label="操作" align="center" width="180" fixed="right">
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

    <el-dialog title="药品信息" :visible.sync="formVisible" width="30%">
      <el-form :model="form" label-width="80px" style="padding-right: 20px" :rules="rules" ref="formRef">
        <el-form-item label="药品名" prop="name">
          <el-input v-model="form.name" placeholder="药品名"></el-input>
        </el-form-item>
        <el-form-item label="通用名" prop="genericName">
          <el-input v-model="form.genericName" placeholder="药品通用名"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="有效期" prop="validity">
          <el-input v-model="form.validity" placeholder="有效期"></el-input>
        </el-form-item>
        <el-form-item label="药品分类" prop="drugClassification">
          <el-input v-model="form.drugClassification" placeholder="药品分类"></el-input>
        </el-form-item>
        <el-form-item label="剂型" prop="dosageForm">
          <el-input v-model="form.dosageForm" placeholder="剂型"></el-input>
        </el-form-item>
        <el-form-item label="储存条件" prop="storageCondition">
          <el-input v-model="form.storageCondition" placeholder="储存条件"></el-input>
        </el-form-item>
        <el-form-item label="使用剂量" prop="useDose">
          <el-input v-model="form.useDose" placeholder="使用剂量"></el-input>
        </el-form-item>
        <el-form-item label="功能主治" prop="indications">
          <el-input v-model="form.indications" placeholder="适用症/功能主治"></el-input>
        </el-form-item>
        <el-form-item label="不良反应" prop="adverseReaction">
          <el-input v-model="form.adverseReaction" placeholder="不良反应"></el-input>
        </el-form-item>
        <el-form-item label="儿童用药" prop="medicineChildren">
          <el-input v-model="form.medicineChildren" placeholder="儿童用药"></el-input>
        </el-form-item>
        <el-form-item label="老年用药" prop="medicineGeriatric">
          <el-input v-model="form.medicineGeriatric" placeholder="老年用药"></el-input>
        </el-form-item>
        <el-form-item label="禁忌" prop="taboo">
          <el-input v-model="form.taboo" placeholder="禁忌"></el-input>
        </el-form-item>
        <el-form-item label="批准文号" prop="approvalCertificate">
          <el-input v-model="form.approvalCertificate" placeholder="批准文号"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.demo-table-expand {
  font-size: 0;
  margin-left: 90px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import request from "@/utils/request";
import moment from 'moment';
export default {
  name: "Jdmedicine",
  data() {
    return {
      jdmedicines: [],
      pageNum:1,
      pageSize:10,
      id:'',
      name:'',
      genericName:'',
      price:'',
      validity:'',
      drugClassification:'',
      dosageForm:'',
      storageCondition:'',
      useDose:'',
      indications:'',
      adverseReaction:'',
      medicineChildren:'',
      medicineGeriatric:'',
      taboo:'',
      approvalCertificate:'',
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
  // mounted() {
  //   request.get('/jdmedicine/selectAll').then(res => {
  //     this.jdmedicines = res.data
  //   })
  // },
  methods:{
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.id)
    },
    delBatch() {
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确认批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/jdmedicine/delete/batch', { data: this.ids }).then(res => {
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
      this.formVisible=true
    },
    del(id) {
      this.$confirm('您确认删除吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/jdmedicine/delete/' + id).then(res => {
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
      this.name=''
      this.load()
    },
    load(pageNum){
      if(pageNum){
        this.pageNum=pageNum
      }
      this.$request.get('/jdmedicine/selectByPage',{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
          // dsex:this.dsex
        }
      }).then(res=>{
        console.log(res.data)
        this.jdmedicines=res.data.records
        console.log(this.jdmedicines)
        this.total=res.data.total
      })
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$request({
            url: this.form.id ? '/jdmedicine/update': '/jdmedicine/add',
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