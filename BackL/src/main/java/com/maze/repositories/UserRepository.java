package com.maze.repositories;


import java.util.List;
import com.maze.beans.User;


import org.springframework.data.repository.Repository;



public interface UserRepository extends Repository<User, Integer>{

    List<User> findAll();

    User save(User user);
    
    User findById(int id);
    
    void delete(User user);
    
}