package com.todolist.controller;

import com.todolist.dto.SigninRequest;
import com.todolist.dto.SignupRequest;
import com.todolist.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        return userService.signup(request);
    }

    // 아이디 중복 확인
    @GetMapping("/check-id")
    public ResponseEntity<DuplicateCheckResponse> checkUserId(
            @RequestParam("userId") String userId
    ) {
        boolean duplicate = userService.isUserIdDuplicate(userId);
        return ResponseEntity.ok(new DuplicateCheckResponse(duplicate));
    }

    // 응답 DTO (내부 static 클래스로 간단히 처리)
    @Getter
    @AllArgsConstructor
    static class DuplicateCheckResponse {
        private boolean duplicate; // true면 중복, false면 사용 가능
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@Valid @RequestBody SigninRequest request) {
        return userService.signin(request);
    }
}
