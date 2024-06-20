package com.example.serve.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.serve.common.Result;
import com.example.serve.entity.Doctor;
import com.example.serve.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/doctor")
public class DoctorController {

    @Autowired
    DoctorService doctorService;

    @GetMapping("/mini/{kid}")
    public List<Doctor> getPatientById(@PathVariable Integer kid){
        QueryWrapper<Doctor> queryWrapper = new QueryWrapper<Doctor>().orderByDesc("id");
        queryWrapper.eq("kid",kid);
        List<Doctor> list = doctorService.list(queryWrapper);
        return list;
    }

    //新增医生信息
    @PostMapping("/add")
    public Result add(@RequestBody Doctor doctor){
        doctorService.save(doctor);
        return Result.success("添加成功");
    }

    //更新医生信息
    @PutMapping("/update")
    public Result update(@RequestBody Doctor doctor){
        doctorService.updateById(doctor);
        return Result.success("更新成功");
    }

    //删除单个医生信息
    @DeleteMapping("/delete/{id}")
    public Result deleteById(@PathVariable Integer id){
        doctorService.removeById(id);
        return Result.success();
    }

    //删除多个医生信息
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids){
        doctorService.removeByIds(ids);
        return Result.success();
    }

    //查询全部医生信息
    @GetMapping("/selectAll")
    public Result selectAll(){
        List<Doctor> list = doctorService.list();
        return Result.success(list);
    }

    @GetMapping("/selectByPage")
    public Result selectByPage(@RequestParam Integer pageNum,
                                     @RequestParam Integer pageSize,
                                     @RequestParam(required = false) String dname,
                                     @RequestParam(required = false) String dsex,
                                     @RequestParam(required = false) Integer kid){
        QueryWrapper<Doctor> queryWrapper = new QueryWrapper<Doctor>().orderByDesc("id");
        if(dname != null){
            queryWrapper.like("dname",dname);
        }
        if(dsex != null){
            queryWrapper.like("dsex",dsex);
        }
        if(kid != null){
            queryWrapper.eq("kid",kid);
        }
        Page<Doctor> page = doctorService.page(new Page<>(pageNum,pageSize),queryWrapper);
        return Result.success(page);
    }


}
