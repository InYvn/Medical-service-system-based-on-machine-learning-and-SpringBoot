package com.example.serve.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.serve.common.Result;
import com.example.serve.entity.Jdmedicine;
import com.example.serve.service.JdmedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/jdmedicine")
public class JdmedicineController {

    @Autowired
    JdmedicineService jdmedicineService;

    //新增药品信息
    @PostMapping("/add")
    public Result add(@RequestBody Jdmedicine jdmedicine){
        jdmedicineService.save(jdmedicine);
        return Result.success("添加成功");
    }

    //更新药品信息
    @PutMapping("/update")
    public Result update(@RequestBody Jdmedicine jdmedicine){
        jdmedicineService.updateById(jdmedicine);
        return Result.success("更新成功");
    }

    //删除单个药品信息
    @DeleteMapping("/delete/{id}")
    public Result deleteById(@PathVariable Integer id){
        jdmedicineService.removeById(id);
        return Result.success();
    }

    //删除多个药品信息
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids){
        jdmedicineService.removeByIds(ids);
        return Result.success();
    }

    //查询全部药品信息
    @GetMapping("/selectAll")
    public Result selectAll(){
        List<Jdmedicine> list = jdmedicineService.list();
        return Result.success(list);
    }

    @GetMapping("/selectByPage")
    public Result selectByPage(@RequestParam Integer pageNum,
                               @RequestParam Integer pageSize,
                               @RequestParam(required = false) String name) {
        QueryWrapper<Jdmedicine> queryWrapper = new QueryWrapper<Jdmedicine>().orderByDesc("id");
        if (name != null) {
            queryWrapper.like("name", name);
        }
        Page<Jdmedicine> page = jdmedicineService.page(new Page<>(pageNum, pageSize), queryWrapper);
        return Result.success(page);
    }
}
