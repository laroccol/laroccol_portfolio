import React from 'react'
import { Flex, Link, Icon } from '@chakra-ui/react'
import { AiFillGithub, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'
import { DiStackoverflow } from 'react-icons/di'

export default function Socials() {
    return (
        <Flex
            display={{ base: 'none', md: 'flex' }}
            flexDirection="column"
            mt={64}
            gap={6}
            p={3}
            w="fit-content"
            alignItems="center"
            borderY="1px solid"
            borderRight="1px solid"
            borderColor="highlight.300"
            borderRadius={3}
            position="fixed"
        >
            <Link
                href="https://github.com/laroccol"
                variant="icon_highlight"
                target="_blank"
            >
                <Icon as={AiFillGithub} boxSize={8} />
            </Link>
            <Link
                href="https://www.linkedin.com/in/lucas-larocco-5b347b182/"
                variant="icon_highlight"
                target="_blank"
            >
                <Icon as={AiFillLinkedin} boxSize={8} />
            </Link>
            <Link
                href="https://stackoverflow.com/users/17687015/lucas-larocco"
                variant="icon_highlight"
                target="_blank"
            >
                <Icon as={DiStackoverflow} boxSize={8} />
            </Link>
            <Link
                href="https://www.facebook.com/luke.larocco.3/"
                variant="icon_highlight"
                target="_blank"
            >
                <Icon as={AiFillFacebook} boxSize={8} />
            </Link>
        </Flex>
    )
}
