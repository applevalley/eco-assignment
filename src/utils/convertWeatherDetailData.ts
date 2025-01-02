// 초단기 혹은 단기 예보 응답 데이터 안에서, 별도 코드로 표현되는 하늘 형태, 강수 형태, 풍향 코드값을 전달받아, 대응되는 날씨 정보를 반환합니다.
export const getRainfallStatus = (code: string) => {
  const rainfallTypes: Record<string, string> = {
    "0": "없음",
    "1": "비",
    "2": "비/눈",
    "3": "눈",
    "4": "소나기",
    "5": "빗방울",
    "6": "빗방울눈날림",
    "7": "눈날림",
  };
  return rainfallTypes[code] || "없음";
};

export const getSkyStatus = (code: string) => {
  const skyTypes: Record<string, string> = {
    "1": "맑음",
    "3": "구름많음",
    "4": "흐림",
  };
  return skyTypes[code] || "알 수 없음";
};

export const formatRainfall = (value: string) => {
  const numValue = parseFloat(value);

  if (numValue < 1) return "1mm 미만";
  if (numValue >= 1 && numValue < 30) return `${Math.floor(numValue)}mm`;
  if (numValue >= 30 && numValue < 50) return "30~50mm";
  if (numValue >= 50) return "50mm 이상";

  return "측정불가";
};

export const getWindDirection = (deg: number) => {
  const directions = ["북", "북동", "동", "남동", "남", "남서", "서", "북서"];
  const index = Math.round(((deg + 22.5) % 360) / 45);
  return directions[index % 8];
};
