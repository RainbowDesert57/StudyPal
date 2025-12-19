import './menu-button.css'

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
}



function MenuButton({ children, onClick }: ButtonProps) {

  return (
    <>
      <button className="menuButton" onClick={onClick}>
      {children}
        
      </button>
    </>
  )
}

export default MenuButton
