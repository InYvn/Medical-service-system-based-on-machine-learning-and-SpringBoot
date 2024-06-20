package com.example.serve.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.Office;
import com.example.serve.entity.Prescription;
import com.example.serve.mapper.OfficeMapper;
import com.example.serve.mapper.PrescriptionMapper;
import org.springframework.stereotype.Service;

@Service
public class PrescriptionService extends ServiceImpl<PrescriptionMapper, Prescription> {
}
