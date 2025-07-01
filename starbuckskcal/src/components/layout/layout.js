import "./layout.css";
import starbucksLogo from "../../assets/starbucks.png";

function Layout({ children }) {
  return (
    <div className="layout-root">
      <header className="layout-header">
        <div className="title-container">
          <img src={starbucksLogo} />
          <h1>스타벅스 칼로리 측정</h1>
        </div>
      </header>
      <hr className="layout-divider" />
      <main className="layout-main">
        <aside className="layout-ad left-ad">
          {/* 왼쪽 광고 */}
          <div>광고 영역 (좌)</div>
        </aside>
        <section className="layout-content">
          {/* 페이지별 내용 */}
          {children}
        </section>
        <aside className="layout-ad right-ad">
          {/* 오른쪽 광고 */}
          <div>광고 영역 (우)</div>
        </aside>
      </main>
    </div>
  );
}

export default Layout;
