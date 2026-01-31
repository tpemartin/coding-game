# MUI Design System Guide

A comprehensive guide for building consistent, scalable React UIs with Material-UI.

## Table of Contents
1. [Core Concepts](#core-concepts)
2. [Component Hierarchy](#component-hierarchy)
3. [Layout Patterns](#layout-patterns)
4. [Form Patterns](#form-patterns)
5. [Data Display](#data-display)
6. [Navigation](#navigation)
7. [Dialogs & Modals](#dialogs--modals)
8. [Theming](#theming)
9. [Component Library](#component-library)

## Core Concepts

### The sx Prop
The `sx` prop is the primary way to style components. It accepts theme-aware values and provides responsive design out of the box.

```tsx
<Box sx={{
  // Values automatically resolve through theme
  color: 'primary.main',
  backgroundColor: 'background.paper',
  
  // Responsive arrays
  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
  
  // Nested selectors
  '& .child': { color: 'red' },
  
  // Pseudo-classes
  '&:hover': { backgroundColor: 'action.hover' },
}}>
  Content
</Box>
```

### Spacing System
MUI uses an 8px base unit. The `spacing` function multiplies by 8:
- `spacing(1)` = 8px
- `spacing(2)` = 16px
- `spacing(3)` = 24px
- `spacing(4)` = 32px

Use with `sx` prop: `p: 2` (16px padding), `gap: 3` (24px gap)

### Breakpoints
```tsx
// Default breakpoints
xs: 0px        // Extra small
sm: 600px      // Small
md: 960px      // Medium
lg: 1280px     // Large
xl: 1920px     // Extra large

// Usage
sx={{
  width: { xs: '100%', sm: '80%', md: '50%' },
  flexDirection: { xs: 'column', md: 'row' }
}}
```

## Component Hierarchy

### Layout Components (No direct content)
These components structure your layout:

```tsx
<Container>        // Constrains max-width, typically for pages
  <Box>            // Generic flex container, most flexible
    <Stack>        // Flex with default direction and spacing
      <Grid>       // Responsive grid system
```

### Content Components
These components display content:

```tsx
<Typography>       // All text content
<Button>          // Actions
<Card>            // Content containers
<List>            // Vertical item collections
<Table>           // Tabular data
```

### Form Components
```tsx
<TextField>       // Single input
<FormControl>     // Form control wrapper
<Select>          // Dropdown selection
<Checkbox>        // Boolean input
<RadioGroup>      // Mutually exclusive options
```

## Layout Patterns

### Full-Width Page with Sidebar
```tsx
import { Box, Drawer, AppBar, Toolbar, Container, Stack } from '@mui/material'

export function PageWithSidebar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>{/* Nav content */}</Toolbar>
      </AppBar>
      
      <Drawer variant="permanent" sx={{ width: 240 }}>
        {/* Sidebar content */}
      </Drawer>
      
      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="lg">
          {/* Main content */}
        </Container>
      </Box>
    </Box>
  )
}
```

### Centered Card Layout
```tsx
import { Box, Card, CardContent, Container, Stack } from '@mui/material'

export function CenteredLayout() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            {/* Content */}
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
```

### Responsive Grid Layout
```tsx
import { Container, Grid, Card, CardContent } from '@mui/material'

export function GridLayout() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>{item.content}</CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
```

### Two-Column Split
```tsx
<Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
  <Box sx={{ flex: 1 }}>
    {/* Left column */}
  </Box>
  <Box sx={{ flex: 1 }}>
    {/* Right column */}
  </Box>
</Stack>
```

## Form Patterns

### Basic Form
```tsx
import { 
  Box, Stack, TextField, Button, FormControlLabel, 
  Checkbox, Alert 
} from '@mui/material'
import { useState } from 'react'

export function MyForm() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validate and submit
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      {error && <Alert severity="error">{error}</Alert>}
      
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
        />
        
        <Button 
          fullWidth 
          variant="contained" 
          type="submit"
        >
          Sign In
        </Button>
      </Stack>
    </Box>
  )
}
```

### Select/Dropdown
```tsx
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

<FormControl fullWidth>
  <InputLabel>Category</InputLabel>
  <Select
    value={category}
    label="Category"
    onChange={(e) => setCategory(e.target.value)}
  >
    <MenuItem value="cat1">Category 1</MenuItem>
    <MenuItem value="cat2">Category 2</MenuItem>
  </Select>
</FormControl>
```

## Data Display

### Table
```tsx
import { 
  Table, TableHead, TableBody, TableRow, TableCell,
  TablePagination, Paper
} from '@mui/material'
import { useState } from 'react'

export function DataTable({ rows }) {
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'action.hover' }}>
            <TableCell>Name</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
      />
    </Paper>
  )
}
```

### List
```tsx
import { 
  List, ListItem, ListItemIcon, ListItemText,
  Divider, Avatar
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

<List>
  {items.map((item) => (
    <div key={item.id}>
      <ListItem button onClick={() => handleSelect(item)}>
        <ListItemIcon>
          <Avatar>{item.initial}</Avatar>
        </ListItemIcon>
        <ListItemText 
          primary={item.title}
          secondary={item.subtitle}
        />
      </ListItem>
      <Divider />
    </div>
  ))}
</List>
```

## Navigation

### App Bar with Menu
```tsx
import { 
  AppBar, Toolbar, Typography, Menu, MenuItem,
  IconButton
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState } from 'react'

export function Header() {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        
        <IconButton
          size="large"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <AccountCircleIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
```

### Breadcrumb Navigation
```tsx
import { Breadcrumbs, Link, Typography } from '@mui/material'

<Breadcrumbs aria-label="breadcrumb">
  <Link color="inherit" href="/">
    Home
  </Link>
  <Link color="inherit" href="/parent">
    Parent
  </Link>
  <Typography color="textPrimary">Current</Typography>
</Breadcrumbs>
```

## Dialogs & Modals

### Confirmation Dialog
```tsx
import { 
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button
} from '@mui/material'
import { useState } from 'react'

export function ConfirmDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Delete
      </Button>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to delete?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleDelete} 
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
```

### Form Modal
```tsx
<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle>Edit Item</DialogTitle>
  <DialogContent sx={{ pt: 2 }}>
    <Stack spacing={2}>
      <TextField fullWidth label="Name" />
      <TextField fullWidth label="Description" multiline rows={4} />
    </Stack>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleSave} variant="contained">
      Save
    </Button>
  </DialogActions>
</Dialog>
```

## Theming

### Custom Theme
```tsx
// src/theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: ['"Roboto"', '"Helvetica Neue"', 'Arial'].join(','),
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 700 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})

export default theme
```

### Using Theme in Components
```tsx
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

export function ThemedComponent() {
  const theme = useTheme()

  return (
    <Box sx={{ color: theme.palette.primary.main }}>
      Content
    </Box>
  )
}
```

## Component Library

### Reusable Button Variants
```tsx
// components/common/Buttons.tsx
import { Button, ButtonProps } from '@mui/material'

export function PrimaryButton(props: ButtonProps) {
  return <Button variant="contained" color="primary" {...props} />
}

export function SecondaryButton(props: ButtonProps) {
  return <Button variant="outlined" {...props} />
}

export function DangerButton(props: ButtonProps) {
  return <Button variant="contained" color="error" {...props} />
}
```

### Reusable Card
```tsx
// components/common/Card.tsx
import { Card as MuiCard, CardProps, CardContent } from '@mui/material'
import { ReactNode } from 'react'

interface CustomCardProps extends CardProps {
  children: ReactNode
}

export function Card({ children, ...props }: CustomCardProps) {
  return (
    <MuiCard sx={{ borderRadius: 2, boxShadow: 1 }} {...props}>
      <CardContent>
        {children}
      </CardContent>
    </MuiCard>
  )
}
```

### Loading State
```tsx
import { CircularProgress, Box } from '@mui/material'

export function LoadingSpinner() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '200px'
    }}>
      <CircularProgress />
    </Box>
  )
}
```

### Empty State
```tsx
import { Box, Typography } from '@mui/material'

export function EmptyState({ message }: { message: string }) {
  return (
    <Box sx={{ 
      py: 4, 
      textAlign: 'center'
    }}>
      <Typography color="textSecondary">
        {message}
      </Typography>
    </Box>
  )
}
```

## Best Practices Summary

1. **Always use responsive design** - Never assume a single screen size
2. **Prefer `sx` prop** - Use it instead of CSS files for component styling
3. **Leverage spacing system** - Use theme spacing, not hardcoded pixels
4. **Keep components small** - Aim for ~100-200 lines per component
5. **Use semantic components** - Not every container is a div
6. **Follow theming** - Use theme colors instead of hardcoding hex values
7. **Accessibility first** - Include labels, ARIA attributes, and semantic HTML
8. **Composition over inheritance** - Build components by combining smaller ones
9. **Document APIs** - Use JSDoc for props and expected behavior
10. **Test responsive** - Check designs at xs, sm, md, lg, xl breakpoints
