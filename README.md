# 프로젝트 실행

아래의 절차를 통해 의존성을 설치하고, 프로젝트를 실행합니다.

1. npm install
2. npm run dev

# 프로젝트 구조

```
📦eco-assignment
┣ 📂public
┃ ┣ 📜locationData.xlsx
┃ ┗ 📜vite.svg
┣ 📂src
┃ ┣ 📂apis
┃ ┃ ┣ 📜index.ts
┃ ┃ ┗ 📜weather.ts
┃ ┣ 📂assets
┃ ┃ ┗ 📜react.svg
┃ ┣ 📂components
┃ ┃ ┣ 📂organisms
┃ ┃ ┃ ┣ 📜LocationSearch.tsx
┃ ┃ ┃ ┣ 📜NowWeather.tsx
┃ ┃ ┃ ┗ 📜TodayWeather.tsx
┃ ┃ ┣ 📂pages
┃ ┃ ┃ ┗ 📜WeatherPage.tsx
┃ ┃ ┣ 📜Header.tsx
┃ ┃ ┗ 📜Layout.tsx
┃ ┣ 📂constants
┃ ┃ ┗ 📜path.ts
┃ ┣ 📂data
┃ ┣ 📂hooks
┃ ┃ ┗ 📜useCurrentLocation.ts
┃ ┣ 📂lib
┃ ┃ ┗ 📂query
┃ ┃ ┃ ┣ 📜index.ts
┃ ┃ ┃ ┗ 📜weather.query.ts
┃ ┣ 📂routes
┃ ┃ ┗ 📜Route.tsx
┃ ┣ 📂type
┃ ┃ ┗ 📜weather.ts
┃ ┣ 📂utils
┃ ┃ ┣ 📜convertCoordinate.ts
┃ ┃ ┣ 📜convertWeatherDetailData.ts
┃ ┃ ┣ 📜queryParameter.ts
┃ ┃ ┗ 📜storage.ts
┃ ┣ 📜App.tsx
┃ ┣ 📜index.css
┃ ┣ 📜main.tsx
┃ ┗ 📜vite-env.d.ts
┣ 📜.env
┣ 📜.gitignore
┣ 📜.prettierrc.json
┣ 📜eslint.config.js
┣ 📜index.html
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜postcss.config.js
┣ 📜README.md
┣ 📜tailwind.config.js
┣ 📜tsconfig.app.json
┣ 📜tsconfig.json
┣ 📜tsconfig.node.json
┗ 📜vite.config.ts
```

# 프로젝트 설명

가장 바깥에 위치하는 메인 페이지인 WeatherPage.tsx 컴포넌트를 기반으로, 페이지 컴포넌트의 하위에 현재 시간의 날씨를 의미하는 NowWeather.tsx 컴포넌트, 당일 시간대별 날씨 정보를 보여주는 TodayWeather.tsx 컴포넌트, 지역명을 검색할 수 있게 하는 LocationSearch.tsx, 그리고 즐겨찾기와 관련된 로직을 포함하게 하였습니다.

## 유저의 현재 위치 감지, 해당 위치의 날씨 정보 반환

사용자의 현재 위치를 기반으로, 위도와 경도 좌표를 반환하는 유틸 함수 useCurrentLocation을 통해, 현재 사용자의 위치의 위도와 경도를 반환합니다. 그리고, 이 좌표를 유틸 함수 convertCoordinate에 전달해, 기상청 API에 전달할 수 있게 변환합니다.

NowWeather 컴포넌트에서는, 이렇게 전달받은 위도와 경도 정보를 기반으로 초단기실황조회 API를 호출해, 사용자 위치 기반으로 현재 시간의 기상 정보를 반환합니다.

## 현재 시간의 날씨 정보와 오늘의 시간대 별 날씨 정보 반환

TodayWeather 컴포넌트에서는, 앞서 거친 유틸함수를 통해 기상청 API에 요청 가능한 위도와 경도 값을 통해, 단기예보조회 API를 호출합니다.

해당 API는 당일을 포함해, 향후의 기상 정보까지 반환하기에, baseDate(기준일자)와 fcstDate(예측일자)가 같은 데이터만 그룹화해 정보를 화면에 반환하도록 하였습니다.

## 유저가 원하는 장소를 검색(광역자치단체, 기초자치단체에 상관없이)하고 그 장소의 날씨 정보 반환

LocationSearch 컴포넌트에서는, Open API에서 제공하는 지역 정보 xlsx 파일을 읽어, 행정동명, X좌표, Y좌표와 같은 3개의 값을 가지는 데이터 배열로 원본 데이터를 가공합니다.

이 데이터 배열에서는, 사용자로부터 입력받은 행정동명을 포함하는 필터된 데이터를 반환하게 되고, 사용자가 하단의 드롭다운 형태의 필터된 데이터에서 특정 행정동명을 선택할 시, 해당 지역의 정보가 상위 컴포넌트인 WeatherPage.tsx로 반환되고, 상위 컴포넌트에서는 이 정보를 props로서 NowWeather.tsx 컴포넌트와 TodayWeather.tsx 컴포넌트에 내려보냅니다.

따라서, 사용자가 특정 지역을 검색하게 되면, 해당 지역의 현재 시간 기준 기상 정보와, 당일 기준 기상 정보를 새롭게 호출해 정보를 반환하게 됩니다.

## 검색한 정보를 즐겨찾기에 추가하기

LocationSearch 컴포넌트를 통해 검색한 정보는, 로컬스토리지에 추가됩니다. 사용자는, 즐겨찾기된 지역명을 클릭해 해당 지역의 기상 정보를 알 수 있습니다.

삭제 버튼을 통해서 해당 지역의 정보를 로컬 스토리지에서 제거할 수 있고, 스토리지에 접근해 값을 조회하거나, 생성 및 삭제하는 과정은 유틸 함수 storage.ts를 통해 이루어집니다.
