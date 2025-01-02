type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

// API 응답 결과 타입
export type ActionResult<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      error: string;
      statusCode?: number;
      message?: string;
    };

// 오류 메시지 타입
export type ErrorResult = {
  status: string;
  error: string;
  statusCode: number;
  message: string;
};

interface FetchOptions<T> {
  method?: RequestMethod;
  body?: T;
  headers?: HeadersInit;
  queryParams?: Record<string, string | number | boolean>;
}

async function apiRequest<T, B = unknown>(
  endpoint: string,
  { method = "GET", body, headers = {} }: FetchOptions<B> = {}
): Promise<ActionResult<T>> {
  try {
    const url = `${endpoint}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    // POST, PUT, DELETE 요청에서 body 처리
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    // API 요청
    const response = await fetch(url, fetchOptions);

    // response.ok가 false인 경우 응답 처리
    if (!response.ok) {
      const errorData: ErrorResult = {
        status: "error",
        error: response.statusText,
        statusCode: response.status,
        message: response.statusText,
      };
      throw new Error(JSON.stringify(errorData));
    }

    // JSON 응답 파싱
    const data = await response.json();

    if ("error" in data) {
      const errorData: ErrorResult = {
        status: "error",
        error: data.error,
        statusCode: data.status,
        message: data.message,
      };
      throw new Error(JSON.stringify(errorData));
    }

    return {
      status: "success",
      data: data,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`API 요청 에러: ${error.message}`);
      return {
        status: "error",
        error: error.message,
      };
    }
    console.error(`API 요청 에러: 알 수 없는 오류`);
    return {
      status: "error",
      error: "알 수 없는 오류가 발생했습니다.",
    };
  }
}

// GET 요청
export const getRequest = <T>(endpoint: string, queryParams?: URLSearchParams) => {
  const url = queryParams ? `${endpoint}?${queryParams.toString()}` : endpoint;
  return apiRequest<T>(url, { method: "GET" });
};
