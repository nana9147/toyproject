import logo from "../img/todo-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../css/signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [domain, setDomain] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  /* 이전페이지로 이동 */
  const handleBack = () => {
    navigate(-1);
  };

  /* 도메인 선택 */
  const handleDomainChange = (e) => {
    const value = e.target.value;

    if (value === "custom") {
      setIsCustom(true);
      setDomain("");
    } else {
      setIsCustom(false);
      setDomain(value);
    }
  };

  return (
    <section className="signup-section bg-blue-50">
      <div className="signup-title-wrap">
        <div className="logo-section">
          <img
            className="w-16 h-auto rounded-full"
            src={logo}
            alt="logo이미지"
          />
        </div>
        <div className="main-title">회원가입</div>
        <div className="sub-title">나만의 todo-list를 관리하세요</div>
      </div>

      <form className="signup-form">
        <div className="form-row space-y-1">
          <div className="form-label font-semibold text-sm">아이디</div>
          <div className="form-error text-red-500 font-semibold hidden">
            * 사용할 수 없는 아이디입니다.
          </div>
          <input
            className="form-input border px-2 py-1 rounded w-50 placeholder:text-xs "
            type="text"
            placeholder="아이디를 입력하세요"
          />
        </div>
        <button className="border rounded bg-slate-300 px-2" type="button">
          중복확인
        </button>
        <div className="form-row space-y-1">
          <div className="form-label font-semibold text-sm">이름</div>
          <input
            className="form-input border px-2 py-1 rounded w-50 placeholder:text-xs "
            type="text"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="form-row space-y-1">
          <div className="form-label font-semibold text-sm">비밀번호</div>
          <div className="text-red-500 font-semibold hidden">
            * 8자~20자 사이의 비밀번호를 입력해 주세요.
          </div>
          <input
            className="form-input border px-2 py-1 rounded w-50 placeholder:text-xs "
            type="password"
            placeholder="문자,숫자,특수문자 포함 8~20자"
          />
        </div>

        <div className="form-row space-y-1">
          <div className="form-label font-semibold text-sm">비밀번호 확인</div>
          <div className="text-red-500 font-semibold hidden">
            * 비밀번호가 일치하지 않습니다.
          </div>
          <input
            className="form-input border px-2 py-1 rounded w-50  placeholder:text-xs "
            type="password"
            placeholder="비밀번호 재입력"
          />
        </div>

        <div className="form-row space-y-1">
          <div className="form-label font-semibold text-sm">이메일</div>
          <label>
            <input type="text" id="emailId" /> @{" "}
            <input
              className="form-input"
              type="text"
              id="emailDomail"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              readOnly={!isCustom}
              placeholder="도메인을 입력하세요"
            />
          </label>{" "}
          <select
            id="emailSelect"
            value={isCustom ? "custom" : domain}
            onChange={handleDomainChange}
          >
            <option value="">선택</option>
            <option value="naver.com">네이버</option>
            <option value="daum.net">다음</option>
            <option value="google.com">구글</option>
            <option value="kakao.com">카카오</option>
            <option value="custom">직접입력</option>
          </select>
        </div>

        <div className="form-row space-y-1">
          <div className="form-label font-semibold text-sm">전화번호</div>
          <label>
            <input
              className="form-input border px-2 py-1 rounded w-16"
              type="text"
            />
            -
            <input
              className="form-input border px-2 py-1 rounded w-16"
              type="text"
            />
            -
            <input
              className="form-input border px-2 py-1 rounded w-16"
              type="text"
            />
          </label>
        </div>

        <div className="form-checkbox-group">
          <input className="checkbox" type="checkbox" id="agree_terms" />
          <label for="agree_terms">이용약관 동의</label>
        </div>

        <div className="form-checkbox-group">
          <input className="checkbox" type="checkbox" id="agree_privacy" />
          <label for="agree_privacy">개인정보 동의</label>
        </div>
        <div className="form-actions flex justify-between mt-6">
          <button
            className="btn-back border rounded bg-gray-300 px-2"
            type="button"
            onClick={handleBack}
          >
            이전
          </button>
          <button
            className="btn-submi border rounded bg-blue-300 px-2"
            type="submit"
          >
            가입하기
          </button>
        </div>
      </form>
    </section>
  );
}
