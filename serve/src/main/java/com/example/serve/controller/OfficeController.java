package com.example.serve.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.serve.common.Result;
import com.example.serve.entity.Office;
import com.example.serve.service.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("office")
public class OfficeController {

    @Autowired
    OfficeService officeService;

    //新增科室信息
    @PostMapping("/add")
    public Result add(@RequestBody Office office){
        officeService.save(office);
        return Result.success("添加成功");
    }

    //更新科室信息
    @PutMapping("/update")
    public Result update(@RequestBody Office office){
        officeService.updateById(office);
        return Result.success("更新成功");
    }

    //删除单个科室信息
    @DeleteMapping("/delete/{id}")
    public Result  delete(@PathVariable Integer id){
        officeService.removeById(id);
        return Result.success();
    }

    //删除多个科室信息
    @DeleteMapping("/delete/batch")
    public Result  deleteBatch(@RequestBody List<Integer> ids){
        officeService.removeBatchByIds(ids);
        return Result.success();
    }

    //查询全部科室信息
    @GetMapping("/selectAll")
    public Result selectAll(){
        List<Office> offices = officeService.list();
        return Result.success(offices);
    }

    //通过id获取科室名称
    @GetMapping("/selectByID/{id}")
    public Result selectByID(@PathVariable Integer id){
        Office office = officeService.getById(id);
        return Result.success(office.getKname());
    }

    //分页查询
    @GetMapping("/selectByPage")
    public Result selectByPage(@RequestParam Integer pageNum,
                               @RequestParam Integer pageSize,
                               @RequestParam(required = false) String kname,
                               @RequestParam(required = false) String kdoctor){
        System.out.println(kdoctor);
        QueryWrapper<Office> queryWrapper = new QueryWrapper<Office>().orderByDesc("id");
        if(kname != null && !kname.isEmpty()){
            queryWrapper.eq("kname",kname);
        }
        if(kdoctor != null && !kdoctor.isEmpty()){
            queryWrapper.like("kdoctor",kdoctor);
        }
        Page<Office> page = officeService.page(new Page<>(pageNum, pageSize), queryWrapper);
        return Result.success(page);
    }
}
