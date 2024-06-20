package com.example.serve.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "vwmedcine")
@Data
public class Vwmedcine {
    @Id
    @TableId(value="oid",type = IdType.AUTO)
    private Integer oid;    //取药编号
    private String dname;   //医生姓名
    private String ptime;     //开药时间
    private String state;   //状态（已取、未取）
    private Integer mnumber;//药品数量
    private String medname; //药品名称
    private String factory; //药品生产厂商
    private Float price;    //药品价格
    private Integer badtime;//有效期
    private Integer mid;    //药品编号
    private Integer uid;    //账号
    private String realname;    //患者姓名
}
