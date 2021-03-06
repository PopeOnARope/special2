import React from 'react'
import TextInput from '../../components/ui/Form/TextInput'
import Checkbox from '../../components/ui/Form/Checkbox'
import Button from '../Button/Button'
import { LoadingDots } from '../../components/ui'
import { validateEmail } from '../../lib/validateEmail'

const Signup = ({ content }) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhone] = React.useState('')
  const [agree, setAgree] = React.useState(true)
  const [error, setError] = React.useState('')
  const [formStatus, setFormStatus] = React.useState('initial')

  async function postData() {
    const data = `g='XKvFZS'&email=${email}&name=${name}&phoneNumber=${phoneNumber}`

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
    <div className="px-10 mx-auto md:my-20 mb-20">
      <div className="flex flex-col md:flex-row justify-items-start md:justify-center">
        <div className="md:max-w-lg md:mr-12 md:w-763">
          <h1 className="primary-h1 hidden md:inline-flex"> Spec_ial</h1>
          <h1 className="secondary-h1 hidden md:inline-flex"> Club</h1>
          <h1 className="heading text-4xl py-8-24 md:hidden text-center">
            Spec_ial Club
          </h1>
          <p style={{ fontSize: '1rem', padding: '1.25rem 0' }}>{content}</p>
        </div>
        <div className="md:max-w-3xl">
          <TextInput
            name="name"
            label="Name"
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
            label="Email"
            onChange={(e) => {
              if (error) {
                setError(false)
              }
              setEmail(e.target.value)
              doSetEmailStatus(e.target.value)
            }}
          />
          <TextInput
            name="phoneNumber"
            label="Phone SMS"
            onChange={(e) => {
              if (error) {
                setError(false)
              }
              setPhone(e.target.value)
              doSetFormStatus()
            }}
          />
          <Checkbox
            label="I agree to Spec_ial's <a className='text-underline' href='/terms-and-conditions'>terms and conditions</a>"
            onChange={(e) => {
              setAgree(e.target.checked)
            }}
            checked={agree}
          />
          <Button
            onClick={handleSubmit}
            disabled={
              !agree || formStatus === 'success' || formStatus === 'initial'
            }
          >
            {' '}
            <span> {formStatus === 'loading' && <LoadingDots />}</span>
            <span>
              {(formStatus === 'initial' || formStatus === 'ready') && 'Join'}
            </span>
            <span>
              {formStatus === 'success' &&
                'Thank you for joining! We will be in touch'}
            </span>
          </Button>

          {formStatus === 'error' && (
            <span className="text-lg type-wrapper" style={{ color: 'red' }}>
              {error}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Signup
