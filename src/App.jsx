import Hero from "./components/Hero";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <div className="h-[50vh] w-screen bg-blue-500"></div>
    </main>
  );
}

export default App;
