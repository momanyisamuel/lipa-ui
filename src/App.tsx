import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import MainLayout from "./components/main-layout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Orders from "./pages/Orders"
import Expenses from "./pages/Expenses"


function App() {
  return (
    <ThemeProvider>
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
      <Route path="/orders" element={<MainLayout><Orders /></MainLayout>} />
      <Route path="/expenses" element={<MainLayout><Expenses /></MainLayout>} />
    </Routes>
    </ThemeProvider>
  )
}

export default App
