package com.example.serve.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.Jdmedicine;
import com.example.serve.mapper.JdmedicineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class JdmedicineService extends ServiceImpl<JdmedicineMapper, Jdmedicine> {
    @Resource
    @Autowired
    JdmedicineMapper jdmedicineMapper;
}
