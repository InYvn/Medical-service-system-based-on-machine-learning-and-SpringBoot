package com.example.serve.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.serve.common.Result;
import com.example.serve.entity.Medicine;
import com.example.serve.entity.User;
import com.example.serve.service.UserService;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.oned.Code128Writer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    private String uploadPath="D://finalDesignPic//";

    @GetMapping("/mini/{id}")
    public User getUserById(@PathVariable Integer id){
        User user = userService.getById(id);
        //如果性别为不为空则执行
        if(user.getSex()!=null){
            if(user.getSex().equals("1")){
                user.setSex("男");
            }
            if(user.getSex().equals("2")){
                user.setSex("女");
            }
        }
        return user;
    }

    @PostMapping("/mini/login")
    public User login(@RequestBody User user){
        QueryWrapper<User> queryWrapper = new QueryWrapper<User>();
        queryWrapper.eq("username",user.getUsername())
                    .eq("password",user.getPassword());

        //调用UserMapper的selectOne方法进行查询
        User dbuser = userService.getOne(queryWrapper);

        //判断查询结果
        if(dbuser !=null){
            //匹配成功
            return dbuser;
        }else{
            return null;
        }
    }

    @PostMapping("/login")
    public Result sysLogin(@RequestBody User user){
        if(StrUtil.isBlank(user.getUsername())||StrUtil.isBlank(user.getPassword())){
            return Result.error("数据输入不合法");
        }
        user = userService.login(user);
        return Result.success(user);
    }

    @PostMapping("/mini/register")
    public User add(@RequestBody User user){
        //查询数据库中是否有相同的用户名
        QueryWrapper<User> queryWrapper = new QueryWrapper<User>();
        queryWrapper.eq("username",user.getUsername());
        User dbuser = userService.getOne(queryWrapper);
        if(dbuser !=null){
            return null;
        }
        user.setRole("用户");
        userService.save(user);
        //User res = userService.save(user);
        return user;
    }

    @PostMapping("/add")
    public Result addvue(@RequestBody User user){
        //查询数据库中是否有相同的用户名
        QueryWrapper<User> queryWrapper = new QueryWrapper<User>();
        queryWrapper.eq("username",user.getUsername());
        User dbuser = userService.getOne(queryWrapper);
        if(dbuser !=null){
            return Result.error("用户名已存在");
        }
        userService.save(user);
        return Result.success("添加成功");
    }


    @PostMapping("/register")
    public Result register(@RequestBody User user){
        if(StrUtil.isBlank(user.getUsername())||StrUtil.isBlank(user.getPassword())){
            return Result.error("数据输入不合法");
        }
        user.setRole("用户");
        user = userService.register(user);
        return Result.success(user);
    }


    @PostMapping("/mini/addInfo")
    public User addInfo(@RequestBody User user) throws WriterException, IOException {
        String aid=""+user.getId();
        int w = 500;// 宽
        int h = 300;// 高
        String s = aid;//条形码的内容
        String f = "png";//格式
        HashMap<EncodeHintType, Object> m = new HashMap<>();//条形码的参数
        m.put(EncodeHintType.CHARACTER_SET, "utf-8");//编码
        m.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);//条形码的容错率,从小到大是L,M,Q,H,条形码的容错率越高越容易扫描
        m.put(EncodeHintType.MARGIN, 0);//条形码的边框宽度
        BufferedImage i = MatrixToImageWriter.toBufferedImage(new Code128Writer().encode(s, BarcodeFormat.CODE_128, w, h, m));//生成条形码的图片
        ImageIO.write(i, f, new File("D:\\finalDesignPic\\"+aid+".png"));

        Boolean dbuser = userService.updateById(user);
        return user;
    }

//    @PostMapping("/mini/addInfo")
//    public User addInfo(@RequestBody User user) {
////    public User addInfo(@RequestBody User user) throws WriterException, IOException {
////        String aid=""+user.getId();
////        int w = 500;// 宽
////        int h = 300;// 高
////        String s = aid;//条形码的内容
////        String f = "png";//格式
////        HashMap<EncodeHintType, Object> m = new HashMap<>();//条形码的参数
////        m.put(EncodeHintType.CHARACTER_SET, "utf-8");//编码
////        m.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);//条形码的容错率,从小到大是L,M,Q,H,条形码的容错率越高越容易扫描
////        m.put(EncodeHintType.MARGIN, 0);//条形码的边框宽度
////        BufferedImage i = MatrixToImageWriter.toBufferedImage(new Code128Writer().encode(s, BarcodeFormat.CODE_128, w, h, m));//生成条形码的图片
////        ImageIO.write(i, f, new File("E:\\kesheshow\\"+aid+".png"));
//
//        Boolean dbuser = userService.updateById(user);
//        return user;
//    }

//    @PostMapping("/add")
//    public Result add(@RequestBody User user){
//        userService.save(user);
//        return Result.success("添加成功");
//    }
    //更新用户信息
    @PutMapping("/update")
    public Result update(@RequestBody User user){
        userService.updateById(user);
        return Result.success();
    }
    //删除单个用户信息
    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable Integer id){
        userService.removeById(id);
        return Result.success();
    }
    //删除多个用户信息
    @DeleteMapping("/delete/batch")
    public Result batchDelete(@RequestBody List<Integer> ids){
        userService.removeBatchByIds(ids);
        return Result.success();
    }

    //查询全部用户信息
    @GetMapping("/selectAll")
    public Result selectAll(){
        List<User> users = userService.list(new QueryWrapper<User>().orderByDesc("id"));
        return Result.success(users);
    }
    //根据ID查询用户信息(单条件查询)
    @GetMapping("/selectByID/{id}")
    public Result selectByID(@PathVariable Integer id){
        User user = userService.getById(id);
        return Result.success(user);
    }

    @GetMapping("/selectByPage")
    public Result selectByPage(@RequestParam Integer pageNum,
                               @RequestParam Integer pageSize,
                               @RequestParam String username,
                               @RequestParam String realname,
                               @RequestParam String role,
                               @RequestParam String sex
                               ) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<User>().orderByDesc("id");
        queryWrapper.like(StrUtil.isNotBlank(username), "username", username);
        queryWrapper.like(StrUtil.isNotBlank(realname), "realname", realname);
        queryWrapper.like(StrUtil.isNotBlank(role), "role", role);
        queryWrapper.like(StrUtil.isNotBlank(sex), "sex", sex);
        // select * from user where username like '%#{username}%' and name like '%#{name}%'
        Page<User> page = userService.page(new Page<>(pageNum, pageSize), queryWrapper);
        return Result.success(page);
    }
}
