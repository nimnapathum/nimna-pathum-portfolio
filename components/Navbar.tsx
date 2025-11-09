import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Navbar = () => {
  return (
    <header
        className='w-full py-8 font-medium grid grid-cols-3 items-center text-center' 
    >
        <div className='flex justify-start gap-8'>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
        </div>
        <div className='flex justify-center'>
            <p className='flex items-center px-6 text-2xl hover:cursor-none bg-foreground text-background rounded-full h-12'>Nimna Pathum</p>
        </div>
        <div className='flex justify-end gap-8 text-2xl'>
            <Link href=""><FaGithub /></Link>
            <Link href=""><FaLinkedin /></Link>
        </div>
    </header>
  )
}

export default Navbar
