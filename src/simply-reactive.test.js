import { simplyReactive } from './simply-reactive'
import { createGetDepsOf } from './test-utils'

describe('simplyReactive', () => {
  it('can watch', () => {
    const reactive = simplyReactive({
      data: {
        a: 0,
        b: 0,
        sum: 0,
      },
      watch: {
        calcSum({ data }) {
          data.sum = data.a + data.b
        },
      },
    })
    const [data] = reactive
    expect(data.sum).toEqual(0)

    data.a = 10
    data.b = 20
    expect(data.sum).toEqual(30)
  })

  it('adds correct deps', () => {
    const reactive = simplyReactive({
      data: {
        a: 0,
        b: 0,
        sum: 0,
        mul: 0,
      },
      watch: {
        calcSum({ data }) {
          data.sum = data.a + data.b
        },
        calcMul({ data }) {
          data.mul = data.sum * 5
        },
      },
    })
    const getDepsOf = createGetDepsOf(reactive)
    expect(getDepsOf('calcSum')).toEqual(['a', 'b'])
    expect(getDepsOf('calcMul')).toEqual(['sum'])
  })

  it('does not add deps from method', () => {
    const reactive = simplyReactive({
      data: {
        a: 0,
        b: 0,
        sum: 0,
        mul: 0,
      },
      watch: {
        calcSum({ data }) {
          data.sum = data.a + data.b
        },
        calcMul({ data, methods }) {
          data.mul = methods.multiplySumBy(5)
        },
      },
      methods: {
        multiplySumBy({ data }, by) {
          return data.sum * by
        },
      },
    })
    const getDepsOf = createGetDepsOf(reactive)
    expect(getDepsOf('calcSum')).toEqual(['a', 'b'])
    expect(getDepsOf('calcMul')).toEqual([])
  })
})
