package com.todolist.repository;

import com.todolist.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsById(String id);
    boolean existsByEmail(String email);

    // 로그인용
    Optional<User> findById(String id);  // 필드명 id 기준
}
