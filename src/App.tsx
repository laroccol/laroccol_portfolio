import * as React from 'react'
import '@fontsource/nunito/400.css'
import '@fontsource/roboto/400.css'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import Page from './page'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const styles = {
    global: (props: any) => ({
        body: {
            letterSpacing: 2
        },
        button: {
            letterSpacing: 2
        },
        '::-moz-selection': {
            /* Code for Firefox */ color: 'red',
            background: 'yellow'
        },
        '::selection': {
            background: 'rgba(143, 168, 50, 0.1)'
        },
        'body::-webkit-scrollbar': {
            width: 1.5,
            height: 1.5
        },
        'body::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '5px'
        },
        'body::-webkit-scrollbar-thumb': {
            backgroundColor: '#dfdfdf',
            borderRadius: '5px'
        },
        p: {
            fontSize: '18px'
        },
        'input:focus': {
            borderColor: 'red'
        }
    })
}

const components = {
    Button: {
        defaultProps: {
            colorScheme: 'highlight'
        }
    },
    Link: {
        variants: {
            highlight: ({ colorMode }: { colorMode: string }) => ({
                position: 'relative',
                fontWeight: 'bold',
                textDecoration: 'none',
                transition: 'font-size 0.3s',
                _before: {
                    content: '""',
                    position: 'absolute',
                    display: 'block',
                    width: '100%',
                    height: '2px',
                    bottom: 0,
                    left: 0,
                    backgroundColor:
                        colorMode === 'dark'
                            ? 'highlight.200'
                            : 'highlight.500',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.3s ease'
                },
                _hover: {
                    textDecoration: 'none',
                    fontSize: '125%',
                    color:
                        colorMode === 'dark'
                            ? 'highlight.200'
                            : 'highlight.500',
                    _before: {
                        transform: 'scaleX(1)'
                    }
                }
            }),
            icon_highlight: {
                transition: 'color 0.5s, transform 0.5s',
                _hover: {
                    color: 'highlight.300',
                    transform: 'scale(1.2)'
                }
            },
            icon_highlight_dark: {
                p: 2,
                borderRadius: '50%',
                display: 'flex',
                background: 'transparent',
                transition: 'background 0.5s, transform 0.5s',
                color: 'gray.800',
                _hover: {
                    background: 'highlight.300',
                    transform: 'scale(1.3)'
                }
            }
        }
    }
}

const fonts = {
    body: 'Roboto, sans-serif'
}

const colors = {
    backgroundLight: {
        50: '#171923',
        100: '#1A202C',
        200: '#2D3748',
        300: '#4A5568',
        400: '#718096',
        500: '#A0AEC0',
        600: '#CBD5E0',
        700: '#E2E8F0',
        800: '#EDF2F7',
        900: '#F7FAFC'
    },
    backgroundDark: {
        50: '#F7FAFC',
        100: '#EDF2F7',
        200: '#E2E8F0',
        300: '#CBD5E0',
        400: '#A0AEC0',
        500: '#718096',
        600: '#4A5568',
        700: '#2D3748',
        800: '#1A202C',
        900: '#171923'
    },
    highlight: {
        50: '#FFFFF0',
        100: '#FEFCBF',
        200: '#FAF089',
        300: '#F6E05E',
        400: '#ECC94B',
        500: '#000',
        600: '#000',
        700: '#000',
        800: '#000',
        900: '#000'
    }
}

const theme = extendTheme({ config, styles, components, fonts, colors })

export const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Page />
        </ChakraProvider>
    )
}
