import React from 'react'

import {
    ChakraProvider,
    Box,
    Text,
    Link,
    Grid,
    extendTheme,
    type ThemeConfig,
    Flex,
    Icon,
    Button,
    GridItem,
    Center,
    Divider,
    Heading,
    useColorMode,
    useColorModeValue,
    color
} from '@chakra-ui/react'
import Header from './components/nav/header'
import Main from './components/sections/main'
import SnakeGame from './components/snake/SnakeGame'
import Socials from './components/nav/socials'
import About from './components/sections/about'
import Projects from './components/sections/projects'
import Contact from './components/sections/contact'
import { mode } from '@chakra-ui/theme-tools'

export default function Page() {
    return (
        <>
            <Header />
            <Grid
                templateColumns="repeat(8, 1fr)"
                borderBottom="1px solid gray"
                shadow="2xl"
                backgroundColor={useColorModeValue(
                    'backgroundLight.800',
                    'backgroundDark.900'
                )}
                id="main_section"
            >
                <Box
                    display={{ base: 'none', md: 'block' }}
                    position={'absolute'}
                    left={0}
                    width="100%"
                >
                    <SnakeGame
                        snakeColor={'#ECC94B'}
                        appleColor={'red'}
                        percentageWidth={100}
                    />
                </Box>
                <GridItem colSpan={{ base: 1, md: 2 }} textAlign="center">
                    <Socials />
                </GridItem>
                <GridItem colSpan={{ base: 6, md: 4 }} zIndex={9}>
                    <Main />
                </GridItem>
            </Grid>
            <Grid
                templateColumns="repeat(8, 1fr)"
                borderBottom="1px solid gray"
                shadow="2xl"
                backgroundColor={useColorModeValue(
                    'backgroundLight.700',
                    'backgroundDark.800'
                )}
                id="about_section"
            >
                <GridItem
                    colSpan={{ base: 1, md: 2 }}
                    textAlign="center"
                ></GridItem>
                <GridItem colSpan={{ base: 6, md: 4 }} textAlign="center">
                    <About />
                </GridItem>
            </Grid>
            <Grid
                templateColumns="repeat(8, 1fr)"
                borderBottom="1px solid gray"
                shadow="2xl"
                backgroundColor={useColorModeValue(
                    'backgroundLight.800',
                    'backgroundDark.900'
                )}
                id="projects_section"
            >
                <GridItem colSpan={1} pt={150}>
                    <Heading
                        p={5}
                        borderLeft={{ base: 'none', md: '1px solid' }}
                        borderColor={{
                            base: 'highlight.300',
                            md: 'highlight.300'
                        }}
                        display={{ base: 'none', md: 'block' }}
                        sx={{
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            float: 'right'
                        }}
                    >
                        PROJECTS
                    </Heading>
                </GridItem>
                <GridItem colSpan={6}>
                    <Projects />
                </GridItem>
            </Grid>
            <Grid
                templateColumns="repeat(12, 1fr)"
                borderBottom="1px solid gray"
                shadow="2xl"
                backgroundColor={useColorModeValue(
                    'backgroundLight.700',
                    'backgroundDark.800'
                )}
                id="contact_section"
            >
                <GridItem
                    colSpan={{ base: 1, lg: 2, xl: 3, '2xl': 4 }}
                    textAlign="center"
                ></GridItem>
                <GridItem
                    colSpan={{ base: 10, lg: 8, xl: 6, '2xl': 4 }}
                    textAlign="center"
                >
                    <Contact />
                </GridItem>
            </Grid>

            <Socials />
            {/* <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(8, 1fr)">
            <GridItem rowSpan={3} colSpan={2} textAlign="center">
                <Socials />
            </GridItem>
            <GridItem colSpan={4}>
                <Main />
            </GridItem>
            <GridItem rowSpan={3} colSpan={2}></GridItem>
            <GridItem colSpan={4}>
                <About />
            </GridItem>
        </Grid> */}
        </>
    )
}
