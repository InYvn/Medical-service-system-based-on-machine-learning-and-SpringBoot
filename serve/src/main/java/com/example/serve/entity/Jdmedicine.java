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
@TableName("jdmedicines")
public class Jdmedicine {

    @TableId(type = IdType.AUTO)
    private Integer id;//药品id
    private String name;//名称
    private String genericName;//药品通用名
    private String price;//价格（￥）
    private String sku;//sku
    private String validity;//有效期
    private String drugClassification;//药品分类
    private String dosageForm;//剂型
    private String storageCondition;//储存条件
    private String useDose;//使用剂量
    private String indications;//适用症/功能主治
    private String adverseReaction;//不良反应
    private String medicineChildren;//儿童用药
    private String medicineGeriatric;//老年用药
    private String taboo;//禁忌
    private String approvalCertificate;//批准文号
}



