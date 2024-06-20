package com.example.serve.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.Vwreservation;
import com.example.serve.mapper.VwreservationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class VwreservationService  extends ServiceImpl<VwreservationMapper, Vwreservation> {
    @Resource
    @Autowired
    VwreservationMapper VwreservationMapper;
}
