package com.todolist.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="user")
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long no;        //사용자 고유번호

    @Column(length = 30, nullable = false, unique = true)
    private String id;      //사용자 id

    @Column(length = 20, nullable = false)
    private String pw;      //사용자 pw

    @Column(length = 30, nullable = false)
    private String name;    //사용자 이름

    @Column(length = 13, nullable = false)
    private String phone;   //사용자 전화번호

    @Column(length = 100, nullable = false, unique = true)
    private String email;   //사용자 이메일

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private LocalDateTime created_at;       //등록일

    @LastModifiedDate
    @Column(nullable=false)
    private LocalDateTime  updated_at;       //수정일

    @Column(length = 20, columnDefinition = "VARCHAR(20) DEFAULT 'ACTIVE'")
    private String status;
}
