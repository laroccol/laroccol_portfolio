import React from 'react'
import {
    Flex,
    Box,
    Icon,
    Link,
    Center,
    Button,
    Stack,
    Heading,
    Drawer,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    useColorModeValue
} from '@chakra-ui/react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import { AiOutlineCoffee } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiDocumentDownload } from 'react-icons/hi'
import FloatingNav from './floatingNav'

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const ref = React.useRef(null)

    return (
        <>
            <Flex
                position={{ base: 'fixed', md: 'inherit' }}
                justifyContent={'space-between'}
                px={10}
                py={4}
                shadow={'xl'}
                ref={ref}
                width="100%"
                background={useColorModeValue(
                    'highlight.300',
                    'backgroundDark.800'
                )}
                zIndex={999}
            >
                <Box width={100}>
                    <Link href="#main_section">
                        <Icon
                            as={AiOutlineCoffee}
                            boxSize={10}
                            transition="color 0.5s, transform 0.5s"
                            _hover={{
                                color: useColorModeValue(
                                    'highlight.500',
                                    'highlight.300'
                                ),
                                transform: 'scale(1.5)'
                            }}
                        />
                    </Link>
                </Box>
                <Center display={{ base: 'none', md: 'flex' }} gap={10}>
                    <Link href="#about_section" variant="highlight">
                        About
                    </Link>
                    <Link href="#projects_section" variant="highlight">
                        Projects
                    </Link>
                    <Link href="#contact_section" variant="highlight">
                        Contact
                    </Link>
                </Center>
                <Link
                    display={{ base: 'none', md: 'block' }}
                    href="lucasLaRoccoResume.pdf"
                    variant="highlight"
                    target="_blank"
                >
                    <Button
                        leftIcon={<HiDocumentDownload color="highlight.300" />}
                        variant="outline"
                    >
                        Resume
                    </Button>
                </Link>
                <Icon
                    as={GiHamburgerMenu}
                    boxSize={10}
                    display={{ base: 'block', md: 'none' }}
                    cursor="pointer"
                    onClick={onOpen}
                />
                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                    <DrawerOverlay display={{ base: 'inherit', md: 'none' }} />
                    <DrawerContent display={{ base: 'inherit', md: 'none' }}>
                        <DrawerHeader
                            onClick={onClose}
                            cursor="pointer"
                            fontSize={32}
                            borderBottom="1px solid gray"
                        >
                            {'>'}
                        </DrawerHeader>

                        <DrawerBody>
                            <Stack onClick={onClose} gap={3} pt={3}>
                                <Link href="#main_section" variant="highlight">
                                    HOME
                                </Link>
                                <Link href="#about_section" variant="highlight">
                                    ABOUT
                                </Link>
                                <Link
                                    href="#projects_section"
                                    variant="highlight"
                                >
                                    PROJECTS
                                </Link>
                                <Link
                                    href="#contact_section"
                                    variant="highlight"
                                >
                                    CONTACT
                                </Link>
                            </Stack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
            <FloatingNav reference={ref} />
        </>
    )
}
