import { NeuralNetwork } from './nn'

const data = [
    {
        data: [0, 1, 0, 1],
        target: [0],
    },
    {
        data: [1, 0, 1, 0],
        target: [0],
    },
    {
        data: [1, 1, 1, 1],
        target: [0],
    },
    {
        data: [0, 0, 0, 0],
        target: [0],
    },
    {
        data: [1, 1, 1, 0],
        target: [1],
    },
    {
        data: [0, 0, 0, 1],
        target: [1],
    },
    {
        data: [0, 0, 1, 1],
        target: [1],
    },
    {
        data: [1, 1, 0, 0],
        target: [1],
    },
    {
        data: [1, 1, 0, 1],
        target: [1],
    },
    {
        data: [1, 0, 1, 1],
        target: [1],
    },
    {
        data: [1, 0, 0, 1],
        target: [1],
    },
    {
        data: [0, 1, 1, 0],
        target: [1],
    },
]

export default class Test {
    nn: NeuralNetwork
    training: boolean = false

    constructor() {
        this.nn = new NeuralNetwork(2, [4], 1)
        window.onload = (e) => {
            const trainButton = document.getElementById('train-btn')
            trainButton.addEventListener('click', () => {
                this.train()
                this.training = true
            })
        }
    }

    train = () => {
        const iterations = 10000
        let percent = 0
        this.training = true

        for (let i = 0; i < iterations; i++) {
            if ((i / iterations) * 100 > percent + 1) {
                console.clear()
                console.log(`${(i / iterations) * 100}%`)
                percent = (i / iterations) * 100
            }

            let target = Math.random() > 0.5 ? 1 : 0
            let a = Math.floor(Math.random() * 10)
            let b = Math.floor(Math.random() * 10)
            let inputs = target === 1 ? [a, b] : [a, a]

            this.nn.train(inputs, [target])

            // let index = Math.floor(Math.random() * data.length)
            // this.nn.trainMultiLevel(data[index].data, data[index].target)
        }

        this.training = false

        console.log(this.nn.predict([5, 0]))
        console.log(this.nn.predict([2, 8]))
        console.log(this.nn.predict([7, 7]))
        console.log(this.nn.predict([3, 3]))
    }
}
