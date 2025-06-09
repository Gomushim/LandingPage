type EmailList = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type EmailListResponse = {
  subscribers: EmailList[];
  pagination: {
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    lastEvaluatedKey: string;
  };
};

export async function fetchEmail(email: string) {
  const API_URL = `${process.env.NEXT_PUBLIC_AWS_API}/email`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`AWS API 호출 실패: ${error}`);
  }

  return res.json();
}

export async function fetchEmailList({
  page,
  limit,
  lastEvaluatedKey = "",
}: {
  page?: number;
  limit?: number;
  lastEvaluatedKey?: string;
}): Promise<EmailListResponse> {
  const API_URL = `${process.env.NEXT_PUBLIC_AWS_API}/email`;

  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}&lastEvaluatedKey=${lastEvaluatedKey}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`AWS API 호출 실패: ${error}`);
  }

  return res.json();
}

export async function deleteEmail(email: string) {
  const API_URL = `${process.env.NEXT_PUBLIC_AWS_API}/email/${email}`;

  const res = await fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`구독자 삭제 실패: ${error}`);
  }

  return res.json();
}
