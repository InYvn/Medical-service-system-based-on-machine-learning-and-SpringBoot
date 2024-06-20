package com.example.serve.service;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.serve.entity.User;
import com.example.serve.mapper.UserMapper;
import com.example.serve.utils.TokenUtils;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserService extends ServiceImpl<UserMapper, User> {
    @Resource
    @Autowired
    UserMapper userMapper;

    public User selectByUserName(String username){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        return getOne(queryWrapper);
    }

    @Override
    public boolean save(User user){
        if(StrUtil.isBlank(user.getUsername())){
            user.setUsername(user.getUsername());
        }
        if(StrUtil.isBlank(user.getPassword())){
            user.setPassword("123456");
        }
        if(StrUtil.isBlank(user.getUsername())){
            user.setRole("用户");
        }
        return super.save(user);
    }

    public User login(User user) {
        User dbUser=selectByUserName(user.getUsername());
        if(dbUser==null){
            throw new ServiceException("用户名或密码错误");
        }
        if(!dbUser.getPassword().equals(user.getPassword())){
            throw new ServiceException("用户名或密码错误");
        }
        //生成Token
        String token = TokenUtils.createToken(dbUser.getId().toString(), dbUser.getPassword());
        dbUser.setToken(token);
        return dbUser;
    }

    public User register(User user) {
        User dbUser=selectByUserName(user.getUsername());
        if(dbUser!=null){
            throw new ServiceException("用户名已存在");
        }
        userMapper.insert(user);
        return user;
    }
}
