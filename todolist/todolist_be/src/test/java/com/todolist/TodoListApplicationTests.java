package com.todolist;

import com.todolist.domain.User;
import com.todolist.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@SpringBootTest
class TodoListApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Test
    @Transactional
    @Rollback(false)
    void signupTest() {
        String rawPw = "test1234!";
        String encodedPw = passwordEncoder.encode(rawPw);

        User user = User.builder()
                .id("test123")
                .pw(encodedPw)
                .name("테스트")
                .email("test@naver.com")
                .phone("010-1234-5678")
                .build();

        userRepository.save(user);

        Optional<User> search = userRepository.findById("test123");

    }



}
