import { createTheme } from '@mui/material/styles';
import useUserContext from '../contexts/useUserContext';

export default function customTheme(mode, theme) {
  const { dark } = useUserContext
  const { primaryColor, secondaryColor } = theme

  return createTheme({
      palette: {
        mode: mode,
        primary: primaryColor,
        secondary: secondaryColor,
      },
    })
}