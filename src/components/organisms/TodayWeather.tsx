import { useMemo } from "react";

import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useVilageFcst } from "@/lib/query/weather.query";
import { convertCoordinate } from "@/utils/convertCoordinate";
import { getSkyStatus } from "@/utils/convertWeatherDetailData";

interface WeatherTimeCell {
  time: string; // 05시 이후의 시간
  tmp: string; // 기온
  pop: string; // 강수확률
  reh: string; // 습도
  sky: string; // 하늘상태
}

// 사용자 위치 기반 오늘의 시간대별 날씨를 반환하는 컴포넌트
const TodayWeather = () => {
  const { latitude, longitude, error, loading } = useCurrentLocation();

  // 현재 날짜 정보 생성
  const getCurrentDateTime = () => {
    const now = new Date();
    const baseDate = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    return { baseDate };
  };

  const { baseDate } = getCurrentDateTime();

  // 위경도 좌표 반환
  const gridCoordinate = useMemo(() => {
    if (!loading && !error) {
      return convertCoordinate(latitude, longitude);
    }
    return null;
  }, [latitude, longitude, loading, error]);

  // 날씨 정보 요청
  const { data: weatherData } = useVilageFcst({
    serviceKey: import.meta.env.VITE_WEATHER_SHORT_KEY as string,
    pageNo: 1,
    numOfRows: 500,
    dataType: "JSON",
    base_date: baseDate,
    base_time: "0500",
    nx: gridCoordinate?.nx ?? 0,
    ny: gridCoordinate?.ny ?? 0,
  });

  // 오늘 날짜의 시간대별 데이터 추출
  const todayWeatherByTime = useMemo(() => {
    if (weatherData?.status !== "success") return [];

    const items = weatherData?.data?.response?.body?.items?.item;
    if (!items) return [];

    // 시간대별 데이터 그룹화
    const timeGroup = items.reduce<Record<string, WeatherTimeCell>>((acc, item) => {
      // baseDate와 fcstDate가 같은 데이터만 처리
      if (item.baseDate !== item.fcstDate) return acc;

      const timeKey = item.fcstTime;

      if (!acc[timeKey]) {
        acc[timeKey] = {
          time: timeKey,
          tmp: "",
          pop: "",
          reh: "",
          sky: "",
        };
      }

      switch (item.category) {
        case "TMP":
          acc[timeKey].tmp = item.fcstValue;
          break;
        case "POP":
          acc[timeKey].pop = item.fcstValue;
          break;
        case "REH":
          acc[timeKey].reh = item.fcstValue;
          break;
        case "SKY":
          acc[timeKey].sky = item.fcstValue;
          break;
      }
      return acc;
    }, {});

    return Object.values(timeGroup).sort((a, b) => a.time.localeCompare(b.time));
  }, [weatherData]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>오류: {error}</div>;
  if (!weatherData) return <div>날씨 정보가 없습니다. </div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">시간대별 날씨</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="sticky left-0 bg-gray-50 px-4 py-2 border text-nowrap">구분</th>
              {todayWeatherByTime.map((timeData) => (
                <th key={timeData.time} className="px-4 py-2 border min-w-[100px]">
                  {`${timeData.time.slice(0, 2)}:${timeData.time.slice(2)}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 하늘상태 행 */}
            <tr>
              <td className="sticky left-0 bg-white px-4 py-2 border font-medium text-nowrap">
                하늘상태
              </td>
              {todayWeatherByTime.map((timeData) => (
                <td key={`sky-${timeData.time}`} className="px-4 py-2 border text-center">
                  {getSkyStatus(timeData.sky)}
                </td>
              ))}
            </tr>
            {/* 기온 행 */}
            <tr>
              <td className="sticky left-0 bg-white px-4 py-2 border font-medium">기온</td>
              {todayWeatherByTime.map((timeData) => (
                <td key={`tmp-${timeData.time}`} className="px-4 py-2 border text-center">
                  {timeData.tmp}°C
                </td>
              ))}
            </tr>
            {/* 강수확률 행 */}
            <tr>
              <td className="sticky left-0 bg-white px-4 py-2 border font-medium">강수확률</td>
              {todayWeatherByTime.map((timeData) => (
                <td key={`pop-${timeData.time}`} className="px-4 py-2 border text-center">
                  {timeData.pop}%
                </td>
              ))}
            </tr>
            {/* 습도 행 */}
            <tr>
              <td className="sticky left-0 bg-white px-4 py-2 border font-medium">습도</td>
              {todayWeatherByTime.map((timeData) => (
                <td key={`reh-${timeData.time}`} className="px-4 py-2 border text-center">
                  {timeData.reh}%
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayWeather;
