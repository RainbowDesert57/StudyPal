import './App.css'
import './components/menu-bar'
import MenuBar from './components/menu-bar'
import HomePage from './pages/home'
import ClickSpark from './components/reactBits/click/ClickSpark';

function App() {
  return (
    <>
      <ClickSpark
        sparkColor='#000000'
        sparkSize={15}
        sparkRadius={25}
        sparkCount={8}
        duration={400}
      >
      <MenuBar />
      <HomePage />
      </ClickSpark>
    </>
  )
}

export default App
