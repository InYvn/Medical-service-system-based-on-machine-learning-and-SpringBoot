package com.example.serve.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "reserve")
@Data
public class Reserve {
    @Id
    @TableId(value="id",type = IdType.AUTO)
    private Integer id;
    private Integer uid;
    private Integer did;
    private String reservedate;
}
