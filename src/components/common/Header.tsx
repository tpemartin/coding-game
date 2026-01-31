import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export interface HeaderProps {
  currentPage?: string
  onPageChange?: (page: string) => void
  pages?: Array<{ id: string; label: string }>
}

export function Header({ currentPage = 'verbos', onPageChange, pages }: HeaderProps) {
  const [navigationMenuAnchor, setNavigationMenuAnchor] = useState<null | HTMLElement>(null)
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null)

  const handleNavigationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNavigationMenuAnchor(event.currentTarget)
  }

  const handleNavigationMenuClose = () => {
    setNavigationMenuAnchor(null)
  }

  const handlePageSelect = (pageId: string) => {
    onPageChange?.(pageId)
    handleNavigationMenuClose()
  }

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget)
  }

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null)
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {/* Navigation Menu Icon */}
          {pages && pages.length > 0 && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleNavigationMenuOpen}
              sx={{ mr: 2 }}
              title="Pages"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Coding Game
          </Typography>

          {/* Account Menu */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleAccountMenuOpen}
              title="Account"
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Menu */}
      {pages && pages.length > 0 && (
        <Menu
          anchorEl={navigationMenuAnchor}
          open={Boolean(navigationMenuAnchor)}
          onClose={handleNavigationMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.id}
              onClick={() => handlePageSelect(page.id)}
              selected={currentPage === page.id}
            >
              {page.label}
            </MenuItem>
          ))}
        </Menu>
      )}

      {/* Account Menu */}
      <Menu
        anchorEl={accountMenuAnchor}
        open={Boolean(accountMenuAnchor)}
        onClose={handleAccountMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAccountMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleAccountMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Spacing for fixed AppBar */}
      <Toolbar />
    </>
  )
}
