import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

// 공통 레이아웃 컴포넌트
export default function Layout() {
  return (
    <div className="flex-grow h-full flex flex-col overflow-hidden">
      <Header />
      <div className="h-full px-10 my-5 overflow-auto">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
