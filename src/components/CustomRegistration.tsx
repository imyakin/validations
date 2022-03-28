import React, {useEffect, useState} from "react"

const CustomRegistration = () => {
    interface Valid {
        isEmpty: boolean;
        minLength: number;
        isEmail?: boolean;
        maxLength?: number;
    }

    const useValidation = (value: string, validations: Valid) => {
        const [isEmpty, setIsEmpty] = useState(true);
        const [minLengthError, setMinLengthError] = useState(false);
        const [maxLengthError, setMaxLengthError] = useState(false);
        const [emailError, setEmailError] = useState(false);
        const [inputValid, setInputValid] = useState(false)

        useEffect(()=>{
            for (const validation in validations) {
                switch(validation){
                    case 'minLength':
                        value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                        break;
                    case 'isEmpty':
                        value ? setIsEmpty(false) : setIsEmpty(true)
                        break;
                    case 'maxLength':
                        value.length > validations[validation]! ? setMaxLengthError(true) : setMaxLengthError(false)
                        break;
                    case 'isEmail':
                        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                        re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                        break;
                }
            }
        }, [value])

        useEffect(()=>{
            if(isEmpty || minLengthError || maxLengthError || emailError){
                setInputValid(false)
            } else {
                setInputValid(true)
            }
        }, [isEmpty, minLengthError, maxLengthError, emailError])

        return {
            isEmpty,
            minLengthError,
            maxLengthError,
            emailError,
            inputValid
        }
    }

    const useInput = (initialValue: string, validations: Valid) => {
        const [value, setValue] = useState(initialValue);
        const [isDirty, setIsDirty] = useState(false)
        const valid = useValidation(value, validations)

        const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
            setValue(e.target.value)
        }

        const onBlur = (e: { target: { value: React.SetStateAction<string>; }; }) => {
            setIsDirty(true)
        }

        return {
            value,
            onChange,
            onBlur,
            isDirty,
            ...valid
        }

    }

    const email = useInput('', {isEmpty: true, minLength: 3, isEmail: true})
    const password = useInput('', {isEmpty: true, minLength: 5, maxLength: 8})

    return (
        <>
            <form>
                {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Email cannot be empty</div>}
                {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Invalid email length</div>}
                {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>Invalid email</div>}
                <input value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} id="email" name="email" placeholder="Enter your email"/>
                {(password.isDirty && password.isEmpty) && <div style={{color: 'red'}}>password cannot be empty</div>}
                {(password.isDirty && password.minLengthError) && <div style={{color: 'red'}}>Too short password</div>}
                {(password.isDirty && password.maxLengthError) && <div style={{color: 'red'}}>Too long password length</div>}
                <input value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} id="pass" name="password" placeholder="Enter your password"/>
                <button disabled={!email.inputValid || !password.inputValid} type="submit">Register</button>
            </form>
        </>
    )
}

export default CustomRegistration