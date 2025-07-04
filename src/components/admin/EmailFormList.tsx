import React from "react";
import EmailFormListItem from "@/components/admin/EmailFormListItem";

// 더미 데이터
const dummyForms = [
  {
    id: 1,
    title: "환영 인사 이메일",
    updatedAt: "2024-06-01",
    preview: `안녕하세요!

저희 서비스를 이용해주셔서 진심으로 감사드립니다. 회원님의 가입을 진심으로 환영합니다.

아래 버튼을 클릭하시면 서비스 가이드와 함께 다양한 혜택을 확인하실 수 있습니다.

- 서비스 소개
- 자주 묻는 질문
- 고객센터 안내

앞으로도 많은 관심과 이용 부탁드립니다.
감사합니다.

[서비스 시작하기]`,
  },
  {
    id: 2,
    title: "비밀번호 재설정 안내",
    updatedAt: "2024-05-28",
    preview: `안녕하세요.

비밀번호 재설정 요청이 접수되었습니다. 아래 버튼을 클릭하여 새로운 비밀번호를 설정해 주세요.

만약 본인이 요청하지 않았다면 이 이메일을 무시하셔도 됩니다.

- 비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.
- 문의사항이 있으시면 고객센터로 연락해 주세요.

[비밀번호 재설정]

감사합니다.`,
  },
  {
    id: 3,
    title: "구독 해지 확인 안내",
    updatedAt: "2024-05-20",
    preview: `안녕하세요.

구독 해지 요청이 정상적으로 처리되었습니다. 그동안 저희 서비스를 이용해주셔서 감사합니다.

- 남은 기간 동안은 기존 혜택을 계속 이용하실 수 있습니다.
- 언제든 다시 돌아오실 수 있습니다!

더 나은 서비스로 다시 찾아뵙겠습니다.
감사합니다.`,
  },
  {
    id: 4,
    title: "이벤트 당첨 안내",
    updatedAt: "2024-05-15",
    preview: `축하합니다!

회원님께서는 2024년 5월 신규 가입 이벤트에 당첨되셨습니다.

- 경품: 스타벅스 기프티콘 1매
- 발송일: 2024-05-18 (문자 또는 이메일로 발송)

앞으로도 다양한 이벤트가 준비되어 있으니 많은 참여 부탁드립니다.

감사합니다!`,
  },
  {
    id: 5,
    title: "환영 인사 이메일",
    updatedAt: "2024-06-01",
    preview: `안녕하세요!

저희 서비스를 이용해주셔서 진심으로 감사드립니다. 회원님의 가입을 진심으로 환영합니다.

아래 버튼을 클릭하시면 서비스 가이드와 함께 다양한 혜택을 확인하실 수 있습니다.

- 서비스 소개
- 자주 묻는 질문
- 고객센터 안내

앞으로도 많은 관심과 이용 부탁드립니다.
감사합니다.

[서비스 시작하기]`,
  },
  {
    id: 6,
    title: "비밀번호 재설정 안내",
    updatedAt: "2024-05-28",
    preview: `안녕하세요.

비밀번호 재설정 요청이 접수되었습니다. 아래 버튼을 클릭하여 새로운 비밀번호를 설정해 주세요.

만약 본인이 요청하지 않았다면 이 이메일을 무시하셔도 됩니다.

- 비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.
- 문의사항이 있으시면 고객센터로 연락해 주세요.

[비밀번호 재설정]

감사합니다.`,
  },
  {
    id: 7,
    title: "구독 해지 확인 안내",
    updatedAt: "2024-05-20",
    preview: `안녕하세요.

구독 해지 요청이 정상적으로 처리되었습니다. 그동안 저희 서비스를 이용해주셔서 감사합니다.

- 남은 기간 동안은 기존 혜택을 계속 이용하실 수 있습니다.
- 언제든 다시 돌아오실 수 있습니다!

더 나은 서비스로 다시 찾아뵙겠습니다.
감사합니다.`,
  },
  {
    id: 8,
    title: "이벤트 당첨 안내",
    updatedAt: "2024-05-15",
    preview: `축하합니다!

회원님께서는 2024년 5월 신규 가입 이벤트에 당첨되셨습니다.

- 경품: 스타벅스 기프티콘 1매
- 발송일: 2024-05-18 (문자 또는 이메일로 발송)

앞으로도 다양한 이벤트가 준비되어 있으니 많은 참여 부탁드립니다.

감사합니다!`,
  },
];

export default function EmailFormList() {
  return (
    <div className="mx-auto mt-8 w-full px-5">
      <div className="columns-1 gap-4 space-y-4 md:columns-4">
        {dummyForms.map(form => (
          <EmailFormListItem key={form.id} {...form} />
        ))}
      </div>
    </div>
  );
}
