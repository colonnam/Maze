package com.maze.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.maze.services.UserService;
import com.maze.beans.User;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping({"/users"})
public class UserController {
	
	@Autowired
	private UserService userservice;
	 
    @GetMapping
    public List<User> getUsers() {
        return userservice.findAll();
    }
    
    @GetMapping(path = {"/{id}"})
    public User findOne(@PathVariable("id") int id){
        return userservice.findById(id);
    }
 
    @PostMapping
    public void addUser(@RequestBody User u) {
        userservice.create(u);
    }
    
    @PutMapping(path = {"/{id}"})
    public User update(@PathVariable("id")int id, @RequestBody User user){
        return userservice.update(user);
    }

    @DeleteMapping(path ={"/{id}"})
    public User delete(@PathVariable("id") int id) {
        return userservice.delete(id);
    }
    
    

}
