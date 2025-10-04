import React from 'react'
import Button from './Button'

const Hero = () => {
  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      <p className='font-ccsmashRegular text-dark-primary'>This is from Michroma</p>
      <p className='font-outfit'>This is from Outfit</p>
      <Button title="Click Me" size="m"/>
      <Button title="Click Me" size='s'/>
      <Button title="Click Me" size='l'/>
    </div>
  )
}

export default Hero
