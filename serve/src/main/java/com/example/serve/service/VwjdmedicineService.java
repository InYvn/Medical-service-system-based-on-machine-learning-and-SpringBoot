package com.example.serve.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.Vwjdmedicine;
import com.example.serve.mapper.VwjdmedicineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class VwjdmedicineService extends ServiceImpl<VwjdmedicineMapper, Vwjdmedicine> {
    @Resource
    @Autowired
    VwjdmedicineMapper vwjdmedicineMapper;
}
