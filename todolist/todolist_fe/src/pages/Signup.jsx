import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/todo-logo.png";
import "../css/signup.css";

export default function Signup() {
  const navigate = useNavigate();

  /* react-hook-form 설정 */
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const userIdValue = watch("userId");
  const passwordValue = watch("password");

  /* 아이디 중복확인 관련 상태 */
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(null);

  /* 이메일 도메인 커스텀 여부 */
  const [isCustom, setIsCustom] = useState(false);

  /* 아이디 중복확인 */
  const checkUserIdDuplicate = async () => {
    if (!/^(?=.*[A-Za-z])[A-Za-z0-9]{6,}$/.test(userIdValue)) {
      setIdCheckMessage("영문 또는 영문+숫자 6자리 이상 입력해주세요");
      return;
    }

    try {
      setIsCheckingId(true);
      setIdCheckMessage("");

      const response = await fetch(
        `http://localhost:8080/api/check-id?userId=${userIdValue}`
      );

      if (!response.ok) throw new Error("서버 오류");

      const data = await response.json();
      const duplicate = typeof data === "boolean" ? data : data.duplicate;

      if (duplicate) {
        setIsIdAvailable(false);
        setIdCheckMessage("이미 사용 중인 아이디입니다.");
      } else {
        setIsIdAvailable(true);
        setIdCheckMessage("사용 가능한 아이디입니다.");
      }
    } catch (err) {
      setIdCheckMessage("중복 확인 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingId(false);
    }
  };

  /* 회원가입 form 제출 */
  const onSubmit = async (form) => {
    const payload = {
      id: form.userId,
      pw: form.password,
      email: `${form.emailId}@${form.domain}`,
      name: form.name,
      phone: `${form.phone1}-${form.phone2}-${form.phone3}`,
    };

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        alert(await response.text());
        return;
      }

      alert("회원가입이 완료되었습니다.");
      navigate("/signin");
    } catch (err) {
      alert("서버 통신 오류입니다.");
    }
  };

  /* 도메인 select 처리 */
  const handleDomainSelect = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustom(true);
      setValue("domain", "");
    } else {
      setIsCustom(false);
      setValue("domain", value);
    }
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

      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        {/* 아이디 */}
        <div className="form-col">
          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">아이디</span>

              {(errors.userId || idCheckMessage) && (
                <span
                  className={
                    "form-error-text " +
                    (idCheckMessage && isIdAvailable === true ? "success" : "")
                  }
                >
                  {idCheckMessage || errors.userId?.message}
                </span>
              )}
            </div>

            <div className="id-input-wrap">
              <input
                className="form-input id-input"
                type="text"
                placeholder="영문 또는 영문+숫자 6자리 이상"
                {...register("userId", {
                  required: "아이디는 필수 입력입니다.",
                  pattern: {
                    value: /^(?=.*[A-Za-z])[A-Za-z0-9]{6,}$/,
                    message: "영문 또는 영문+숫자 6자리 이상 입력해주세요",
                  },
                  onChange: () => {
                    setIdCheckMessage("");
                    setIsIdAvailable(null);
                  },
                })}
              />

              <button
                type="button"
                className="id-check-btn"
                disabled={isCheckingId}
                onClick={checkUserIdDuplicate}
              >
                {isCheckingId ? "확인중..." : "중복확인"}
              </button>
            </div>
          </div>

          {/* 이름 */}
          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">이름</span>
              {errors.name && (
                <span className="form-error-text">{errors.name.message}</span>
              )}
            </div>
            <input
              className="form-input"
              placeholder="이름을 입력하세요"
              {...register("name", { required: "이름은 필수 입력입니다." })}
            />
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="form-col">
          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">비밀번호</span>
              {errors.password && (
                <span className="form-error-text">
                  {errors.password.message}
                </span>
              )}
            </div>

            <input
              type="password"
              className="form-input"
              placeholder="문자, 숫자, 특수문자 포함 8~20자"
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,20}$/,
                  message: "문자, 숫자, 특수문자 포함 8~20자",
                },
              })}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">비밀번호 확인</span>
              {errors.passwordConfirm && (
                <span className="form-error-text">
                  {errors.passwordConfirm.message}
                </span>
              )}
            </div>

            <input
              type="password"
              className="form-input"
              placeholder="비밀번호 재입력"
              {...register("passwordConfirm", {
                required: "비밀번호 확인이 필요합니다.",
                validate: (value) =>
                  value === passwordValue || "비밀번호가 일치하지 않습니다.",
              })}
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className="form-col">
          <div className="form-row">
            <div className="form-label-row">
              <span className="form-label">이메일</span>
              {errors.emailId && (
                <span className="form-error-text">
                  {errors.emailId.message}
                </span>
              )}
              {errors.domain && (
                <span className="form-error-text">{errors.domain.message}</span>
              )}
            </div>

            <div className="email-row">
              <input
                className="form-input email-id"
                placeholder="이메일 아이디"
                {...register("emailId", {
                  required: "이메일 아이디는 필수입니다.",
                })}
              />

              <span className="email-at">@</span>

              <input
                className="form-input email-domain"
                placeholder="도메인 입력"
                readOnly={!isCustom}
                {...register("domain", { required: "도메인을 입력하세요." })}
              />

              <select className="email-select" onChange={handleDomainSelect}>
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
                maxLength="3"
                {...register("phone1", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              <span className="phone-dash">-</span>

              <input
                className="form-input phone-input"
                maxLength="4"
                {...register("phone2", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
              <span className="phone-dash">-</span>

              <input
                className="form-input phone-input"
                maxLength="4"
                {...register("phone3", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
              />
            </div>
          </div>
        </div>

        {/* 약관 */}
        <div className="form-col terms-col">
          <div className="form-checkbox-group">
            <input type="checkbox" id="agree_terms" required />
            <label htmlFor="agree_terms">이용약관 동의</label>
          </div>

          <div className="form-checkbox-group">
            <input type="checkbox" id="agree_privacy" required />
            <label htmlFor="agree_privacy">개인정보 동의</label>
          </div>
        </div>

        {/* 버튼 */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate(-1)}
          >
            이전
          </button>
          <button type="submit" className="btn-submit">
            가입하기
          </button>
        </div>
      </form>
    </section>
  );
}
