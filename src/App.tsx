import Hero from "./components/Hero"
import Navbar from "./components/Navbar"

function App() {

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-white-primary">
      <div className="mx-20">
      <Navbar />
      <Hero />
      </div>
    </div>
  )
}

export default App
