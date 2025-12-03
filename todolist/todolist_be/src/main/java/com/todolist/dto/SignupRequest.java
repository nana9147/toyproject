package com.todolist.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {

    @NotBlank(message = "ID는 필수입니다.")
    @Size(min = 4, max = 30)
    private String id;

    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 8, max = 20)
    private String pw;

    @NotBlank(message = "이름은 필수입니다.")
    private String name;

    @NotBlank(message = "전화번호는 필수입니다.")
    @Size(min = 10, max = 13)
    private String phone;

    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    private String email;
}
