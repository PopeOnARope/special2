import React from 'react'
import TextInput from '../../components/ui/Form/TextInput'
import Checkbox from '../../components/ui/Form/Checkbox'
import Button from '../Button/Button'
import { LoadingDots } from '../../components/ui'
import { validateEmail } from '../../lib/validateEmail'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { Cross } from '../../components/icons'
import {grained} from '../../lib/grain'
import Cookie from 'js-cookie'


const Signup = ({ content, finePrint, title }) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhone] = React.useState('')
  const [agree, setAgree] = React.useState(true)
  const [error, setError] = React.useState('')
  const [birthday, setBirthday] = React.useState('')
  const [shareSomething, setShareSomething] = React.useState('')
  const [firstPartSubmitted, setFirstPartSubmitted] = React.useState(false)

  const [formStatus, setFormStatus] = React.useState('initial')
  const [height, setHeight] = React.useState(768)

  React.useEffect(()=>{
    setHeight(window.innerHeight)
    grained('accountCreate', {
      "animate": true,
      "patternWidth": 100,
      "patternHeight": 100,
      "grainOpacity": 0.04,
      "grainDensity": 1.79,
      "grainWidth": 4.27,
      "grainHeight": 1
    })

  }, [])

  async function postData() {
    const data = `g='XKvFZS'&email=${email}&name=${name}&phoneNumber=${phoneNumber}&birthday=${birthday}&shareSomething=${shareSomething}`

    var urlencoded = new URLSearchParams()
    urlencoded.append('g', 'XKvFZS')
    urlencoded.append('email', email)
    urlencoded.append('phone_number', phoneNumber)
    urlencoded.append('name', name)
    urlencoded.append('birthday', birthday)
    urlencoded.append('shareSomething', shareSomething)

    const url = 'https://manage.kmail-lists.com/ajax/subscriptions/subscribe'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      body: urlencoded,
    })
    setTimeout(()=>{
      window.location.href = '/release2';
    }, 2000)
    return response.json()
  }
  function handleSubmit() {
    //set state to loading
    setFormStatus('loading')
    postData()
      .then((r) => {
        if (r.errors.length) {
          setFormStatus('error')
          setError(r.errors[0])
        }
        setFormStatus('success')
      })
      .catch((r) => {
        setFormStatus('error')
        if (r?.errors?.length) {
          setError(r?.errors[0])
        } else {
          setError('Something went wrong. Please try again later.')
        }
      })
  }
  function doSetEmailStatus(value) {
    if (validateEmail(value) && agree) {
      setFormStatus('ready')
    } else {
      setFormStatus('initial')
    }
  }

  function doSetFormStatus() {
    if (validateEmail(email) && agree) {
      setFormStatus('ready')
    } else {
      setFormStatus('initial')
    }
  }

  const form1 = (
    <div
      className="flex flex-col px-8 floating"
      style={{ minWidth: '16rem', maxWidth: '48rem' }}
    >
      <button className='absolute' style={{right: '1rem', top: '-1rem'}} onClick={()=>{
        Cookie.set('account', 'declined', {expires: 7})
        window.location.href = '/redirect'
      }}><Cross/></button>
      <h4
        className="text-xl text-bold "
        style={{
          textDecoration: 'underline',
          textDecorationColor: '#ffc391',
        }}
      >
        {title}
      </h4>
      <p className="text-sm" dangerouslySetInnerHTML={{__html: content}}>
       </p>
      <div className="input-container w-full px-16 py-8 ">
        <TextInput
          name="name"
          label="Name?"
          onChange={(e) => {
            if (error) {
              setError(false)
            }
            setName(e.target.value)
            doSetFormStatus()
          }}
        />
        <TextInput
          name="email"
          label="Email?"
          onChange={(e) => {
            if (error) {
              setError(false)
            }
            setEmail(e.target.value)
            doSetEmailStatus(e.target.value)
          }}
        />
        <Checkbox
          label="I agree to Spec_ial's <a className='text-underline' href='/terms-and-conditions'>terms and conditions</a>"
          onChange={(e) => {
            setAgree(e.target.checked)
          }}
          checked={agree}
        />
        <div className="flex flex-col  items-center">
          <Button
            onClick={() => {
              Cookie.set('account', 'active', {expires: 365})
              setFirstPartSubmitted(true);
            }}
            disabled={
              !agree || formStatus === 'success' || formStatus === 'initial'
            }
          >
            {' '}
            <span> {formStatus === 'loading' && <LoadingDots />}</span>
            <span>
              {(formStatus === 'initial' || formStatus === 'ready') && 'Submit'}
            </span>
            <span>
              {formStatus === 'success' &&
                'Thank you for joining! We will be in touch'}
            </span>
          </Button>
        </div>
      </div>
      <p className="text-xs mt-20" dangerouslySetInnerHTML={{__html: finePrint}}>

      </p>
    </div>
  )

  const form2 = (
    <div
      className="flex flex-col px-8 floating"
      style={{ minWidth: '16rem', maxWidth: '48rem' }}
    >
      <h4
        className="text-xl text-bold "
        style={{
          textDecoration: 'underline',
          textDecorationColor: '#ffc391',
        }}
      >
        Thanks {name}, we're excited to have you. We'll email you at {email}{' '}
        with your $95 credit.
      </h4>
      <p className="text-sm">
        Answer below to take full advantage of all the perks.
      </p>
      <div className="input-container w-full px-16 py-8 ">
        <TextInput
          name="phoneNumber"
          label="phone #?"
          onChange={(e) => {
            if (error) {
              setError(false)
            }
            setPhone(e.target.value)
            doSetFormStatus()
          }}
        />
        <TextInput
          name="birthday"
          label="birthday?"
          onChange={(e) => {
            if (error) {
              setError(false)
            }
            setBirthday(e.target.value)
            doSetFormStatus()
          }}
        />
        <TextInput
          name="share"
          label="Share something?"
          onChange={(e) => {
            if (error) {
              setError(false)
            }
            setShareSomething(e.target.value)
            doSetFormStatus()
          }}
        />

        <div className="flex flex-col  items-center">
          <Button
            onClick={handleSubmit}
            disabled={
              !agree || formStatus === 'success' || formStatus === 'initial'
            }
          >
            {' '}
            <span> {formStatus === 'loading' && <LoadingDots />}</span>
            <span>
              {(formStatus === 'initial' || formStatus === 'ready') && 'Submit'}
            </span>
            <span>
              {formStatus === 'success' &&
                'Thank you for joining! We will be in touch'}
            </span>
          </Button>
        </div>
      </div>
      <p className="text-xs mt-20" dangerouslySetInnerHTML={{__html: finePrint}}>

      </p>
    </div>
  )

  return (
    <div className="flex flex-col items-center type-wrapper w-full h-full pt-8" id="accountCreate">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={firstPartSubmitted}
          classNames="in-out"
          timeout={300}
        >
          {firstPartSubmitted ? form2 : form1}
        </CSSTransition>
      </SwitchTransition>
    </div>
  )

}

export default Signup
