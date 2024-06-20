package com.example.serve.controller;

import cn.hutool.core.lang.Console;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.serve.common.Result;
import com.example.serve.entity.Reserve;
import com.example.serve.service.ReserveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/reserve")
public class ReserveController {

    @Autowired
    ReserveService reserveService;

    @GetMapping("/mini/findid/{id}")
    public Reserve findById(@PathVariable Integer id){
        Reserve res = reserveService.getById(id);
        return res;
    }

    @PostMapping("/mini/add")
    public Reserve addmini(@RequestBody Reserve reserve){
        DealDate(reserve);
        System.out.println(reserve);
        reserveService.save(reserve);
        return reserve;
    }

    private void DealDate(@RequestBody Reserve reserve) {
        long strDate = Long.parseLong(reserve.getReservedate());
        Instant instant = Instant.ofEpochMilli(strDate);
        ZonedDateTime zdt = instant.atZone(ZoneId.of("Asia/Shanghai"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = zdt.format(formatter);

        reserve.setReservedate(formattedDateTime);
    }

    @PostMapping("/mini/delete/{id}")
    public Boolean delete(@PathVariable Integer id){
        QueryWrapper<Reserve> queryWrapper = new QueryWrapper<Reserve>();
        queryWrapper.eq("id",id);
        Boolean res = reserveService.remove(queryWrapper);
        return res;
    }

    @PostMapping("/mini/update")
    public Result update(@RequestBody Reserve reserve){
        DealDate(reserve);
        reserveService.updateById(reserve);
        return Result.success();
    }

}
