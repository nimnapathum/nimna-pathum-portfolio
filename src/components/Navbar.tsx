import React from 'react'

interface NavLink {
    name: string; 
    href: string
}

const NavLinks: NavLink[] = [
    {name: 'Home', href: '#home'},
    {name: 'About', href: '#about'},
    {name: 'Projects', href: '#projects'},
    {name: 'Contact', href: '#contact'},
];

const Navbar: React.FC = () => {
  return (
    <div className='relative h-20 flex flex-row pt-10 items-center justify-between px-6'>
      <div className='text-2xl font-bold cursor-pointer'>
        <span className='font-ccsmash text-6xl uppercase'>Nimna pathum</span>
      </div>
      <div className='flex flex-row text-lg gap-6'>
        {NavLinks.map((link) => (
            <a key={link.name} href={link.href} className='hover:font-ccsmash'>{link.name}</a>
        ))}
      </div>
    </div>
  )
}

export default Navbar
