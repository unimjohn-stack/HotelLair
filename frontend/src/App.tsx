import './App.css'
import HomePage from './pages/Homepage'
import { BookingSearchProvider } from './context/BookingSearchContext'

function App() {
  return (
    <>
    <BookingSearchProvider>
      <HomePage/>
    </BookingSearchProvider>
    </>
  )
}

export default App