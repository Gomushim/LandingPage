"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { db } from "@/firebase";
// import { collection, addDoc } from "firebase/firestore";
import { event } from "@/lib/gtag";
import { fetchEmail } from "@/services/fetchEmail";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // 이메일 형식 검사 함수
  const validateEmail = (email: string) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !isChecked) return;

    // 이메일 형식 검사
    if (!validateEmail(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Firestore에 데이터 저장
      // await addDoc(collection(db, "newsletters"), {
      //   email,
      //   createdAt: new Date(),
      // });

      await fetchEmail(email).catch(e => console.error(e));

      //GA4 이벤트 전송
      event({
        action: "submit",
        category: "newsletter",
        label: "email_registration",
      });

      setSuccess(true);
      setEmail("");
      setIsChecked(false);
    } catch (err) {
      setError("이메일 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("Error saving email:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-11 flex w-full flex-col gap-5 p-11">
      <div className="flex flex-col">
        <label className="mb-1 text-start text-sm font-semibold text-gray-50" htmlFor="email">
          이메일
        </label>
        <Input
          className="mt-1 h-13 rounded-2xl bg-white"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="check"
          checked={isChecked}
          onCheckedChange={checked => setIsChecked(checked === true)}
          className="h-5 w-5 border-gray-50 bg-white text-green-500 data-[state=checked]:border-green-500"
        />
        <label className="text-sm font-semibold text-gray-50" htmlFor="check">
          개인정보 이용 동의
        </label>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">이메일이 성공적으로 등록되었습니다.</p>}
      <Button variant="submit" size="xl" type="submit" disabled={!email || !isChecked || isLoading}>
        {isLoading ? "처리 중..." : "확인"}
      </Button>
    </form>
  );
};
