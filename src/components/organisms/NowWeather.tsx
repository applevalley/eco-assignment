import { useMemo } from "react";

import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useUltraSrtNcst } from "@/lib/query/weather.query";
import { convertCoordinate } from "@/utils/convertCoordinate";
import {
  formatRainfall,
  getRainfallStatus,
  getWindDirection,
} from "@/utils/convertWeatherDetailData";

// 사용자 위치 기반 현재 날씨를 반환하는 컴포넌트
const NowWeather = () => {
  const { latitude, longitude, error, loading } = useCurrentLocation();

  // 현재 날짜와 시간 정보 생성
  const getCurrentDateTime = () => {
    const now = new Date();
    const baseDate = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    let baseTime = now.getHours() * 100;
    // API는 매시각 40분에 생성되므로, 40분 이전이면 이전 시각의 데이터를 요청
    if (now.getMinutes() < 40) {
      baseTime = (now.getHours() - 1) * 100;
    }
    return { baseDate, baseTime };
  };

  const { baseDate, baseTime } = getCurrentDateTime();

  // 위경도 좌표 반환
  const gridCoordinate = useMemo(() => {
    if (!loading && !error) {
      return convertCoordinate(latitude, longitude);
    }
    return null;
  }, [latitude, longitude, loading, error]);

  // 날씨 정보 요청
  const { data: weatherData } = useUltraSrtNcst({
    serviceKey: import.meta.env.VITE_WEATHER_SHORT_KEY as string,
    pageNo: 1,
    numOfRows: 10,
    dataType: "JSON",
    base_date: baseDate,
    base_time: baseTime.toString().padStart(4, "0"),
    nx: gridCoordinate?.nx ?? 0,
    ny: gridCoordinate?.ny ?? 0,
  });

  const weatherItems =
    weatherData?.status === "success" ? weatherData.data.response.body.items.item : null;

  if (weatherData?.status === "error") {
    return <div>오류: {weatherData.error}</div>;
  }

  if (!weatherItems) {
    return <div>날씨 정보가 없습니다.</div>;
  }

  const getWeatherValue = (category: string) =>
    weatherItems.find((item) => item.category === category)?.obsrValue;

  const temperature = getWeatherValue("T1H");
  const humidity = getWeatherValue("REH");
  const rainfall = getWeatherValue("RN1");
  const windSpeed = getWeatherValue("WSD");
  const precipitationType = getWeatherValue("PTY");
  const windDirection = getWeatherValue("VEC");

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">현재 날씨</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* 주요 날씨 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-600">기온</h3>
              <p className="text-3xl">{temperature}°C</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">습도</h3>
              <p className="text-3xl">{humidity}%</p>
            </div>
          </div>
        </div>

        {/* 강수 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-600">강수 상태</h3>
              <p>현재: {getRainfallStatus(precipitationType || "0")}</p>
              <p>강수량: {formatRainfall(rainfall || "0")}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">바람</h3>
              <p>풍향: {getWindDirection(Number(windDirection))}풍</p>
              <p>풍속: {windSpeed}m/s</p>
            </div>
          </div>
        </div>

        {/* 측정 시각 */}
        <div className="text-sm text-gray-500 mt-2">
          측정 시각: {baseDate.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")}{" "}
          {baseTime
            .toString()
            .padStart(4, "0")
            .replace(/(\d{2})(\d{2})/, "$1:$2")}
        </div>
      </div>
    </div>
  );
};

export default NowWeather;
