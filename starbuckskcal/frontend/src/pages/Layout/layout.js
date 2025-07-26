import starbucksLogo from "../../assets/starbucks.png";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#036635]">
      <header className="text-center pt-8 pb-2 text-3xl">
        <div className="flex justify-center items-center gap-8">
          <img src={starbucksLogo} alt="스타벅스" className="w-[10vh] h-[10vh]" />
          <h1>스타벅스 칼로리 측정</h1>
        </div>
      </header>
      <hr className="my-6 border-t-2 border-gray-300" />
      <main className="grid grid-cols-[1fr_2.5fr_1fr] gap-8 px-8">
        <aside className="bg-gray-200 min-h-[60vh] flex items-center justify-center text-gray-500 text-lg rounded-lg">
          <div>광고 영역 (좌)</div>
        </aside>
        <section className="bg-white min-h-[60vh] rounded-lg shadow-sm p-8">
          {children}
        </section>
        <aside className="bg-gray-200 min-h-[60vh] flex items-center justify-center text-gray-500 text-lg rounded-lg">
          <div>광고 영역 (우)</div>
        </aside>
      </main>
    </div>
  );
}

export default Layout;