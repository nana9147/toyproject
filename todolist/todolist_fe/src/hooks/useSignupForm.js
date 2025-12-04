import { useState } from "react";

export function useSignupForm(onValidSubmit) {
  const [domain, setDomain] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [emailId, setEmailId] = useState("");

  const [errors, setErrors] = useState({
    userId: "",
    password: "",
    passwordConfirm: "",
    email: "",
  });

  // 아이디 중복확인 관련 상태
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null); // true/false/null
  const [isCheckingId, setIsCheckingId] = useState(false);

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

  /* 아이디 유효성 검사 */
  const getUserIdError = (value) => {
    if (!value.trim()) {
      return "아이디는 필수 입력값입니다.";
    }
    if (!/^(?=.*[A-Za-z])[A-Za-z0-9]{6,}$/.test(value)) {
      return "영문 또는 영문+숫자 6자리 이상 입력해주세요";
    }
    return "";
  };

  /* 아이디 중복 확인 API 호출 */
  const checkUserIdDuplicate = async () => {
    // 1) 클라이언트 유효성 검사
    const errorMsg = getUserIdError(userId);
    if (errorMsg) {
      setErrors((prev) => ({ ...prev, userId: errorMsg }));
      setIsIdAvailable(null);
      setIdCheckMessage(errorMsg);
      return;
    }

    try {
      setIsCheckingId(true);
      setIdCheckMessage("");
      setIsIdAvailable(null);

      const response = await fetch(
        `http://localhost:8080/api/check-id?userId=${encodeURIComponent(
          userId
        )}`
      );

      if (!response.ok) {
        throw new Error("서버 오류");
      }

      const data = await response.json();
      // 백엔드가 boolean만 주는 경우와 { duplicate: true/false } 둘 다 대응
      const duplicate =
        typeof data === "boolean" ? data : Boolean(data.duplicate);

      if (duplicate) {
        setIsIdAvailable(false);
        setIdCheckMessage("이미 사용 중인 아이디입니다.");
      } else {
        setIsIdAvailable(true);
        setIdCheckMessage("사용 가능한 아이디입니다.");
      }
    } catch (err) {
      setIsIdAvailable(null);
      setIdCheckMessage("아이디 중복 확인 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingId(false);
    }
  };

  /* 비밀번호 유효성 검사 */
  const getPasswordError = (value) => {
    if (!value.trim()) {
      return "비밀번호는 필수 입력값입니다.";
    }
    if (value.length < 8 || value.length > 20) {
      return "비밀번호는 8~20자 사이여야 합니다.";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])/.test(value)) {
      return "반드시 문자, 숫자, 특수문자가 포함되어야 합니다.";
    }
    return "";
  };

  const getPasswordConfirmError = (value, passwordValue) => {
    if (!value.trim()) {
      return "비밀번호 확인이 필요합니다.";
    }
    if (value !== passwordValue) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "";
  };

  /* 이메일 유효성 검사 */
  const getEmailError = (idValue, domainValue) => {
    const id = idValue.trim();
    const d = domainValue.trim();

    if (!id && !d) {
      return "이메일을 입력해주세요.";
    }
    if (!id) {
      return "이메일 아이디를 입력해주세요.";
    }

    if (!/^(?=.*[A-Za-z0-9])[A-Za-z0-9._-]+$/.test(id)) {
      return "이메일을 정확하게 입력해주세요.";
    }
    if (!d) {
      return "이메일 도메인을 선택하거나 입력해주세요.";
    }

    const fullEmail = `${id}@${d}`;

    // 간단한 이메일 형식 검사
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fullEmail)) {
      return "올바른 이메일 형식이 아닙니다.";
    }

    return "";
  };

  /* 개별 필드 onBlur 시 유효성 검사 */
  const validateField = (fieldName) => {
    setErrors((prev) => {
      const updated = { ...prev };

      if (fieldName === "userId") {
        updated.userId = getUserIdError(userId);
      } else if (fieldName === "password") {
        updated.password = getPasswordError(password);
        if (passwordConfirm) {
          updated.passwordConfirm = getPasswordConfirmError(
            passwordConfirm,
            password
          );
        }
      } else if (fieldName === "passwordConfirm") {
        updated.passwordConfirm = getPasswordConfirmError(
          passwordConfirm,
          password
        );
      } else if (fieldName === "email") {
        updated.email = getEmailError(emailId, domain);
      }

      return updated;
    });
  };

  /* 전체 유효성 검사 */
  const validateAll = () => {
    const newErrors = {
      userId: getUserIdError(userId),
      password: getPasswordError(password),
      passwordConfirm: getPasswordConfirmError(passwordConfirm, password),
      email: getEmailError(emailId, domain),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    return !hasError;
  };

  /* form onSubmit 핸들러 */
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) return;

    const payload = {
      userId,
      password,
      email: `${emailId}@${domain}`,
    };

    if (onValidSubmit) {
      onValidSubmit(payload);
    }
  };

  return {
    // 상태
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
    setIsCustom,

    // 에러 & 검증
    errors,
    validateField,
    validateAll,

    // 이벤트 핸들러
    handleDomainChange,
    handleSubmit,

    // 아이디 중복확인
    idCheckMessage,
    isIdAvailable,
    isCheckingId,
    checkUserIdDuplicate,
  };
}
