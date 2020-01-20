package com.maze.services;
import java.util.List;

import com.maze.beans.User;


public interface UserService {

    User create(User User);

    User delete(int id);

    List<User> findAll();

    User findById(int id);

    User update(User User);
}