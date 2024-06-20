package com.example.serve.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.Office;
import com.example.serve.mapper.OfficeMapper;
import org.springframework.stereotype.Service;

@Service
public class OfficeService  extends ServiceImpl<OfficeMapper, Office> {
}
