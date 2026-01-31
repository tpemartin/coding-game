# Component Library

This directory contains all reusable React components built with Material-UI.

## Directory Structure

```
components/
├── common/              # Shared components used across the app
│   ├── Header.tsx       # Top app bar
│   ├── Footer.tsx       # Footer component
│   └── ...
├── games/              # Game-specific components
├── layout/             # Layout wrapper components
└── README.md           # This file
```

## Quick Start

### Creating a New Component

1. **Small reusable component** (common/)
```tsx
import { Box, BoxProps } from '@mui/material'

interface CustomBoxProps extends BoxProps {
  // Your custom props
}

export function CustomBox({ children, ...props }: CustomBoxProps) {
  return (
    <Box sx={{ /* styles */ }} {...props}>
      {children}
    </Box>
  )
}
```

2. **Page/Game component**
```tsx
import { Container, Stack, Typography } from '@mui/material'

export function GamePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h4">Game Name</Typography>
        {/* Content */}
      </Stack>
    </Container>
  )
}
```

## Common Patterns

### Props with MUI Components
```tsx
import { Button, ButtonProps } from '@mui/material'

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean
}

export function LoadableButton({ isLoading, children, ...props }: CustomButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </Button>
  )
}
```

### Using Theme Hook
```tsx
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

export function ThemeAwareComponent() {
  const theme = useTheme()
  
  return (
    <Box sx={{ color: theme.palette.primary.main }}>
      Content
    </Box>
  )
}
```

### Responsive Components
```tsx
import { Box, Stack } from '@mui/material'

export function ResponsiveLayout() {
  return (
    <Stack 
      direction={{ xs: 'column', md: 'row' }} 
      spacing={{ xs: 2, md: 4 }}
    >
      {/* Stacks vertically on mobile, horizontally on desktop */}
    </Stack>
  )
}
```

## File Naming

- **Components**: PascalCase (e.g., `GameCard.tsx`)
- **Utilities**: camelCase (e.g., `useGameState.ts`)
- **Types**: camelCase with `.types.ts` suffix (e.g., `game.types.ts`)

## Exports

Always export components from an `index.ts` file:

```tsx
// components/common/index.ts
export { Header } from './Header'
export { Footer } from './Footer'
export { CustomButton } from './CustomButton'
```

Then import: `import { Header, Footer } from '@/components/common'`

## Testing

Components should be testable and not overly complex:
- Props are well-defined and typed
- State is managed at the appropriate level
- Side effects are isolated and testable
- Components are single-responsibility

## Documentation

Add JSDoc comments to component files:

```tsx
/**
 * A reusable game card component.
 * 
 * @param {string} title - The game title
 * @param {string} description - The game description
 * @param {function} onPlay - Callback when play button is clicked
 */
export function GameCard({ title, description, onPlay }: GameCardProps) {
  // ...
}
```

## MUI Integration

All components should:
1. Use MUI components as the base
2. Accept `sx` prop for additional styling
3. Respect the theme (colors, spacing, typography)
4. Support responsive design
5. Include proper TypeScript types

## Examples

See existing components in this directory for patterns and best practices.
