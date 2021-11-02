import { createTheme } from '@mui/material/styles';

export const autumn = (type) => {
  switch (type) {
    case 'light':
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#ff8a65',
            contrastText: '#000000',
          },
          secondary: {
            main: '#800000',
          },
        },
      })

    case 'dark':
      return createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#ff8a65',
            contrastText: '#000000',
          },
          secondary: {
            main: '#800000',
          },
        },
      })
    default:
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#ff8a65',
            contrastText: '#000000',
          },
          secondary: {
            main: '#800000',
          },
        },
      })
  }
}
export const summer = (type) => {
  switch (type) {
    case 'light':
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#ffee58',
            contrastText: '#000000',
          },
          secondary: {
            main: '#81d4fa',
          },
        },
        
      })

    case 'dark':
      return createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#ffee58',
            contrastText: '#000000',
          },
          secondary: {
            main: '#81d4fa',
          },
        },
        
      })

    default:
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#ffee58',
            contrastText: '#000000',
          },
          secondary: {
            main: '#81d4fa',
          },
        },
        
      })
  }
}
export const winter = (type) => {
  switch (type) {
    case 'light':
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#7183bf',
            contrastText: '#000000',
            light: '#838ec5',
          },
          secondary: {
            main: '#1976d2',
          },
        },
        
      })

    case 'dark':
      return createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#7183bf',
            contrastText: '#000000',
            light: '#838ec5',
          },
          secondary: {
            main: '#1976d2',
          },
        },
        
      })
    default:
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#7183bf',
            contrastText: '#000000',
            light: '#838ec5',
          },
          secondary: {
            main: '#1976d2',
          },
        },
        
      })
  }
}
export const spring = (type) => {
  switch (type) {
    case 'light':
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#ff7043',
            contrastText: '#000000',
          },
          secondary: {
            main: '#bf360c',
          },
        },
        
      })

    case 'dark':
      return createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#ff7043',
            contrastText: '#000000',
          },
          secondary: {
            main: '#bf360c',
          },
        },
        
      })

    default:
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#ff7043',
            contrastText: '#000000',
          },
          secondary: {
            main: '#bf360c',
          },
        },
        
      })
  }
}
export const christmas = (type) => {
  switch (type) {
    case 'light':
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#2e7d32',
            contrastText: '#000000',
          },
          secondary: {
            main: '#e53935',
          },
        },
        
      })

    case 'dark':
      return createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#2e7d32',
            contrastText: '#000000',
          },
          secondary: {
            main: '#e53935',
          },
        },
        
      })

    default:
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#2e7d32',
            contrastText: '#000000',
          },
          secondary: {
            main: '#e53935',
          },
        },
        
      })
  }
}


export const test = (mode) => {

  const modeDark = () => mode ? 'dark' : 'dark'

  const primaryHAHA = () => mode ? '#ff8a65' : '#ff8a65'
  return createTheme({
    palette: {
      mode: modeDark(),
      primary: {
        main: primaryHAHA(),
        contrastText: '#000000',
      },
      secondary: {
        main: '#800000',
      },
    },
  })
}