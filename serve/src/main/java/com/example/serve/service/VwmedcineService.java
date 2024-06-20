package com.example.serve.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.Vwmedcine;
import com.example.serve.mapper.DoctorMapper;
import com.example.serve.mapper.VwmedcineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class VwmedcineService extends ServiceImpl<VwmedcineMapper, Vwmedcine> {
    @Resource
    @Autowired
    VwmedcineMapper VwmedcineMapper;
}
