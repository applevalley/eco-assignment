import { useState, useEffect } from "react";

interface LocationState {
  latitude: number;
  longitude: number;
  error: string | null;
  loading: boolean;
}

// 사용자의 현재 위치를 기반으로, 위도와 경도 좌표를 반환합니다.
export const useCurrentLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: 0,
    longitude: 0,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
        loading: false,
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          error: error.message,
          loading: false,
        }));
      }
    );
  }, []);

  return location;
};
