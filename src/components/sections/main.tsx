import React from 'react'
import axios from 'axios'
import { Heading, Box, Text, Button, Link } from '@chakra-ui/react'
import ScrollTransition from '../common/scrollTransition'

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
                        Full-Stack Developer
                    </Heading>
                </ScrollTransition>
                <ScrollTransition delay={0.4}>
                    <Text width="70%" py={5}>
                        I am a full-time developer specializing in typescript
                        and react. I enjoy creating experiences that impress
                        people and make their life better. Right now, I am
                        looking for a full time position.
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
