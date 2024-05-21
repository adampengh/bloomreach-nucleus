import { RootState } from '@/redux/store'
import React from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { decrement, increment } from '@/redux/reducers/counter'
import { Button } from '@mui/material'

export const Counter = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </div>
  )
}
