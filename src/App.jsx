//Importing the hooks here
import { useState, useCallback, useEffect } from 'react'

function App() {
  //dependecies and constants
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //Method for generating the password
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

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-white mt-20">
      PASSWORD GENERATOR
      </h1>

      {/* Main Container */}
      <div className="w-full p-5 max-w-md mx-auto shadow-md my-8 text-orange-500 bg-slate-800 rounded-lg text-center">
        
        {/* Password Field */}
        <div className='flex'>
        <input
        type='text'
        value={password}
        className='outline-none w-full py-1 px-3 rounded-lg'
        placeholder='Password'
        readOnly
        />

        {/* Copy Password Button */}
        <button
        className='outline-none bg-blue-700 text-white rounded-lg px-3 py-0.5 shrink-0 ml-2'
        >Copy</button>
        </div>
        
        {/* Slider, Numbers & Characters Checkbox */}
        <div className='flex text-sm mt-3 gap-x-2 justify-between'>

          {/* Slider */}
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={5}
            max={10}
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
