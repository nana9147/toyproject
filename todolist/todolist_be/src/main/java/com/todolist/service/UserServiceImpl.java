package com.todolist.service;

import com.todolist.config.JwtTokenProvider;
import com.todolist.domain.User;
import com.todolist.dto.SigninRequest;
import com.todolist.dto.SigninResponse;
import com.todolist.dto.SignupRequest;
import com.todolist.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public ResponseEntity<?> signup(SignupRequest request) {

        // ID 중복 체크
        if (userRepository.existsById(request.getId())) {
            return ResponseEntity.badRequest().body("이미 사용중인 ID입니다.");
        }

        // EMAIL 중복 체크
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("이미 사용중인 이메일입니다.");
        }

        // 비밀번호 암호화
        String encodedPw = passwordEncoder.encode(request.getPw());

        // 엔티티 생성
        User user = User.builder()
                .id(request.getId())
                .pw(encodedPw)
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .status("ACTIVE")
                .build();

        // DB 저장
        userRepository.save(user);

        return ResponseEntity.ok("회원가입 성공");
    }

    @Override
    public boolean isUserIdDuplicate(String userId) {
        return userRepository.existsById(userId);
    }


    @Override
    public ResponseEntity<?> signin(SigninRequest request) {

        // 1) ID로 사용자 조회
        User user = userRepository.findById(request.getId())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        // 2) 비밀번호 일치 여부 확인
        if (!passwordEncoder.matches(request.getPw(), user.getPw())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        // 3) JWT 생성
        String token = jwtTokenProvider.createToken(user.getId(), user.getEmail());

        // 4) 응답 DTO 구성
        SigninResponse response = new SigninResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        return ResponseEntity.ok(response);
    }
}
