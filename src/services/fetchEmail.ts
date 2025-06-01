export async function fetchEmail(email: string) {
  const API_URL = `${process.env.NEXT_PUBLIC_AWS_API}/email`;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  console.log(res);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`AWS API 호출 실패: ${error}`);
  }

  return res.json();
}
