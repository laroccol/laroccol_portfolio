import React from 'react'
import { Box, Image, SlideFade, useDisclosure } from '@chakra-ui/react'
import { useInViewport } from 'react-in-viewport'

export default function ScrollImage({ ...rest }: { [x: string]: any }) {
    const ref = React.useRef(null)
    const { enterCount } = useInViewport(
        ref,
        {},
        { disconnectOnLeave: false },
        {}
    )

    return (
        <Box
            ref={ref}
            position="relative"
            width={270}
            height={320}
            shadow="2xl"
            background="highlight.300"
            borderRadius={8}
            transform="translateX(-20%)"
        >
            <Image
                src="portrait.PNG"
                shadow="dark-lg"
                width={270}
                height={320}
                ml={enterCount > 0 ? -5 : 0}
                mt={enterCount > 0 ? 5 : 0}
                border={enterCount > 0 ? 'none' : '1px solid'}
                borderRadius={8}
                position="absolute"
                transition="margin-top 0.5s, margin-left 0.5s, border 0.5s"
                _hover={{
                    ml: 0,
                    mt: 0,
                    border: '1px solid',
                    borderColor: 'highlight.300'
                }}
            />
        </Box>
    )
}
