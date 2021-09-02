import { Matrix } from '../src/matrix'
import { expect } from 'chai'

describe('Matrix', function () {
    describe('scale', function () {
        it('should scale all values by 3', function () {
            const m = new Matrix(2, 2, 1)
            m.scale(3)
            expect(m.data).to.eql([
                [3, 3],
                [3, 3],
            ])
        })
    })
    describe('add', function () {
        it('add 2 to all values', function () {
            const m = new Matrix(2, 2)
            m.add(2)
            expect(m.data).to.eql([
                [2, 2],
                [2, 2],
            ])
        })
    })

    describe('add - matrix', function () {
        it('should add matrix from matrix on element basis', function () {
            const m = new Matrix(2, 2, 12)
            const b = new Matrix(2, 2)
            b.randomise()

            const bValues = b.data
            const expectation = m.data.map((column, ridx) =>
                column.map((cell, cidx) => 12 + bValues[ridx][cidx]),
            )

            m.add(b)
            expect(m.data).to.eql(expectation)
        })
    })

    describe('subtract - int', function () {
        it('should subtract 5 from all values', function () {
            const m = new Matrix(2, 2, 5)
            m.subtract(4)
            expect(m.data).to.eql([
                [1, 1],
                [1, 1],
            ])
        })
    })

    describe('subtract - matrix', function () {
        it('should subtract matrix from matrix on element basis', function () {
            const m = new Matrix(2, 2, 12)
            const b = new Matrix(2, 2)
            b.randomise()

            const bValues = b.data
            const expectation = m.data.map((column, ridx) =>
                column.map((cell, cidx) => 12 - bValues[ridx][cidx]),
            )

            m.subtract(b)
            expect(m.data).to.eql(expectation)
        })
    })

    describe('multiply element wise - matrix', function () {
        it('should produce the dot product of two arrays where a.cols === b.rows', function () {
            const m = new Matrix(2, 2, 3)
            const b = new Matrix(2, 2, 4)
            m.multiply(b)

            expect(m.data[0][0] && m.data[1][1]).to.equal(12)
        })
    })

    describe('multiply - matrix', function () {
        it('where a.cols !== b.rows undefined should be returned', function () {
            const a = new Matrix(5, 4)
            const b = new Matrix(2, 8)
            expect(Matrix.multiply(a, b)).to.equal(undefined)
        })
        it('should produce the dot product of two arrays where a.cols === b.rows', function () {
            const m = new Matrix(2, 2, 3)
            const b = new Matrix(2, 2, 4)

            expect(Matrix.multiply(m, b).data[0][0] && Matrix.multiply(m, b).data[1][1]).to.equal(
                24,
            )
        })
    })

    describe('map - matrix', function () {
        it('should modify every element in the matrix by the provided function', function () {
            const m = new Matrix(2, 2, 3)
            const func = (x) => (x * 8) / 4
            m.map(func)

            expect(m.data[0][0] && m.data[1][1]).to.equal(6)
        })
    })

    describe('transpose - matrix', function () {
        it('should return the transposed matrix', function () {
            const m = new Matrix(3, 2)
            m.randomise()
            const b = m.transpose()

            expect(b.data.length).to.equal(2)
            expect(b.data[1].length).to.equal(3)
            expect(b.data[1][0]).to.equal(m.data[0][1])
        })
    })

    describe('copy - matrix', function () {
        it('should return a copy of the provided matrix', function () {
            const m = new Matrix(3, 2)
            const b = m.copy()

            expect(b.data).to.eql(m.data)
        })
    })
})
