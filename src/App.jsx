/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (specialCharAllowed) {
      str += "!@#$%^&*()_+{}`~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, specialCharAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current.select(); // selects the text inside the input to be copied
    passwordRef.current.setSelectionRange(0, 100); // will select only 100 characters of the password 
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, specialCharAllowed, generatePassword]);

  return (
    <>
      <div className="flex flex-col mt-10 bg-slate-500 px-4 py-5 w-2/5 mx-auto rounded-lg items-center">
        <h1 className="text-2xl font-semibold mb-4 text-white">
          Password Generator
        </h1>
        <div className="flex w-full gap-3">
          <input
            type="text"
            name="password"
            value={password}
            className="rounded-md p-2 w-full"
            ref={passwordRef}
          />
          <button
            className="bg-slate-800 p-2 rounded-lg text-orange-400 hover:bg-slate-600"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="w-full mt-4">
          <label htmlFor="length" className="block text-orange-400 mb-2">
            Length: {length}
          </label>
          <input
            type="range"
            name="length"
            id="length"
            className="w-full cursor-pointer text-black"
            max={100}
            min={6}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="flex w-full mt-4 gap-3">
          <label className="flex items-center text-white hover:border-b-2 border-orange-400 ">
            <input
              type="checkbox"
              name="numbers"
              className="mr-2 cursor-pointer "
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            Numbers
          </label>

          <label className="flex items-center text-white hover:border-b-2 border-orange-400">
            <input
              type="checkbox"
              name="characters"
              className="mr-2 cursor-pointer"
              defaultChecked={specialCharAllowed}
              onChange={() => {
                setSpecialCharAllowed((prev) => !prev);
              }}
            />
            Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
