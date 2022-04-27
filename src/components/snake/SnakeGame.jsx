import React from 'react'
import axios from 'axios'
import './SnakeGame.css'
import {
    Table,
    TableCaption,
    TableContainer,
    Text,
    Tr,
    Th,
    Td,
    Thead,
    Box,
    Tbody,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    Input,
    AlertDialogFooter,
    Heading,
    Button,
    FormControl,
    Icon
} from '@chakra-ui/react'

import {
    CgArrowUpR,
    CgArrowLeftR,
    CgArrowDownR,
    CgArrowRightR
} from 'react-icons/cg'

class SnakeGame extends React.Component {
    constructor(props) {
        super(props)

        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.submitHighScore = this.submitHighScore.bind(this)

        this.state = {
            name: localStorage.getItem('name') || '',
            width: 0,
            height: 0,
            blockWidth: 0,
            blockHeight: 0,
            gameLoopTimeout: 50,
            timeoutId: 0,
            startSnakeSize: 0,
            snake: [],
            apple: {},
            direction: 'right',
            directionChanged: false,
            isGameOver: false,
            snakeColor: this.props.snakeColor || this.getRandomColor(),
            appleColor: this.props.appleColor || this.getRandomColor(),
            score: 0,
            highScore: Number(localStorage.getItem('snakeHighScore')) || 0,
            newHighScore: false,
            leaderboard: []
        }
    }

    componentDidMount() {
        this.initGame()
        this.updateLeaderboard()
        window.addEventListener('keydown', this.handleKeyDown)
        window.addEventListener('resize', this.initGame.bind(this))
        this.gameLoop()
    }

    updateLeaderboard() {
        axios.get('/api/getscores').then(({ data }) => {
            this.setState({ leaderboard: data.results })
        })
    }

    initGame() {
        // Game size initialization
        //let percentageWidth = this.props.percentageWidth || 40
        let height =
            document.getElementById('GameBoard').parentElement.parentElement
                .offsetHeight

        height -= height % 20
        if (height < 20) height = 20
        let width =
            document.getElementById('GameBoard').parentElement.parentElement
                .offsetWidth
        width -= width % (height / 20)
        let blockWidth = height / 20
        let blockHeight = height / 20

        // snake initialization
        let startSnakeSize = 6
        let snake = []
        let Xpos = width / 2
        let Ypos = blockHeight * 4
        let snakeHead = { Xpos: width / 2, Ypos: blockHeight * 4 }
        snake.push(snakeHead)
        for (let i = 1; i < startSnakeSize; i++) {
            Xpos -= blockWidth
            let snakePart = { Xpos: Xpos, Ypos: Ypos }
            snake.push(snakePart)
        }

        // apple position initialization
        let appleXpos = width - blockWidth * 6
        let appleYpos = blockHeight * 15

        this.setState({
            width,
            height,
            blockWidth,
            blockHeight,
            startSnakeSize,
            snake,
            apple: { Xpos: appleXpos, Ypos: appleYpos }
        })
    }

    gameLoop() {
        let timeoutId = setTimeout(() => {
            if (!this.state.isGameOver) {
                this.moveSnake()
                this.tryToEatSnake()
                this.tryToEatApple()
                this.setState({ directionChanged: false })
            }

            this.gameLoop()
        }, this.state.gameLoopTimeout)

        this.setState({ timeoutId })
    }

    componentWillUnmount() {
        clearTimeout(this.state.timeoutId)
        window.removeEventListener('keydown', this.handleKeyDown)
        window.removeEventListener('resize', this.initGame)
    }

    resetGame() {
        let width = this.state.width
        let blockWidth = this.state.blockWidth
        let blockHeight = this.state.blockHeight
        let apple = this.state.apple

        // snake reset
        let snake = []
        let Xpos = width / 2
        let Ypos = blockHeight * 4
        let snakeHead = { Xpos: width / 2, Ypos: blockHeight * 4 }
        snake.push(snakeHead)
        for (let i = 1; i < this.state.startSnakeSize; i++) {
            Xpos -= blockWidth
            let snakePart = { Xpos: Xpos, Ypos: Ypos }
            snake.push(snakePart)
        }

        // apple position reset
        apple.Xpos = width - blockWidth * 6
        apple.Ypos = blockHeight * 10

        this.setState({
            snake,
            apple,
            direction: 'right',
            directionChanged: false,
            isGameOver: false,
            gameLoopTimeout: 50,
            snakeColor: this.props.snakeColor || this.getRandomColor(),
            appleColor: this.props.appleColor || this.getRandomColor(),
            score: 0,
            newHighScore: false
        })
    }

    getRandomColor() {
        let hexa = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++)
            color += hexa[Math.floor(Math.random() * 16)]
        return color
    }

    moveSnake() {
        let snake = this.state.snake
        let previousPartX = this.state.snake[0].Xpos
        let previousPartY = this.state.snake[0].Ypos
        let tmpPartX = previousPartX
        let tmpPartY = previousPartY
        this.moveHead()
        for (let i = 1; i < snake.length; i++) {
            tmpPartX = snake[i].Xpos
            tmpPartY = snake[i].Ypos
            snake[i].Xpos = previousPartX
            snake[i].Ypos = previousPartY
            previousPartX = tmpPartX
            previousPartY = tmpPartY
        }
        this.setState({ snake })
    }

    tryToEatApple() {
        let snake = this.state.snake
        let apple = this.state.apple

        // if the snake's head is on an apple
        if (snake[0].Xpos === apple.Xpos && snake[0].Ypos === apple.Ypos) {
            let width = this.state.width
            let height = this.state.height
            let blockWidth = this.state.blockWidth
            let blockHeight = this.state.blockHeight
            let newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos }
            let highScore = this.state.highScore
            let newHighScore = this.state.newHighScore
            let gameLoopTimeout = this.state.gameLoopTimeout

            // increase snake size
            snake.push(newTail)

            // create another apple
            apple.Xpos =
                Math.floor(
                    Math.random() * ((width - blockWidth) / blockWidth + 1)
                ) * blockWidth
            apple.Ypos =
                Math.floor(
                    Math.random() * ((height - blockHeight) / blockHeight + 1)
                ) * blockHeight
            while (this.isAppleOnSnake(apple.Xpos, apple.Ypos)) {
                apple.Xpos =
                    Math.floor(
                        Math.random() * ((width - blockWidth) / blockWidth + 1)
                    ) * blockWidth
                apple.Ypos =
                    Math.floor(
                        Math.random() *
                            ((height - blockHeight) / blockHeight + 1)
                    ) * blockHeight
            }

            // decrease the game loop timeout
            if (gameLoopTimeout > 25) gameLoopTimeout -= 0.5

            this.setState({
                snake,
                apple,
                score: this.state.score + 1,
                highScore,
                newHighScore,
                gameLoopTimeout
            })
        }
    }

    tryToEatSnake() {
        let snake = this.state.snake

        for (let i = 1; i < snake.length; i++) {
            if (
                snake[0].Xpos === snake[i].Xpos &&
                snake[0].Ypos === snake[i].Ypos
            ) {
                if (this.state.score > this.state.highScore) {
                    this.setState({ isGameOver: true })
                } else {
                    this.resetGame()
                }
            }
        }
    }

    isAppleOnSnake(appleXpos, appleYpos) {
        let snake = this.state.snake
        for (let i = 0; i < snake.length; i++) {
            if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos)
                return true
        }
        return false
    }

    moveHead() {
        switch (this.state.direction) {
            case 'left':
                this.moveHeadLeft()
                break
            case 'up':
                this.moveHeadUp()
                break
            case 'right':
                this.moveHeadRight()
                break
            default:
                this.moveHeadDown()
        }
    }

    moveHeadLeft() {
        let width = this.state.width
        let blockWidth = this.state.blockWidth
        let snake = this.state.snake
        snake[0].Xpos =
            snake[0].Xpos <= 0 ? width - blockWidth : snake[0].Xpos - blockWidth
        this.setState({ snake })
    }

    moveHeadUp() {
        let height = this.state.height
        let blockHeight = this.state.blockHeight
        let snake = this.state.snake
        snake[0].Ypos =
            snake[0].Ypos <= 0
                ? height - blockHeight
                : snake[0].Ypos - blockHeight
        this.setState({ snake })
    }

    moveHeadRight() {
        let width = this.state.width
        let blockWidth = this.state.blockWidth
        let snake = this.state.snake
        snake[0].Xpos =
            snake[0].Xpos > width - blockWidth ? 0 : snake[0].Xpos + blockWidth
        this.setState({ snake })
    }

    moveHeadDown() {
        let height = this.state.height
        let blockHeight = this.state.blockHeight
        let snake = this.state.snake
        snake[0].Ypos =
            snake[0].Ypos >= height - blockHeight
                ? 0
                : snake[0].Ypos + blockHeight
        this.setState({ snake })
    }

    handleKeyDown(event) {
        console.log(event.keyCode)
        if (this.state.isGameOver && event.keyCode === 27) {
            event.preventDefault()
            this.resetGame()
            return
        }

        if (
            this.state.isGameOver &&
            this.state.score > this.state.highScore &&
            event.keyCode === 13
        ) {
            event.preventDefault()
            this.submitHighScore()
        }

        if (this.state.directionChanged) return

        switch (event.keyCode) {
            case 37:
                event.preventDefault()
                this.goLeft()
                break
            case 38:
                event.preventDefault()
                this.goUp()
                break
            case 39:
                event.preventDefault()
                this.goRight()
                break
            case 40:
                event.preventDefault()
                this.goDown()
                break
            default:
        }
        this.setState({ directionChanged: true })
    }

    goLeft() {
        let newDirection = this.state.direction === 'right' ? 'right' : 'left'
        this.setState({ direction: newDirection })
    }

    goUp() {
        let newDirection = this.state.direction === 'down' ? 'down' : 'up'
        this.setState({ direction: newDirection })
    }

    goRight() {
        let newDirection = this.state.direction === 'left' ? 'left' : 'right'
        this.setState({ direction: newDirection })
    }

    goDown() {
        let newDirection = this.state.direction === 'up' ? 'up' : 'down'
        this.setState({ direction: newDirection })
    }

    submitHighScore() {
        if (this.state.name) {
            localStorage.setItem('name', this.state.name)

            localStorage.setItem('snakeHighScore', this.state.score)

            axios
                .post('/api/submitscore', {
                    name: 'sloth',
                    score: 5
                })
                .catch((err) => console.error(err))

            this.setState({
                isGameOver: false,
                highScore: this.state.score
            })

            this.resetGame()
        }
    }

    render() {
        return (
            <div
                id="GameBoard"
                style={{
                    width: '100%',
                    height: this.state.height
                }}
            >
                <Box
                    width="100%"
                    textAlign="center"
                    zIndex={9}
                    position="absolute"
                >
                    <Text color="gray.600" fontSize={16} mt={5}>
                        HIGHSCORE: {this.state.highScore}
                    </Text>
                    <Text color="gray.600" fontSize={16} mb={5}>
                        SCORE: {this.state.score}
                    </Text>
                    <Box>
                        <Icon as={CgArrowUpR} opacity={0.6} />
                    </Box>
                    <Icon as={CgArrowLeftR} m={1} opacity={0.6} />
                    <Icon as={CgArrowDownR} m={1} opacity={0.6} />
                    <Icon as={CgArrowRightR} m={1} opacity={0.6} />
                </Box>
                <TableContainer
                    position="absolute"
                    top={20}
                    right={200}
                    zIndex={9}
                    opacity={0.5}
                >
                    <Table variant="simple" colorScheme="blue">
                        <TableCaption placement="top">LEADERBOARD</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Place</Th>
                                <Th>Name</Th>
                                <Th>Score</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {this.state.leaderboard.map(
                                ({ name, score }, index) => (
                                    <Tr key={`${name}_${score}_${index}`}>
                                        <Td>{index + 1}</Td>
                                        <Td>{name}</Td>
                                        <Td isNumeric>{score}</Td>
                                    </Tr>
                                )
                            )}
                            {/* <Tr>
                                <Td>1</Td>
                                <Td>Facebook</Td>
                                <Td isNumeric>35</Td>
                            </Tr>
                            <Tr>
                                <Td>2</Td>
                                <Td>Amazon</Td>
                                <Td isNumeric>33</Td>
                            </Tr>
                            <Tr>
                                <Td>3</Td>
                                <Td>Apple</Td>
                                <Td isNumeric>30</Td>
                            </Tr>
                            <Tr>
                                <Td>4</Td>
                                <Td>Netflix</Td>
                                <Td isNumeric>29</Td>
                            </Tr>
                            <Tr>
                                <Td>5</Td>
                                <Td>Google</Td>
                                <Td isNumeric>28</Td>
                            </Tr> */}
                        </Tbody>
                    </Table>
                </TableContainer>
                <AlertDialog
                    isOpen={
                        this.state.isGameOver &&
                        this.state.score > this.state.highScore
                    }
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader textAlign="center">
                                <Heading pb={3}>NEW HIGHSCORE!</Heading>
                                <Heading color="highlight.300">
                                    {this.state.score}
                                </Heading>
                            </AlertDialogHeader>
                            <AlertDialogBody textAlign="center">
                                <FormControl>
                                    <Input
                                        type="text"
                                        variant="flushed"
                                        placeholder="Name"
                                        value={this.state.name}
                                        focusBorderColor="highlight.200"
                                        onChange={(e) =>
                                            this.setState({
                                                name: e.target.value
                                            })
                                        }
                                    ></Input>
                                </FormControl>

                                <FormControl>
                                    <Button
                                        variant="outline"
                                        type="submit"
                                        my={8}
                                        onClick={this.submitHighScore}
                                    >
                                        Submit
                                    </Button>
                                </FormControl>

                                <Text fontSize={12}>Press Esc to Skip</Text>
                            </AlertDialogBody>
                            <AlertDialogFooter></AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
                {this.state.snake.map((snakePart, index) => {
                    return (
                        <div
                            key={index}
                            className="Block"
                            style={{
                                width: this.state.blockWidth,
                                height: this.state.blockHeight,
                                left: snakePart.Xpos,
                                top: snakePart.Ypos,
                                background: this.state.snakeColor
                            }}
                        />
                    )
                })}
                <div
                    className="Block"
                    style={{
                        width: this.state.blockWidth,
                        height: this.state.blockHeight,
                        left: this.state.apple.Xpos,
                        top: this.state.apple.Ypos,
                        background: this.state.appleColor
                    }}
                />
            </div>
        )
    }
}

export default SnakeGame
