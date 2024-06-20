package com.example.serve.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name="doctor")
@Data
public class Doctor {
    @Id
    @TableId(value="id",type = IdType.AUTO)
    private Integer id;
    private String dname;
    private String dsex;
    private Integer kid;
    private String dphone;
    private String position;
}
