import { createContext, useContext, useState } from 'react'

const MenuContext = createContext()

export const useMenuContext = () => {
  return useContext(MenuContext)
}

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState(null)
  const updateMenu = (menuData) => {
    setMenu(menuData)
  }

  return <MenuContext.Provider value={{ menu, updateMenu }}>{children}</MenuContext.Provider>
}
