import { Navigate } from "react-router-dom";

import { PAGE_URL } from "@/constants/path";

import Layout from "@/components/Layout";
import WeatherPage from "@/components/pages/WeatherPage";

// 라우터 컴포넌트
export default function Route() {
  return [
    {
      element: <Layout />,
      children: [
        { path: PAGE_URL.MAIN, element: <WeatherPage /> },
        { path: "*", element: <Navigate to={PAGE_URL.MAIN} replace /> }, // 그 외 페이지에 직접 접근하려는 경우, redirect해줍니다.
      ],
    },
  ];
}
