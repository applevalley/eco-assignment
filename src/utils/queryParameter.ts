// API 호출시 사용되는 query parameter를 만들어주는 함수
// 전달받는 type 데이터를 기반으로 null이 아닌 데이터들을 query string으로 연결해 반환합니다.
type AllowedValue = string | number | boolean | (string | number | boolean)[] | null | undefined;

type QueryFormat = "separate" | "join";

// 유효한 값인지 확인하는 헬퍼 함수
const isValidValue = (value: unknown): boolean =>
  value !== null && value !== undefined && value !== "";

export const apiQueryParameter = <T extends Record<string, AllowedValue>>(
  requestData: T,
  format: QueryFormat = "join"
) => {
  const queryParameters = new URLSearchParams();
  Object.entries(requestData).forEach(([key, value]) => {
    if (!isValidValue(value)) {
      return;
    }

    if (format === "separate" && Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined && item !== "") {
          queryParameters.append(key, item.toString());
        }
      });
    } else {
      queryParameters.append(key, (value as NonNullable<typeof value>).toString());
    }
  });
  return queryParameters;
};
