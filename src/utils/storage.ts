// 스토리지에 접근하는 기능을 제공하는 유틸 함수입니다.
export const getStorageValue = (key: string) => {
  const data = localStorage.getItem(key) || sessionStorage.getItem(key);
  return data;
};

export const setStorageValue = <T>(type: string, key: string, value: T) => {
  const storage = type === "session" ? sessionStorage : localStorage;
  const data = storage.setItem(key, JSON.stringify(value));
  return data;
};

export const deleteStorageValue = (key: string) => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};
