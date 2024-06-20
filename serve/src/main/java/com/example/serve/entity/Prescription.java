package com.example.serve.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "prescription")
@Data
public class Prescription {
    @Id
    @TableId(value="oid",type = IdType.AUTO)
    private Integer oid;    //取药编号
    private Integer mid;   //药品编号
    private Integer uid;     //用户编号
    private Integer did;   //医生编号
    private Integer mnumber;//药品数量
    private String ptime; //开药时间
    private String state; //状态（已取、未取）
}
