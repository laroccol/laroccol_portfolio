import React from 'react'
import { Box, SlideFade, useDisclosure } from '@chakra-ui/react'
import { useInViewport } from 'react-in-viewport'

export default function ScrollTransition({
    delay,
    children,
    ...rest
}: {
    delay?: number
    children: any
    [x: string]: any
}) {
    const [transitionTime, setTransitionTime] = React.useState<number>(1)
    const [delayTime, setDelayTime] = React.useState<number>(delay || 0)
    const ref = React.useRef(null)
    const { enterCount } = useInViewport(
        ref,
        {},
        { disconnectOnLeave: false },
        {}
    )

    React.useEffect(() => {
        if (enterCount === 1) {
            setTimeout(() => {
                setTransitionTime(0.3)
                setDelayTime(0)
            }, 1500)
        }
    }, [enterCount])

    return (
        <Box
            transition={`opacity ${transitionTime}s, transform ${transitionTime}s, width 0.3s, height 0.3s`}
            transitionDelay={{ base: '0s', lg: `${delayTime}s` }}
            opacity={enterCount <= 0 ? 0 : 1}
            transform={enterCount <= 0 ? 'translateY(100px)' : 'none'}
            ref={ref}
            {...rest}
        >
            {children}
        </Box>
    )
}
