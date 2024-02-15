import React from 'react'
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

export function InputSkeleton ({ inputNumber = 1 } : { inputNumber?: number}) {
  const skeletonArray: React.ReactNode[] = []
  for (let i = 0; i < inputNumber; i++) {
    skeletonArray.push(
      <Stack key={i} spacing={1}>
        <Skeleton variant='rectangular' width={200} height={10} sx={{ borderRadius: '4px' }} />
        <Skeleton variant='rectangular' height={50} sx={{ borderRadius: '4px' }} />
      </Stack>
    )
  }
  return skeletonArray
}
