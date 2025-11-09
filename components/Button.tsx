const Button = ({children, variation}) => {
  return (
    <button 
        className={`px-6 py-3 font-medium transition ${
            variation === 'primary' ? 'bg--background text-foreground hover:bg-blue-700' :
            variation === 'secondary' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' :
            'bg-white text-black hover:bg-gray-100'
        }`}
    >
        {children}
    </button>
  )
}

export default Button
