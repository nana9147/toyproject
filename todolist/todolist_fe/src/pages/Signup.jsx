import logo from "../img/todo-logo.png";
import { useNavigate } from "react-router-dom";

import "../css/signup.css";
import { useSignupForm } from "../hooks/useSignupForm";

export default function Signup() {
  const navigate = useNavigate();

  const {
    userId,
    setUserId,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    emailId,
    setEmailId,
    domain,
    setDomain,
    isCustom,
    errors,
    validateField,
    handleDomainChange,
    handleSubmit,
    idCheckMessage,
    isIdAvailable,
    isCheckingId,
    checkUserIdDuplicate,
  } = useSignupForm(() => {
    // 유효성 통과 후 실행되는 콜백
    alert("회원가입 완료");
    navigate("/signin");
  });

  /* 이전페이지로 이동 */
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="signup-section">
      <div className="signup-title-wrap">
        <div className="logo-section">
          <img className="rounded-full" src={logo} alt="logo이미지" />
        </div>
        <div className="main-title">회원가입</div>
        <div className="sub-title">나만의 todo-list를 관리하세요</div>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* 아이디 / 이름 */}
        <div className="form-col">
          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">아이디</span>
              {errors.userId && (
                <span className="form-error-text">{errors.userId}</span>
              )}
            </div>

            <div className="id-input-wrap">
              <input
                className="form-input id-input"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onBlur={() => validateField("userId")}
                placeholder="영문 또는 영문+숫자 6자리 이상"
              />
              <button
                className="id-check-btn"
                type="button"
                onClick={checkUserIdDuplicate}
                disabled={isCheckingId}
              >
                {isCheckingId ? "확인중..." : "중복확인"}
              </button>
            </div>

            {/* 중복확인 결과 메시지 */}
            {idCheckMessage && (
              <div
                className={
                  isIdAvailable === true
                    ? "id-check-msg success"
                    : "id-check-msg error"
                }
              >
                {idCheckMessage}
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">이름</span>
            </div>
            <input
              className="form-input"
              type="text"
              placeholder="이름을 입력하세요"
              required
            />
          </div>
        </div>

        {/* 비밀번호 / 비밀번호 확인 */}
        <div className="form-col">
          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">비밀번호</span>
              {errors.password && (
                <span className="form-error-text">{errors.password}</span>
              )}
            </div>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => validateField("password")}
              placeholder="문자, 숫자, 특수문자 포함 8~20자"
            />
          </div>

          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">비밀번호 확인</span>
              {errors.passwordConfirm && (
                <span className="form-error-text">
                  {errors.passwordConfirm}
                </span>
              )}
            </div>
            <input
              className="form-input"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onBlur={() => validateField("passwordConfirm")}
              placeholder="비밀번호 재입력"
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className="form-col">
          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">이메일</span>
              {errors.email && (
                <span className="form-error-text">{errors.email}</span>
              )}
            </div>
            <div className="email-row">
              <input
                className="form-input email-id"
                type="text"
                id="emailId"
                placeholder="이메일 아이디"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                onBlur={() => validateField("email")}
              />
              <span className="email-at">@</span>
              <input
                className="form-input email-domain"
                type="text"
                id="emailDomain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                readOnly={!isCustom}
                onBlur={() => validateField("email")}
                placeholder="도메인을 입력하세요"
              />
              <select
                id="emailSelect"
                className="email-select"
                value={isCustom ? "custom" : domain}
                onChange={(e) => {
                  handleDomainChange(e);
                  // select 변경 시에도 검증
                  setTimeout(() => validateField("email"), 0);
                }}
              >
                <option value="">선택</option>
                <option value="naver.com">네이버</option>
                <option value="daum.net">다음</option>
                <option value="google.com">구글</option>
                <option value="kakao.com">카카오</option>
                <option value="custom">직접입력</option>
              </select>
            </div>
          </div>
        </div>

        {/* 전화번호 */}
        <div className="form-col">
          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">전화번호</span>
            </div>
            <div className="phone-row">
              <input
                className="form-input phone-input"
                type="text"
                maxLength="3"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                required
              />
              <span className="phone-dash">-</span>
              <input
                className="form-input phone-input"
                type="text"
                maxLength="4"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                required
              />
              <span className="phone-dash">-</span>
              <input
                className="form-input phone-input"
                type="text"
                maxLength="4"
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                required
              />
            </div>
          </div>
        </div>

        {/* 약관 */}
        <div className="form-col terms-col">
          <div className="form-checkbox-group">
            <input
              className="checkbox"
              type="checkbox"
              id="agree_terms"
              required
            />
            <label htmlFor="agree_terms">이용약관 동의</label>
          </div>

          <div className="form-checkbox-group">
            <input
              className="checkbox"
              type="checkbox"
              id="agree_privacy"
              required
            />
            <label htmlFor="agree_privacy">개인정보 동의</label>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="form-actions">
          <button className="btn-back" type="button" onClick={handleBack}>
            이전
          </button>
          <button className="btn-submit" type="submit">
            가입하기
          </button>
        </div>
      </form>
    </section>
  );
}
