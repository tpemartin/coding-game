import { useState, useEffect } from 'react'
import {
  Container,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Alert,
  Box,
  Typography,
  Stack,
  Paper,
} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

const VERB_DATA = [
  { sp: 'Abrocharse', en: 'To button / To tie / To fasten / To zip' },
  { sp: 'Aburrirse (de)', en: 'To get bored (with)' },
  { sp: 'Acordarse (de)', en: 'To remember' },
  { sp: 'Acostarse', en: 'To lay down / To go to bed' },
  { sp: 'Afeitarse', en: 'To shave' },
  { sp: 'Alegrarse (de)', en: 'To be glad / happy / pleased (about)' },
  { sp: 'Arreglarse', en: 'To groom / To get ready' },
  { sp: 'Bañarse', en: 'To take a bath / shower' },
  { sp: 'Cepillarse', en: 'To brush (hair, teeth)' },
  { sp: 'Darse cuenta de', en: 'To realize' },
  { sp: 'Despertarse', en: 'To wake up' },
  { sp: 'Divertirse (con)', en: 'To have fun (with)' },
  { sp: 'Dormirse', en: 'To fall asleep / To oversleep' },
  { sp: 'Ducharse', en: 'To shower' },
  { sp: 'Enamorarse (de)', en: 'To fall in love (with)' },
  { sp: 'Enojarse (con)', en: 'To get or become angry (with)' },
  { sp: 'Irse / Marcharse', en: 'To leave / To go away' },
  { sp: 'Lavarse', en: 'To wash oneself' },
  { sp: 'Levantarse', en: 'To get up / To stand up' },
  { sp: 'Llamarse', en: 'To be named / To be called' },
  { sp: 'Maquillarse', en: 'To put makeup on' },
  { sp: 'Olvidarse (de)', en: 'To forget' },
  { sp: 'Peinarse', en: 'To comb your hair' },
  { sp: 'Ponerse', en: 'To put on (clothing) / To become' },
  { sp: 'Preocuparse por', en: 'To worry about' },
  { sp: 'Quejarse de', en: 'To complain about' },
  { sp: 'Quedarse', en: 'To remain / To stay' },
  { sp: 'Quitarse', en: 'To take off (clothing)' },
  { sp: 'Sentarse', en: 'To sit down' },
  { sp: 'Sentirse', en: 'To feel' },
  { sp: 'Vestirse', en: 'To get dressed' },
]

interface Item {
  id: string
  text: string
  type: 'sp' | 'en'
  pair: string
}

type GameState = 'menu' | 'playing' | 'finished'

type Feedback = {
  type: 'success' | 'error'
  text: string
} | null

export function VerbosReflexivosPage() {
  const [currentSet, setCurrentSet] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [matches, setMatches] = useState<string[]>([])
  const [mistakes, setMistakes] = useState(0)
  const [gameState, setGameState] = useState<GameState>('menu')
  const [feedback, setFeedback] = useState<Feedback>(null)

  const shuffleArray = (array: any[]) => {
    const newArr = [...array]
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
  }

  const startNewGame = () => {
    const fullPool = shuffleArray(VERB_DATA).slice(0, 8)
    const options: Item[] = [
      ...fullPool.map((v) => ({
        id: `sp-${v.sp}`,
        text: v.sp,
        type: 'sp' as const,
        pair: v.sp,
      })),
      ...fullPool.map((v) => ({
        id: `en-${v.sp}`,
        text: v.en,
        type: 'en' as const,
        pair: v.sp,
      })),
    ]
    setCurrentSet(shuffleArray(options))
    setMatches([])
    setSelectedItems([])
    setMistakes(0)
    setGameState('playing')
    setFeedback(null)
  }

  const handleSelect = (item: Item) => {
    if (matches.includes(item.pair) || selectedItems.find((i) => i.id === item.id))
      return

    const newSelection = [...selectedItems, item]
    setSelectedItems(newSelection)

    if (newSelection.length === 2) {
      if (
        newSelection[0].pair === newSelection[1].pair &&
        newSelection[0].type !== newSelection[1].type
      ) {
        // Match found
        setMatches((prev) => [...prev, newSelection[0].pair])
        setSelectedItems([])
        setFeedback({ type: 'success', text: '¡Excelente!' })
      } else {
        // Mistake
        setMistakes((prev) => prev + 1)
        setFeedback({
          type: 'error',
          text: `Not quite. ${newSelection.find((i) => i.type === 'sp')?.text || 'That verb'} matches with its specific meaning.`,
        })
        setTimeout(() => setSelectedItems([]), 1000)
      }
    } else {
      setFeedback(null)
    }
  }

  useEffect(() => {
    if (matches.length === 8 && gameState === 'playing') {
      setGameState('finished')
    }
  }, [matches, gameState])

  return (
    <Container maxWidth="lg" sx={{ py: 4, pb: 8 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
              Verbos Reflexivos
            </Typography>
          </Stack>
          <Typography variant="subtitle1" color="textSecondary">
            Master the action of the self.
          </Typography>
        </Box>

        {/* Menu State */}
        {gameState === 'menu' && (
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardContent sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Ready to test your memory?
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: 'center', maxWidth: 400, mb: 4 }}
              >
                We've selected a subset of reflexive verbs for you. Match the Spanish verb to its
                English translation to clear the board.
              </Typography>
              <Button
                onClick={startNewGame}
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: 50,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.2s',
                }}
              >
                Start Review Session
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Playing State */}
        {gameState === 'playing' && (
          <Stack spacing={4}>
            {/* Progress Section */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Progress
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {Math.round((matches.length / 8) * 100)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(matches.length / 8) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box sx={{ textAlign: 'right', minWidth: 80 }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                    MISTAKES
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: mistakes > 5 ? 'error.main' : 'text.primary',
                    }}
                  >
                    {mistakes}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* Feedback Alert */}
            {feedback && (
              <Alert
                severity={feedback.type === 'success' ? 'success' : 'error'}
                icon={feedback.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
                sx={{
                  animation: 'slideInDown 0.3s ease-out',
                  '@keyframes slideInDown': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(-20px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                {feedback.text}
              </Alert>
            )}

            {/* Game Grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(4, 1fr)' },
                gap: 2,
              }}
            >
              {currentSet.map((item) => {
                const isMatched = matches.includes(item.pair)
                const isSelected = selectedItems.find((i) => i.id === item.id)

                return (
                  <Button
                    fullWidth
                    disabled={isMatched}
                      onClick={() => handleSelect(item)}
                      variant={isSelected ? 'contained' : isMatched ? 'outlined' : 'outlined'}
                      color={isSelected ? 'primary' : 'inherit'}
                      sx={{
                        height: 120,
                        p: 2,
                        borderRadius: 2,
                        fontSize: { xs: '0.85rem', md: '1rem' },
                        fontWeight: 500,
                        textAlign: 'center',
                        wordWrap: 'break-word',
                        whiteSpace: 'normal',
                        transition: 'all 0.2s ease',
                        opacity: isMatched ? 0 : 1,
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: isSelected ? 2 : isMatched ? 0 : 0,
                        border: isSelected ? 'none' : '2px solid transparent',
                        '&:hover:not(:disabled)': {
                          boxShadow: 1,
                          borderColor: 'primary.main',
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                )
              })}
            </Box>
          </Stack>
        )}

        {/* Finished State */}
        {gameState === 'finished' && (
          <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
            {/* Header Section */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                color: 'white',
                p: 4,
                textAlign: 'center',
              }}
            >
              <EmojiEventsIcon
                sx={{
                  fontSize: 50,
                  mb: 2,
                  animation: 'bounce 1s infinite',
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                ¡Buen Trabajo!
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Session Complete
              </Typography>
            </Box>

            {/* Content Section */}
            <CardContent sx={{ p: 4 }}>
              {/* Stats Grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' },
                  gap: 2,
                  mb: 4,
                }}
              >
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'action.hover' }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                    Verbs Mastered
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    8
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'action.hover' }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                    Mistakes
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {mistakes}
                    </Typography>
                  </Paper>
                </Box>

              {/* Action Buttons */}
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Button
                  onClick={startNewGame}
                  variant="contained"
                  size="large"
                  sx={{ textTransform: 'none', py: 1.5, fontSize: '1rem' }}
                >
                  Next Set of Verbs
                </Button>
                <Button
                  onClick={() => setGameState('menu')}
                  variant="outlined"
                  size="large"
                  startIcon={<RestartAltIcon />}
                  sx={{ textTransform: 'none', py: 1.5, fontSize: '1rem' }}
                >
                  Back to Start
                </Button>
              </Stack>

              {/* Pedagogical Tip */}
              <Paper sx={{ p: 3, bgcolor: 'info.light', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Pedagogical Tip:
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                  "Reflexive verbs show that the subject is both the doer and the receiver. Try
                  saying the verb aloud with the pronoun 'Me' (e.g., 'Me cepillo') to reinforce
                  the motor memory of the grammar pattern."
                </Typography>
              </Paper>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Container>
  )
}

export default VerbosReflexivosPage
