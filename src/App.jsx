//Importing the hooks here
import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  //dependecies and constants
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook which is used for the copy button.
  const passwordRef = useRef(null);

  //Method for generating the password.
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+=[]{}~`";
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor((Math.random() * str.length + 1))
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]);

  //onClick method for the button to copy the password to the clipboard.
  const copyPasswordToClipbboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  //This hook is running the passwordGenerator method whenever slider, number or characters are changed.
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      {/* Heading */}
      <h1 className="text-4xl text-center text-white mt-20 font-mono font-bold tracking-wider">
      PASSWORD GENERATOR
      </h1>

      {/* Main Container */}
      <div className="w-full p-5 max-w-md mx-auto shadow-md my-6 text-pink-500 bg-slate-800 rounded-lg text-center">
        
        {/* Password Field */}
        <div className='flex'>
        <input
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3 rounded-lg'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />

        {/* Copy Password Button */}
        <button
        onClick={copyPasswordToClipbboard}
        className='outline-none text-white bg-blue-700 hover:bg-blue-400 rounded-lg px-3 py-0.5 shrink-0 ml-2'
        >Copy</button>
        </div>
        
        {/* Slider, Numbers & Characters Checkbox */}
        <div className='flex font-mono font-semibold text-sm mt-3 gap-x-2 justify-between'>

          {/* Slider */}
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={5}
            max={15}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>

          {/* Numbers checkbox */}
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          {/* Characters checkbox */}
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
