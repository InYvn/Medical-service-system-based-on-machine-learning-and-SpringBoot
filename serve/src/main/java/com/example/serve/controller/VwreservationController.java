package com.example.serve.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.serve.common.Result;
import com.example.serve.entity.Reserve;
import com.example.serve.entity.Vwreservation;
import com.example.serve.service.ReserveService;
import com.example.serve.service.VwreservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/Vwreserve")
public class VwreservationController {

    @Autowired
    VwreservationService vwreservationService;

    @Autowired
    ReserveService reserveService;

    @GetMapping("/mini/{uid}")
    public List<Vwreservation> getlistByUid(@PathVariable Integer uid){
        QueryWrapper<Vwreservation> queryWrapper = new QueryWrapper<Vwreservation>().orderByDesc("id");
        queryWrapper.eq("uid",uid);
        List<Vwreservation> list = vwreservationService.list(queryWrapper);
        return list;
    }

    //查询所有预约信息
    @GetMapping("/selectAll")
    public Result selectAll(){
        List<Vwreservation> list = vwreservationService.list();
        return Result.success(list);
    }

    //分页查询预约信息
    @GetMapping("/selectByPage")
    public Result selectByPage(@RequestParam Integer pageNum,
                               @RequestParam Integer pageSize,
                               @RequestParam(required = false) Integer uid,
                               @RequestParam(required = false) Integer did){
        QueryWrapper<Vwreservation> queryWrapper = new QueryWrapper<Vwreservation>().orderByDesc("id");
        if(uid != null){
            queryWrapper.eq("uid",uid);
        }
        if(did != null){
            queryWrapper.like("did",did);
        }
        Page<Vwreservation> page = vwreservationService.page(new Page<>(pageNum,pageSize),queryWrapper);
        return Result.success(page);
    }

    //删除单个预约信息
    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable Integer id){
        reserveService.removeById(id);
        return Result.success();
    }


    //删除多个预约信息
    @DeleteMapping("/delete/batch")
    public Result deleteBatch(@RequestBody List<Integer> ids){
        reserveService.removeByIds(ids);
        return Result.success();
    }

    //新增预约信息
    @PostMapping("/add")
    public Result add(@RequestBody Reserve reserve){
        String strDate = reserve.getReservedate();
//        Date date = new Date();
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String format = simpleDateFormat.format(date);
//        reserve.setReservedate(format);
        ZonedDateTime zdt = ZonedDateTime.parse(strDate).withZoneSameInstant(ZoneId.of("Asia/Shanghai"));
        LocalDateTime ldt = zdt.toLocalDateTime();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = ldt.format(formatter);
        reserve.setReservedate(formattedDateTime);
        reserveService.save(reserve);
        return Result.success();
    }
}
