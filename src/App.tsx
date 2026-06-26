function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <section className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
          Toy Store Frontend
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Inventario de juguetes
        </h1>

        <p className="mt-4 max-w-2xl text-slate-500">
          Frontend creado con React, TypeScript, Vite y Tailwind CSS.
        </p>

        <button className="mt-8 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-blue-600">
          Tailwind funcionando
        </button>
      </section>
    </main>
  )
}

export default App