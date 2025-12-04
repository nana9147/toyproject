package com.todolist.service;

import com.todolist.dto.SigninRequest;
import com.todolist.dto.SignupRequest;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> signup(SignupRequest request);
    // 아이디 중복 여부 확인 (true = 중복)
    boolean isUserIdDuplicate(String userId);

    ResponseEntity<?> signin(SigninRequest request);
}
