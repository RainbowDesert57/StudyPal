import './menu-bar.css'
import MenuButton from './buttons/menu-button'

function MenuBar() {

  return (
      <div className="menuBar">
        <MenuButton>Home</MenuButton>
        <MenuButton>Stats</MenuButton>
        <MenuButton>Report</MenuButton>
        <MenuButton>Syllabus</MenuButton>
        <MenuButton>Focus</MenuButton>
      </div>
  )
}

export default MenuBar
