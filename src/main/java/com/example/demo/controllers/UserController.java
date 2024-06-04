package com.example.demo.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import java.util.List;
import java.util.ArrayList;

@RequestMapping("/users")
@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository UserRepository) {
        this.userRepository = UserRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = new ArrayList<>();
        this.userRepository.findAll().forEach(users::add);

        return ResponseEntity.ok(users);
    }
}