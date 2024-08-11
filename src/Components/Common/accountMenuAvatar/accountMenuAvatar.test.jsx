import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AccountMenuAvatar } from './accountMenuAvatar'
import { useUserContext } from '../../../Context/user'
import { userAuth } from '../../../Hooks/Models/userAuth'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../../../Context/themes'

// Mock de los hooks y contextos
vi.mock('../../../Context/user', () => ({
  useUserContext: vi.fn()
}))

vi.mock('../../../Hooks/Models/userAuth', () => ({
  userAuth: vi.fn()
}))

describe('AccountMenuAvatar', () => {
  const mockUser = {
    user: {
      first_name: 'John',
      last_name: 'Doe',
      role: { name: 'Admin' }
    }
  }

  const mockLogout = vi.fn()

  beforeEach(() => {
    useUserContext.mockReturnValue({ user: mockUser })
    userAuth.mockReturnValue({ logout: mockLogout })
  })
  it('llama a la función logout al hacer clic en "Logout"', async () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <AccountMenuAvatar />
        </BrowserRouter>
      </ThemeProvider>
    )
    const avatarButton = screen.getByRole('button')
    fireEvent.click(avatarButton)

    const logoutMenuItem = await screen.findByText('Logout')
    fireEvent.click(logoutMenuItem)

    expect(mockLogout).toHaveBeenCalled()
  })
})
