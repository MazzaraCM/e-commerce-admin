import { createTheme } from '@mui/material/styles'

export const colorPaletteLight = [
  {
    palette: {
      theme: 0,
      mode: 'light',
      primary: {
        main: '#FF0266'
      },
      secondary: {
        main: '#FF0266'
      },
      error: {
        main: '#B00020'
      },
      text: {
        main: 'rgb(55, 53, 47)',
        static: '#000',
        opacity: 'rgba(25, 23, 17, 0.6)'
      },
      background: {
        main: '#fff',
        opacity: '#f7f8fa'
      },
      disabled: {
        text: 'rgba(000, 000, 000, 0.5)',
        background: 'rgba(000, 000, 000, 0.1)'
      }
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
      }
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#FFF',
            backgroundImage: 'none'
          }
        }
      },
      SwitchBase: {
        styleOverrides: {
          checked: {
            color: 'rgba(25, 23, 17, 0.6)'
          }
        }
      },
      MuiDataGrid: {
        styleOverrides: {
          columnsPanel: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            justifyItems: 'center'
          }
        }
      }
    },
    borders: {
      main: '1px solid rgba(0, 0, 0, 0.11)',
      thin: 'thin'
    },
    mixins: {
      toolbar: {
        minHeight: 65
      }
    }
    // shadows: {
    //   main: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
    // }
  }
]

export const colorPaletteDark = [
  {
    palette: {
      theme: 0,
      mode: 'dark',
      primary: {
        main: '#FF7597'
      },
      secondary: {
        main: '#FF0266'
      },
      error: {
        main: '#CF6679'
      },
      text: {
        main: 'rgba(255, 255, 255, 0.81)',
        static: '#FFF',
        opacity: 'rgb(155, 155, 155)'
      },
      background: {
        main: '#282828',
        opacity: '#1f1f1f'
      },
      disabled: {
        text: 'rgba(255, 255, 255, 0.5)',
        background: 'rgba(255, 255, 255, 0.1)'
      }
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
      }
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: '#000',
            backgroundImage: 'none'
          }
        }
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: '#fff'
          }
        }
      },
      MuiDataGrid: {
        styleOverrides: {
          columnsPanel: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            justifyItems: 'center'
          }
        }
      }
    },
    borders: {
      main: '1px solid rgba(255, 255, 255, 0.11)',
      thin: 'thin'
    },
    mixins: {
      toolbar: {
        minHeight: 65
      }
    }
    // shadows: {
    //   main: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
    // }
  }
]

export const appThemeLight = createTheme(colorPaletteLight[0])
export const appThemeDark = createTheme(colorPaletteDark[0])
export const themes = {
  colorPaletteLight, colorPaletteDark
}
