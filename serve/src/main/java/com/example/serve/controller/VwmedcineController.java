package com.example.serve.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.serve.common.Result;
import com.example.serve.entity.Prescription;
import com.example.serve.entity.Vwmedcine;
import com.example.serve.service.PrescriptionService;
import com.example.serve.service.VwmedcineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/Vwmedcine")
public class VwmedcineController {

    @Autowired
    VwmedcineService vwmedcineService;

    @Autowired
    PrescriptionService prescriptionService;

    @GetMapping("/{state}/{uid}")
    public List<Vwmedcine> getPatientByUid(@PathVariable Integer uid, @PathVariable String state){
        QueryWrapper<Vwmedcine> queryWrapper = new QueryWrapper<Vwmedcine>().orderByDesc("oid");
        queryWrapper.eq("uid",uid)
                    .eq("state",state);
        List<Vwmedcine> list = vwmedcineService.list(queryWrapper);
        return list;
    }

    //查询所有开药信息
    @GetMapping("/selectAll")
    public Result selectAll(){
        List<Vwmedcine> list = vwmedcineService.list();
        return Result.success(list);
    }

    //分页查询开药信息
    @GetMapping("/selectByPage")
    public Result selectByPage(@RequestParam Integer pageNum,
                               @RequestParam Integer pageSize,
                               @RequestParam(required = false) Integer uid){
        QueryWrapper<Vwmedcine> queryWrapper = new QueryWrapper<Vwmedcine>().orderByDesc("oid");
        if(uid != null){
            queryWrapper.eq("uid",uid);
            queryWrapper.like("state","未取");
        }
        Page<Vwmedcine> page = vwmedcineService.page(new Page<>(pageNum,pageSize),queryWrapper);
        return Result.success(page);
    }

    //更改取药状态
    @PutMapping("/state/{oid}")
    public Result update(@PathVariable Integer oid){
        Prescription byId = prescriptionService.getById(oid);
        byId.setState("已取");
        prescriptionService.updateById(byId);
//        vwmedcineService.updateById(vwmedcine);
        return Result.success("更新成功");
    }

    //批量更改取药状态
    @RequestMapping("/states/batch")
    public Result updateBatch(@RequestBody List<Integer> ids){
        for (Integer id : ids) {
            Prescription byId = prescriptionService.getById(id);
            byId.setState("已取");
            prescriptionService.updateById(byId);
        }
        return Result.success("更新成功");
    }

    //删除单个开药信息
    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable Integer id){
        prescriptionService.removeById(id);
        return Result.success();
    }

    //删除多个开药信息
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids){
        prescriptionService.removeByIds(ids);
        return Result.success();
    }

    //新增开药信息
    @PostMapping("/add")
    public Result add(@RequestBody Prescription prescription){
        prescription.setState("未取");
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format = simpleDateFormat.format(date);
        prescription.setPtime(format);
        prescriptionService.save(prescription);
        return Result.success();
    }

}
