package com.example.serve.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.serve.common.Result;
import com.example.serve.entity.Medicine;
import com.example.serve.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/medicine")
public class MedicineController {

    @Autowired
    MedicineService medicineService;

    //新增药品信息
    @PostMapping("/add")
    public Result add(@RequestBody Medicine medicine){
        medicineService.save(medicine);
        return Result.success("添加成功");
    }

    //更新药品信息
    @PutMapping("/update")
    public Result update(@RequestBody Medicine medicine){
        medicineService.updateById(medicine);
        return Result.success("更新成功");
    }

    //删除单个药品信息
    @DeleteMapping("/delete/{id}")
    public Result deleteById(@PathVariable Integer id){
        medicineService.removeById(id);
        return Result.success();
    }

    //删除多个药品信息
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids){
        medicineService.removeByIds(ids);
        return Result.success();
    }

    //查询全部药品信息
    @GetMapping("/selectAll")
    public Result selectAll(){
        List<Medicine> list = medicineService.list();
        return Result.success(list);
    }

    @GetMapping("/selectByPage")
    public Result selectByPage(@RequestParam Integer pageNum,
                               @RequestParam Integer pageSize,
                               @RequestParam(required = false) String medname) {
        QueryWrapper<Medicine> queryWrapper = new QueryWrapper<Medicine>().orderByDesc("mid");
        if (medname != null) {
            queryWrapper.like("medname", medname);
        }
        Page<Medicine> page = medicineService.page(new Page<>(pageNum, pageSize), queryWrapper);
        return Result.success(page);
    }
}
