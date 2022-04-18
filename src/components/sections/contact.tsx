import {
    Heading,
    Input,
    Stack,
    Textarea,
    Text,
    FormControl,
    Button,
    useColorModeValue,
    FormErrorMessage,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'

export default function Contact() {
    const [name, setName] = React.useState<string>()
    const [email, setEmail] = React.useState<string>()
    const [message, setMessage] = React.useState<string>()

    const [nameError, setNameError] = React.useState<boolean>(false)
    const [emailError, setEmailError] = React.useState<boolean>(false)
    const [messageError, setMessageError] = React.useState<boolean>(false)
    const [sendError, setSendError] = React.useState<boolean>(false)
    const [sendSuccess, setSendSuccess] = React.useState<boolean>(false)

    const [buttonText, setButtonText] = React.useState<string>('Send')

    // const resetForm = () => {
    //     setName('')
    //     setEmail('')
    //     setMessage('')

    //     setNameError(false)
    //     setEmailError(false)
    //     setMessageError(false)
    //     setSendError(false)

    //     setButtonText('Send')
    // }

    const HandleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'message':
                setMessage(value)
                break
        }
    }

    const HandleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const emailRegex =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

        setNameError(!name)
        setEmailError(!email?.match(emailRegex))
        setMessageError(!message)

        if (!name || !email?.match(emailRegex) || !message) {
            return
        }

        setButtonText('Sending...')

        axios
            .post('http://localhost:57713/.netlify/functions/sendmail', {
                name: name,
                email: email,
                message: message
            })
            .then((res) => {
                if (res.data.result !== 'success') {
                    setSendError(true)
                    setSendSuccess(false)
                } else {
                    setSendError(false)
                    setSendSuccess(true)
                }
            })
            .catch((err) => {
                setSendError(true)
                setSendSuccess(false)
            })
            .finally(() => {
                setButtonText('Send')
            })
    }

    return (
        <>
            <Stack
                pt={150}
                pb={150}
                gap={5}
                id="contact_section"
                alignItems="center"
            >
                <Stack
                    p={3}
                    mb={sendError ? 0 : 10}
                    gap={5}
                    borderBottom="1px solid"
                    borderColor="highlight.300"
                >
                    <Heading as="h1" size="2xl">
                        CONTACT
                    </Heading>
                    <Text>
                        Currently Looking for Opportunities, and People to Work
                        With
                    </Text>
                </Stack>
                <Alert status="error" display={sendError ? 'inherit' : 'none'}>
                    <AlertIcon />
                    Error Sending Email, Please Contact lucas.larocco@gmail.com
                    for further assistance
                </Alert>
                <Alert
                    status="error"
                    display={sendSuccess ? 'inherit' : 'none'}
                >
                    <AlertIcon />
                    Email Successfully Sent
                </Alert>
                <FormControl isRequired isInvalid={nameError}>
                    <Input
                        variant="flushed"
                        type="text"
                        placeholder="Name"
                        name="name"
                        borderColor={useColorModeValue('gray.400', 'gray.600')}
                        focusBorderColor={useColorModeValue(
                            'highlight.500',
                            'highlight.200'
                        )}
                        onChange={HandleChange}
                    />
                    <FormErrorMessage>Name Must Be Provided</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={emailError}>
                    <Input
                        variant="flushed"
                        placeholder="Email"
                        name="email"
                        borderColor={useColorModeValue('gray.400', 'gray.600')}
                        focusBorderColor={useColorModeValue(
                            'highlight.500',
                            'highlight.200'
                        )}
                        onChange={HandleChange}
                    />
                    <FormErrorMessage>Incorrect Email Format</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={messageError}>
                    <Textarea
                        placeholder="Message"
                        name="message"
                        borderColor={useColorModeValue('gray.400', 'gray.600')}
                        focusBorderColor={useColorModeValue(
                            'highlight.500',
                            'highlight.200'
                        )}
                        minHeight={200}
                        onChange={HandleChange}
                    />
                    <FormErrorMessage>
                        Message Must Be Provided
                    </FormErrorMessage>
                </FormControl>
                <Button
                    variant="outline"
                    width="fit-content"
                    onClick={HandleSubmit}
                >
                    {buttonText}
                </Button>
            </Stack>
        </>
    )
}
