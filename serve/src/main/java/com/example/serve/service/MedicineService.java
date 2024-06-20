package com.example.serve.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.Medicine;
import com.example.serve.mapper.MedicineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class MedicineService extends ServiceImpl<MedicineMapper, Medicine> {
    @Resource
    @Autowired
    MedicineMapper medicineMapper;
}
