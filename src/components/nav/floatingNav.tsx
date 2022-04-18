import React from 'react'
import { Box, Icon, Link, Tooltip, useDisclosure } from '@chakra-ui/react'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { BiBook } from 'react-icons/bi'
import { RiServiceLine } from 'react-icons/ri'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { useInViewport } from 'react-in-viewport'

interface FloatingNavProps {
    reference: any
}

export default function FloatingNav({ reference }: FloatingNavProps) {
    const { inViewport, enterCount, leaveCount } = useInViewport(
        reference,
        {},
        { disconnectOnLeave: false },
        {}
    )

    return (
        <Box
            position="fixed"
            bottom={inViewport ? 0 : 10}
            left="50%"
            transform="translateX(-50%)"
            display={{ base: 'none', md: 'flex' }}
            background="highlight.400"
            py={4}
            px={6}
            borderRadius="full"
            zIndex={9}
            gap={8}
            shadow="2xl"
            opacity={inViewport ? 0 : 1}
            transition="opacity 0.5s, bottom 0.5s"
        >
            <Tooltip
                label="Home"
                placement="top"
                display={inViewport ? 'none' : 'inherit'}
            >
                <Link href="#main_section" variant="icon_highlight_dark">
                    <Icon as={AiOutlineHome} boxSize={5} />
                </Link>
            </Tooltip>
            <Tooltip
                label="About"
                placement="top"
                display={inViewport ? 'none' : 'inherit'}
            >
                <Link href="#about_section" variant="icon_highlight_dark">
                    <Icon as={AiOutlineUser} boxSize={5} />
                </Link>
            </Tooltip>
            <Tooltip
                label="Projects"
                placement="top"
                display={inViewport ? 'none' : 'inherit'}
            >
                <Link href="#projects_section" variant="icon_highlight_dark">
                    <Icon as={BiBook} boxSize={5} />
                </Link>
            </Tooltip>
            <Tooltip
                label="Contact"
                placement="top"
                display={inViewport ? 'none' : 'inherit'}
            >
                <Link href="#contact_section" variant="icon_highlight_dark">
                    <Icon as={RiServiceLine} boxSize={5} />
                </Link>
            </Tooltip>
        </Box>
    )
}
