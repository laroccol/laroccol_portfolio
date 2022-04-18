import {
    Flex,
    Heading,
    Center,
    Container,
    Image,
    Box,
    Stack,
    Text,
    Link,
    Icon
} from '@chakra-ui/react'
import React from 'react'
import ScrollTransition from '../common/scrollTransition'
import Header from '../nav/header'
import { AiFillGithub } from 'react-icons/ai'

interface ProjectCardProps {
    image: string
    heading: string
    description: string
    technologies: string
    github: string
}

const ProjectCard = ({
    image,
    heading,
    description,
    technologies,
    github
}: ProjectCardProps) => {
    return (
        <>
            <ScrollTransition
                position="relative"
                borderRadius={20}
                height={250}
                width={250}
                shadow="2xl"
                _before={{
                    content: "''",
                    borderRadius: 20,
                    backgroundImage: image,
                    backgroundSize: 'cover',
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                    transition: 'opacity 0.5s',
                    opacity: 0.75
                }}
                _hover={{
                    height: 400,
                    border: '2px solid',
                    borderColor: 'highlight.300',
                    transition: 'height 0.5s, width 0.5s',
                    _before: {
                        content: "''",
                        backgroundImage: image,
                        backgroundSize: 'cover',
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                        opacity: 0.1
                    }
                }}
            >
                <Stack
                    position="relative"
                    width="100%"
                    height="100%"
                    opacity={0}
                    transition="opacity 0.2s"
                    textAlign="center"
                    alignItems="center"
                    _hover={{ transition: 'opacity 0.5s', opacity: 1 }}
                    p={5}
                >
                    <Heading pb={2}>{heading}</Heading>
                    <Text>{description}</Text>
                    <Heading size="md" color="highlight.300">
                        Technologies
                    </Heading>
                    <Text fontSize="16">{technologies}</Text>
                    <Stack position="absolute" bottom={10} alignItems="center">
                        <Icon as={AiFillGithub} boxSize={7} />
                        <Link href="#">{github}</Link>
                    </Stack>
                </Stack>
            </ScrollTransition>
        </>
    )
}

export default function Projects() {
    return (
        <>
            <Flex
                pt={150}
                pb={150}
                gap={10}
                px={10}
                flexWrap="wrap"
                justifyContent={'space-around'}
            >
                <Container
                    display={{ base: 'block', md: 'none' }}
                    textAlign="center"
                    borderBottom={{ base: '1px solid', md: 'none' }}
                    borderColor="highlight.300"
                    p={3}
                >
                    <Heading>PROJECTS</Heading>
                </Container>
                <ProjectCard
                    image="typeo.PNG"
                    heading="TYPEO"
                    description="Competitive Online Typing Website"
                    technologies="React, Node.js, Typescript, Firebase, PostgreSQL"
                    github="github.com"
                ></ProjectCard>
                <ProjectCard
                    image="projectManager.jpg"
                    heading="Task Manager"
                    description="Project Management and Workflow tool"
                    technologies="Next.js, Node.js"
                    github="github.com"
                ></ProjectCard>
                <ProjectCard
                    image="droneRace.jpg"
                    heading="DRONE LINK"
                    description="All-In-One Drone Race Manager and Tracker"
                    technologies="React, Node.js, RethinkDB, MQTT"
                    github="github.com"
                ></ProjectCard>
                <ProjectCard
                    image="msoeEsports.jpg"
                    heading="ESPORTS BOT"
                    description="Esports Challenge and Progression Tracking System"
                    technologies="Discord.js, MongoDB"
                    github="github.com"
                ></ProjectCard>
                <ProjectCard
                    image="nn.jpg"
                    heading="NBA Predictor"
                    description="Machine Learning Neural Network That Predicts The Outcome of NBA Games"
                    technologies="Matlab"
                    github="github.com"
                ></ProjectCard>
                <ProjectCard
                    image="ue4.jpg"
                    heading="FPS Game"
                    description="Multiplayer First Person Shooter Video Game"
                    technologies="Unreal Engine 4"
                    github="github.com"
                ></ProjectCard>
                <ScrollTransition>
                    <Center
                        height={250}
                        width={250}
                        background="blackAlpha.400"
                        borderRadius={20}
                        textAlign="center"
                        p={3}
                    >
                        <Heading size="lg">COMING SOON</Heading>
                    </Center>
                </ScrollTransition>
                <ScrollTransition>
                    <Center
                        height={250}
                        width={250}
                        background="blackAlpha.400"
                        borderRadius={20}
                        textAlign="center"
                        p={3}
                    >
                        <Heading size="lg">COMING SOON</Heading>
                    </Center>
                </ScrollTransition>
            </Flex>
        </>
    )
}
