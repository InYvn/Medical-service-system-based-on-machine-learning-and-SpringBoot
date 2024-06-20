package com.example.serve.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.Doctor;
import com.example.serve.mapper.DoctorMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class DoctorService extends ServiceImpl<DoctorMapper, Doctor> {
    @Resource
    @Autowired
    DoctorMapper doctorMapper;
}
