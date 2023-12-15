
import { useState , useCallback, useEffect , useRef} from 'react'
import './App.css'

function App() {
  
   const [ length ,setLength] = useState(8);   //our field has password length which we need to modify 
   const [numberAllowed , setNumberAllowed] = useState(false);
   const [ characterAllowed, setcharacterAllowed] = useState(false);
   const [ password , setPassword] = useState("");
   
    //use ref
    const passref = useRef(null)

    const CopyPass = useCallback(()=>{
        passref.current?.select()
        window.navigator.clipboard.writeText(password)
    }, [password])

   const passwordGenerator = useCallback( ()=>{
      let pass = ""
      let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
      
      if(numberAllowed) str+="0123456789"
      if(characterAllowed) str += "!@#$%^*~`"

      for(let i =1; i<=length ; i++){
        let char = Math.floor(Math.random ()* str.length+1)
        pass += str.charAt(char)
      }
        setPassword(pass);

   } , [length, numberAllowed, characterAllowed, setPassword ])

      useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])       

  return (
   
// <div className="m-0 p-0 bg-blue-600 h-screen w-screen flex items-center justify-center">
//   <h1 className="text-white text-5xl">Prick</h1>
// </div>


<div className="m-0 p-0 bg-slate-600 h-screen w-screen flex  flex-col items-center justify-center">
 <h1 className="text-white text-5xl">Password Generator</h1>

  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-300 bg-gray-700'>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 my-4'>
       <input type="text" value={password} className='outline-none w-full py-1 px-3 ' placeholder='password' 
       readOnly  ref={passref}/>
        <button className='text-gray-400' onClick={CopyPass}>copy</button>
    </div>
    
    <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>

          <input type="range" min={3} max={50} value={length} className='cursor-pointer'
          onChange={(e)=>{
              setLength(e.target.value)
          }}/>
          <label className='text-gray-50' > Length : {length}</label>

          
          <div className='flex items-center ml-3' > 
            <input type="checkbox" defaultChecked={numberAllowed} id='Numbers'
            onChange={()=>{
                setNumberAllowed((prev)=>!prev)
            }} />
          </div>
          <label className='text-gray-50'>Numbers  </label>
         
          <div className='flex items-center gap-x-1 ml-3' > 
            <input type="checkbox" defaultChecked={characterAllowed} id='Numbers'
            onChange={()=>{
                setcharacterAllowed((prev)=>!prev)
            }} />
          </div>
          <label className='text-gray-50'>Characters  </label>

        </div>
    </div>
    
   
    </div>
</div>

  )
}

export default App
