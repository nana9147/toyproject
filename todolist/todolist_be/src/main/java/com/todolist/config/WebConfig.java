package com.todolist.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration   // 설정 클래스라는 표시
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        // CORS(Cross-Origin Resource Sharing)를 설정하는 부분
        // 프론트엔드(React, Vite 등)에서 백엔드 API를 호출할 때
        // "도메인이 다르기 때문에" 브라우저가 기본적으로 요청을 막는다.
        // 그 차단을 풀어주는 설정이다.


        registry.addMapping("/api/**")    // "/api/"로 시작하는 모든 백엔드 URL을 외부에서 호출 가능하게 허용
                .allowedOrigins(
                        "http://localhost:5173"  // Vite 기본 포트
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);          // 쿠키, 세션, Authorization 헤더 등 인증 정보를 포함한 요청 허용
    }
}
