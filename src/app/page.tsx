export default function Home() {
  return (
    <div className="flex flex-col gap-10 p-6 max-w-6xl mx-auto">
      <section className="bg-blue-600 text-white rounded-lg p-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Классическое приветствие</h1>
        <p className="text-lg mb-6">Какая-то информация по акциям</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Новости и акции</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Скидка!!!</h3>
            <p className="text-gray-600 text-sm">Не пропустите!</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Новое!</h3>
            <p className="text-gray-600 text-sm">Да!</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Бесплатная доставка</h3>
            <p className="text-gray-600 text-sm">Но это не точно</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Популярные товары</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-md transition"
            >
              <div className="bg-gray-200 w-full h-40 mb-4 flex items-center justify-center">
                <span className="text-gray-500">Изображение</span>
              </div>
              <h3 className="font-semibold text-center">Товар {item}</h3>
              <p className="text-blue-600 font-bold mt-2">$99.99</p>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Купить
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
