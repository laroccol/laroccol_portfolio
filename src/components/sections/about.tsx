import React from 'react'
import {
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    UnorderedList,
    ListItem,
    Box,
    Container,
    Icon,
    Progress,
    useColorModeValue
} from '@chakra-ui/react'
import ScrollTransition from '../common/scrollTransition'
import ScrollImage from '../common/scrollImage'
import { AiFillHome } from 'react-icons/ai'
import { IoIosSchool, IoMdBriefcase } from 'react-icons/io'
import { SiJavascript } from 'react-icons/si'
import { GiGolfFlag } from 'react-icons/gi'

const AboutCard = ({
    color,
    delay,
    children,
    ...rest
}: {
    color: string
    delay?: number
    children: any
    [x: string]: any
}) => {
    return (
        <>
            <ScrollTransition
                delay={delay}
                height={500}
                width={{ base: '100%', xl: '45%', '2xl': '33%' }}
                maxWidth="9999px"
                background={color}
                shadow="dark-lg"
                borderRadius={10}
                _hover={{ transform: 'scale(1.04)' }}
            >
                <Stack
                    textAlign="center"
                    alignItems="center"
                    gap={5}
                    p={5}
                    pt={10}
                    {...rest}
                >
                    {children}
                </Stack>
            </ScrollTransition>
        </>
    )
}

const Skill = ({
    name,
    value,
    icon
}: {
    name: string
    value: number
    icon: any
}) => {
    return (
        <>
            <Box>
                <Text fontSize={12} pb={1}>
                    {name}
                </Text>
                <Flex gap={2}>
                    <Icon as={icon} boxSize={5} display="inline-block" />
                    <Progress
                        colorScheme="yellow"
                        hasStripe
                        value={value}
                        flexGrow={1}
                    />
                </Flex>
            </Box>
        </>
    )
}

export default function About() {
    return (
        <>
            <Flex mt={150} pb={150}>
                <Stack gap={2} width="100%">
                    <ScrollTransition>
                        <Heading
                            as="h1"
                            size="2xl"
                            p={3}
                            mb={5}
                            borderBottom="1px solid"
                            borderColor="highlight.400"
                        >
                            About Me
                        </Heading>
                    </ScrollTransition>
                    <ScrollTransition delay={0.25}>
                        <Flex
                            p={4}
                            background={useColorModeValue(
                                'backgroundLight.200',
                                'backgroundDark.200'
                            )}
                            shadow="2xl"
                            gap={5}
                            borderRadius={20}
                            flexWrap={{ base: 'wrap', '2xl': 'nowrap' }}
                            justifyContent="space-around"
                        >
                            <AboutCard
                                color={useColorModeValue(
                                    'backgroundLight.900',
                                    'backgroundDark.900'
                                )}
                                delay={0.25}
                            >
                                <Heading size="lg" color="highlight.400">
                                    INFO
                                </Heading>
                                <Icon as={AiFillHome} boxSize={5} />
                                <Text fontSize={16}>
                                    St Charles, Illinois, United States
                                </Text>
                                <Icon as={IoIosSchool} boxSize={5} />
                                <span>
                                    <Text fontSize={16}>
                                        B.S. Software Engineering
                                    </Text>
                                    <Text fontSize={12}>
                                        Milwaukee School of Engineering
                                    </Text>
                                </span>
                                <Icon as={IoMdBriefcase} boxSize={5} />
                                <Text fontSize={16}>
                                    Looking For First Web Development Job
                                </Text>
                            </AboutCard>
                            <AboutCard
                                delay={0.4}
                                color={useColorModeValue(
                                    'backgroundLight.700',
                                    'backgroundDark.700'
                                )}
                                textAlign="left"
                                alignItems="left"
                                gap={0.5}
                            >
                                <Heading size="lg" textAlign="center" pb={5}>
                                    SKILLS
                                </Heading>
                                <Skill
                                    name="Javascript, Typescript"
                                    value={90}
                                    icon={SiJavascript}
                                />
                                <Skill
                                    name="Node"
                                    value={85}
                                    icon={SiJavascript}
                                />
                                <Skill
                                    name="React"
                                    value={80}
                                    icon={SiJavascript}
                                />
                                <Skill
                                    name="Git"
                                    value={80}
                                    icon={SiJavascript}
                                />
                                <Skill
                                    name="HTML, CSS"
                                    value={70}
                                    icon={SiJavascript}
                                />
                                <Skill
                                    name="SQL"
                                    value={60}
                                    icon={SiJavascript}
                                />
                                <Skill
                                    name="NoSQL"
                                    value={60}
                                    icon={SiJavascript}
                                />
                            </AboutCard>
                            <AboutCard
                                color={useColorModeValue(
                                    'backgroundLight.600',
                                    'backgroundDark.600'
                                )}
                                gap={2}
                                delay={0.65}
                            >
                                <span>
                                    <Heading size="lg" color="highlight.400">
                                        INTERESTS
                                    </Heading>
                                    <Text fontSize={10}>
                                        (Other Than Programming)
                                    </Text>
                                </span>

                                <Icon as={GiGolfFlag} boxSize={6} />
                                <span>
                                    <Text fontSize={16}>Golf</Text>
                                    <Text fontSize={12}>6 Handicap</Text>
                                </span>
                                <Icon as={IoIosSchool} boxSize={5} />
                                <span>
                                    <Text fontSize={16}>
                                        Competitive Esports
                                    </Text>
                                    <Text fontSize={12}>Top 1%</Text>
                                </span>
                                <Icon as={IoMdBriefcase} boxSize={5} />
                                <span>
                                    <Text fontSize={16}>Running</Text>
                                    <Text fontSize={12}>Half Marathon</Text>
                                </span>
                                <Icon as={IoMdBriefcase} boxSize={5} />
                                <span>
                                    <Text fontSize={16}>Piano</Text>
                                    <Text fontSize={12}>
                                        Moonlight Sonata (3rd Movement)
                                    </Text>
                                </span>
                            </AboutCard>
                        </Flex>
                    </ScrollTransition>
                </Stack>
            </Flex>
        </>
    )
}
