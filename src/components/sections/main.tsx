import React from 'react'
import {
    Heading,
    Box,
    SlideFade,
    Stack,
    Text,
    Flex,
    Button,
    Link
} from '@chakra-ui/react'
import ScrollTransition from '../common/scrollTransition'
import SnakeGame from '../snake/SnakeGame'

const Main: React.FC = () => {
    return (
        <>
            <Box
                mt={{ base: 150, md: 250 }}
                pb={150}
                justifyContent="space-between"
            >
                <ScrollTransition>
                    <Heading as="h6" size={'md'}>
                        Hi, I'm
                    </Heading>
                </ScrollTransition>
                <ScrollTransition delay={0.1}>
                    <Heading
                        as="h1"
                        size="4xl"
                        py={5}
                        transition="color 0.5s, font-size 0.5s"
                        cursor="pointer"
                        width="fit-content"
                        _hover={{
                            color: 'highlight.200',
                            fontSize: 90
                        }}
                    >
                        LUCAS LAROCCO
                    </Heading>
                </ScrollTransition>
                <ScrollTransition delay={0.25}>
                    <Heading color="highlight.300">
                        Full-Stack Web Developer
                    </Heading>
                </ScrollTransition>
                <ScrollTransition delay={0.4}>
                    <Text width="70%" py={5}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </Text>
                    <Link
                        href="#projects_section"
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Button variant={'outline'}>See Projects</Button>
                    </Link>
                </ScrollTransition>
            </Box>
        </>
    )
}

export default Main
