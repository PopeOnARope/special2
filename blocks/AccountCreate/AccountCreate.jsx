import React from 'react'
import FancyTextInput from '../../components/ui/Form/FancyTextInput'
import { LoadingDots } from '../../components/ui'
import { validateEmail } from '../../lib/validateEmail'
import { ArrowLeft, Cross, SpecialLogo } from '../../components/icons'
import { grained } from '../../lib/grain'
import Cookie from 'js-cookie'
import styled from 'styled-components'
import useAudio from '../Carousel/useAudio'

const ConfirmButton = styled.button`
  font-family: 'RayJohnson';
  font-size: 1.75rem;
  background: black;
  color: white;
  padding: 0.25rem;
  z-index: 100;
&:disabled {
  background: #555;
}

`

const Signup = ({
  content,
  finePrint,
  title,
  declineButtonLabel,
  secondaryContent,
  sound,
}) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhone] = React.useState('')
  const [agree, setAgree] = React.useState(true)
  const [error, setError] = React.useState('')
  const [playing, toggle] = useAudio(sound)

  const [formStatus, setFormStatus] = React.useState('initial')
  const [height, setHeight] = React.useState(768)
  function decline() {
    Cookie.set('account', 'declined', { expires: 7 })
    window.location.href = '/redirect'
  }
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
    urlencoded.append('first_name', name.split(' ')[0])
    urlencoded.append('last_name', name.split(' ')[name.split(' ').length-1])

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

  return (
    <div
      className="flex flex-col items-center type-wrapper w-full h-full pt-8 "
      id="accountCreate"
    >


      <button
        className="absolute text-sm right-0"
        style={{ transform: 'rotate(90deg)', marginTop: '25rem', fontFamily: 'Nova Stamp Bold' }}
        onClickCapture={toggle}
      >
        Sound {playing ? 'on' : 'off'}
      </button>

      <div
        className="flex flex-col px-8 mt-8"
        style={{ minWidth: '16rem', maxWidth: '48rem' }}
      >
        <h3
          className="text-xl text-bold floating text-center"
          style={{
            textDecoration: 'underline',
            textDecorationColor: '#ffc391',
            fontSize: '1.5rem',
          }}
          dangerouslySetInnerHTML={{__html: title}}
        >
        </h3>
        <p
          className="text-sm text-center"
          style={{ fontFamily: 'InputMono' }}
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
        <div className="input-container w-full px-16 ">
          <FancyTextInput
            font='Nova Stamp Bold'
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
            font='Nova Stamp Bold'
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
            font='Nova Stamp Bold'
            name="phoneNumber"
            label="Phone?"
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
      <div className="flex flex-col items-center p-8">
        <ConfirmButton
          onClick={handleSubmit}

          disabled={
            formStatus === 'success' || formStatus === 'initial'
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
        </ConfirmButton>

        <a
          onClick={decline}
          className="mt-4 text-sm inline-flex items-center"
          style={{
            fontFamily: 'InputMono',
            position: 'relative',
            height: '1rem',
            cursor: 'pointer',
          }}
        >
          <span>{declineButtonLabel}</span> <ArrowLeft height='1rem' orientation="right" />
        </a>
        <p
          className="mt-20 uppercase text-left"
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            fontFamily: 'RayJohnson',
            maxWidth: '50rem'
          }}
          dangerouslySetInnerHTML={{ __html: secondaryContent }}
        ></p>
        <p
          style={{
            bottom: 0,
            position: 'absolute',
            alignSelf: 'center',
            fontSize: '0.5rem',
          }}
          className="text-center"
          dangerouslySetInnerHTML={{ __html: finePrint }}
        ></p>
      </div>
    </div>
  )
}

export default Signup
