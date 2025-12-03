package com.todolist.service;

import com.todolist.dto.SigninRequest;
import com.todolist.dto.SignupRequest;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> signup(SignupRequest request);

    ResponseEntity<?> signin(SigninRequest request);
}
