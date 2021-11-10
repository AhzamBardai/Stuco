import { createTheme } from '@mui/material/styles';

export default function customTheme(mode, theme) {

  const primaryColor = Object.entries({...theme.primaryColor}).reduce( (acc, next) => {
            if(next[1] !== ''){
              acc[next[0]] = next[1]
            }
            return acc
          }, {})

  const secondaryColor = Object.entries({...theme.secondaryColor}).reduce( (acc, next) => {
            if(next[1] !== ''){
              acc[next[0]] = next[1]
            }
            return acc
          }, {})

  return createTheme({
      palette: {
        mode: mode,
        primary: primaryColor,
        secondary: secondaryColor,
      },
    })
}