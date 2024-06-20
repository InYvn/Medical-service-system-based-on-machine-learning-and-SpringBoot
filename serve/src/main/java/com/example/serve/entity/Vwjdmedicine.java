package com.example.serve.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vwjdmedicine")
@Data
public class Vwjdmedicine {
    @Id
    @TableId(value="oid",type = IdType.AUTO)
    private Integer oid;    //取药编号
    private Integer mid;    //药品编号
    private Integer uid;    //账号
    private Integer mnumber;//药品数量
    private String ptime;     //开药时间
    private String state;   //状态（已取、未取）
    private String name; //药品名称
    private String genericName;//药品通用名
    private String price;//价格（￥）
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
    private String dname;   //医生姓名
    private String username;    //患者账号
    private String realname;    //患者姓名
}
