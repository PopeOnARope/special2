import React from 'react'
import FancyTextInput from '../../components/ui/Form/FancyTextInput'
import Checkbox from '../../components/ui/Form/Checkbox'
import Button from '../Button/Button'
import { LoadingDots } from '../../components/ui'
import { validateEmail } from '../../lib/validateEmail'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { ArrowLeft, Cross, SpecialLogo } from '../../components/icons'
import { grained } from '../../lib/grain'
import Cookie from 'js-cookie'
import { formatDate } from '../../lib/formatDate'

const Signup = ({ content, finePrint, title, declineButtonLabel, secondaryContent }) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhone] = React.useState('')
  const [agree, setAgree] = React.useState(true)
  const [error, setError] = React.useState('')
  const [birthday, setBirthday] = React.useState('')
  const [shareSomething, setShareSomething] = React.useState('')
  const [firstPartSubmitted, setFirstPartSubmitted] = React.useState(false)
  // const [personId, ]

  const [formStatus, setFormStatus] = React.useState('initial')
  const [height, setHeight] = React.useState(768)

  React.useEffect(() => {
    setHeight(window.innerHeight)
    grained('accountCreate', {
      animate: true,
      patternWidth: 100,
      patternHeight: 100,
      grainOpacity: 0.04,
      grainDensity: 1.79,
      grainWidth: 4.27,
      grainHeight: 1,
    })
  }, [])

  async function postData() {
    // const data = `g='XKvFZS'&email=${email}&name=${name}&phoneNumber=${phoneNumber}`

    var urlencoded = new URLSearchParams()
    urlencoded.append('g', 'XKvFZS')
    urlencoded.append('email', email)
    urlencoded.append('phone_number', phoneNumber)
    urlencoded.append('name', name)

    const url = 'https://manage.kmail-lists.com/ajax/subscriptions/subscribe'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      body: urlencoded,
    })
    setTimeout(() => {
      window.location.href = '/release2'
    }, 1000)
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

  const form = (
    <div
      className="flex flex-col px-8 mt-8"
      style={{ minWidth: '16rem', maxWidth: '48rem' }}
    >
      <h3
        className="text-xl text-bold floating text-center"
        style={{
          textDecoration: 'underline',
          textDecorationColor: '#ffc391',
          fontSize: '1.5rem'
        }}
      >
        {title}
      </h3>
      <p
        className="text-sm text-center"
        style={{ fontFamily: 'InputMono' }}
        dangerouslySetInnerHTML={{ __html: content }}
      ></p>
      <div className="input-container w-full px-16 ">
        <FancyTextInput
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
        <FancyTextInput
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
        <FancyTextInput
          name="phoneNumber"
          secondaryLabel="* we barely send any texts"
          label="Phone #?"
          onChange={(e) => {
            if (error) {
              setError(false)
            }
            setPhone(e.target.value)
            doSetFormStatus()
          }}
        />


      </div>

    </div>
  )

  return (
    <div
      className="flex flex-col items-center type-wrapper w-full h-full pt-8"
      id="accountCreate"
    >
      <SpecialLogo />

          {form}
      <div className="flex flex-col items-center p-8">
        <Button
          onClick={handleSubmit}
          style={{ fontFamily: 'RayJohnson', fontSize: '1.25re' }}
          disabled={
            !agree || formStatus === 'success' || formStatus === 'initial'
          }
        >
          {' '}
          <span> {formStatus === 'loading' && <LoadingDots />}</span>
          <span>
              {(formStatus === 'initial' || formStatus === 'ready') &&
              'BECOME A MEMBER'}
            </span>
          <span>
              {formStatus === 'success' &&
              'Thank you for joining! We will be in touch'}
            </span>
        </Button>

        <a
          onClick={() => {
            Cookie.set('account', 'declined', { expires: 7 })
            window.location.href = '/redirect'
          }}
          className="mt-4 text-sm inline-flex items-center"
          style={{ fontFamily: 'InputMono', position: 'relative', height: '1rem', width: '20rem', cursor: 'pointer' }}
        >
          <span>{declineButtonLabel}</span> <ArrowLeft orientation="right" />
        </a>
        <p
          className="t mt-20 uppercase text-left"
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            fontFamily: 'RayJohnson',
          }}
          dangerouslySetInnerHTML={{__html: secondaryContent}}
        ></p>
        <p
          style={{ bottom: 0, position: 'absolute', alignSelf: 'center', fontSize: '0.5rem' }}
          className="text-center"
          dangerouslySetInnerHTML={{ __html: finePrint }}
        ></p>
      </div>
    </div>
  )
}

export default Signup
