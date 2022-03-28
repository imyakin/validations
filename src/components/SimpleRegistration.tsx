import React, {useState, useEffect} from 'react'

const SimpleRegistration = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passDirty, setPassDirty] = useState(false);
    const [emailError, setEmailError] = useState('email cannot be empty');
    const [passError, setPassError] = useState('password cannot be empty');
    const [formValid, setFormValid] = useState(false);

  const blurHandler = (e: { target: { name: string; }; }) => {
    switch(e.target.name){
      case 'email': 
        setEmailDirty(true);
        break;
      case 'password':
        setPassDirty(true);
        break;
    }
  }

  const emailHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(String(e.target.value).toLowerCase())){
      setEmailError('Invalid Email')
    } else {
      setEmailError('')
    }
  }

  const passHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPass(e.target.value);
    if(e.target.value.length < 3 || e.target.value.length > 8){
      setPassError('Password must be longer that 3 and shorter than 8 symbols')
      if(!e.target.value){
        setPassError('password cannot be empty')
      }
    } else {
      setPassError('')
    }
  }

  useEffect(() => {
    if(emailError || passError){
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passError])

  return (
    <div className="App">
      <p>Registration</p>
      <form>
        <label htmlFor='email'>Email adress</label>
        {(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}
        <br/>
        <input value={email} onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} name='email' id='email' placeholder='Enter your email'/>
        <br/>
        <label htmlFor='password'>Password</label>
        {(passDirty && emailError) && <div style={{color: "red"}}>{passError}</div>}
        <br/>
        <input value={password} onChange={e => passHandler(e)} onBlur={e => blurHandler(e)} name='password' id='password' placeholder='Enter your password'/>
        <br/>
        <button disabled={!formValid} type='submit'>Register</button>      
      </form>
    </div>
  );
}

export default SimpleRegistration