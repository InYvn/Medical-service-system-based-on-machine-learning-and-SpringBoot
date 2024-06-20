package com.example.serve.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.Reserve;
import com.example.serve.mapper.ReserveMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class ReserveService extends ServiceImpl<ReserveMapper, Reserve> {
    @Resource
    @Autowired
    ReserveMapper reserveMapper;
}
