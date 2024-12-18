import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  // using state hook***********
  const [length, SetLenght] = useState(8);
  const [isNum, setIsnum] = useState(false);
  const [isChar, setIschar] = useState(false);
  const [password, setPasssword] = useState("");
  // using state***********

  // using useref Hook for copying the text inside my input;
  const passwordRef = useRef(null)
  // using useref Hook for copying the text inside my input; 


  // creating Password genrator method; and using callback hook*******
  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWYZqwertyuioplkjhgfdsazxcvbnm";
    if (isNum) {
      str += "0123456789"
    } else if (isChar) {
      str += "!@#$%^&*_+"
    }

    // from this loop we will get a index of str;
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPasssword(pass);

  }, [length, isNum, isChar])

  // onclick function for copy button;
  const copyPassToClipBord = useCallback(() => { passwordRef.current?.select(), 
    window.navigator.clipboard.writeText(password) },
    [password])

  // using use effect hook for running password grnrator function***********
  useEffect(() => {
    passwordGenrator()
  }, [length, isNum, isChar])
  // using useeffect hook***********

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 m-8 text-orange-500 bg-gray-800'>
        <h1 className='text-4xl text-center m-4 p-4 rounded-lg'>Pass-Word Genrator 😍</h1>
        <div>
          <input className='input-1' type="text" value={password} placeholder='Password' readOnly ref={passwordRef} />
          <button className='input-1 btn' onClick={copyPassToClipBord}>Copy</button>
        </div>

        
        <div>
          <input className='cursor-pointer' type="range" onChange={(e) => { SetLenght(e.target.value) }} min={8} max={60} value={length} />
          <label htmlFor="">Lenght: {length}</label>
        </div>

        <div>
          <input type="checkbox" defaultChecked={isNum} id='numInput' onChange={() => { setIsnum((prev) => !prev) }} />
          <label htmlFor="">Numbers</label>
        </div>

        <div>
          <input type="checkbox" defaultChecked={isChar} id='charInput' onChange={() => { setIschar((prev) => !prev) }} />
          <label htmlFor="">Charecters</label>
        </div>
      </div>
    </>
  )
}

export default App
