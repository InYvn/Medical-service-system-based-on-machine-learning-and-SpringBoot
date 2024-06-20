package com.example.serve.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("medicine")
public class Medicine {

    @TableId(type = IdType.AUTO)
    private Integer mid;//药品id
    private String medname;//药品名称
    private String factory;//生产厂家
    private String price;//价格
    private String badtime;//保质期
}
