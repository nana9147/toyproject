package com.todolist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SigninResponse {

    private String token;      // 발급된 JWT
    private String id;         // 로그인 ID
    private String name;       // 사용자 이름
    private String email;      // 이메일
}
