package com.todolist.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final Key key;               // JWT를 서명(Signature)할 때 사용하는 비밀키
    private final long validityInMs;    // 토큰 유효기간

    public JwtTokenProvider(
            @Value("${jwt.secret}") String secret,          // 비밀키 문자열
            @Value("${jwt.expiration}") long validityInMs    // 만료 시간(ms)
    ) {
        // 문자열로 된 secret 값을 실제 HMAC-SHA256 알고리즘에 사용할 수 있는 Key 객체로 변환
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.validityInMs = validityInMs;
    }

    // 토큰 생성
    public String createToken(String userId, String email) {
        Date now = new Date();                                  //발급시간
        Date expiry = new Date(now.getTime() + validityInMs);   //만료시간

        return Jwts.builder()
                .setSubject(userId)              // 주체: userId
                .claim("email", email)           // 커스텀 클레임
                .setIssuedAt(now)                // 발급 시간
                .setExpiration(expiry)           // 만료 시간
                .signWith(key, SignatureAlgorithm.HS256) // 비밀키 + HS256 알고리즘으로 서명
                .compact();                     // 최종적으로 JWT 문자열 생성
    }

    // 토큰에서 userId 추출
    public String getUserId(String token) {
        return parseClaims(token).getBody().getSubject();
    }

    // 토큰 유효성 검증 (서명일치 유무/ 만료유무/토큰형식)
    public boolean validateToken(String token) {
        try {
            parseClaims(token); // 파싱에 성공하면 유효한 토큰
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // 서명 오류, 만료, 변조, 잘못된 포맷 등 모든 JWT 관련 오류 처리
            return false;
        }
    }

    // 토큰 내부 클레임을 파싱하여 반환
    private Jws<Claims> parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)         // 서명을 확인하기 위해 비밀키 설정
                .build()
                .parseClaimsJws(token);     // JWT 문자열 파싱 → Claims 추출
    }
}
