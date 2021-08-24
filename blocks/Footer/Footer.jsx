import React from 'react'
import styled from 'styled-components'

import Button from '../Button/Button'

import { H1, SecondaryH1 } from '../../components/Typography'
import TextInput from '../../components/ui/Form/TextInput'
import Checkbox from '../../components/ui/Form/Checkbox'

const Footer1 = ({ postContent }) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [agree, setAgree] = React.useState(false)
  const [error, setError] = React.useState('')
  const [formStatus, setFormStatus] = React.useState('initial')

  async function postData() {
    const url = 'https://manage.kmail-lists.com/ajax/subscriptions/subscribe'
    const response = await fetch(url, {
      async: true,
      crossDomain: true,
      url,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
      },
      data: {
        "g": "XKvFZS",
        "email": email,
        "name": name,
        "phone": phone
      },
    })
    return response.json()
  }
  function handleSubmit() {
    //set state to loading
    setFormStatus('loading')
    postData()
      .then((r) => {console.log({ r })
      if(r.errors.length){
        setFormStatus('error')
        setError(r.errors[0])
      }

      })
      .catch((r) => {
        console.log({ r })
      })


    //try posting
    //if error, set submitState
    //if success set submitState to success
  }

  console.log({agree, name, phone, email})
  return (
    <div className="px-10 mx-auto md:my-20 mb-20">
      <div className="flex flex-col md:flex-row justify-items-start md:justify-center">
        <div className="md:max-w-lg md:mr-12 md:w-763">
          <h1 className="primary-h1 hidden md:inline-flex"> Spec_ial</h1>
          <h1 className="secondary-h1 hidden md:inline-flex"> Club</h1>
          <h1 className="heading text-5xl py-8-24 md:hidden text-center">
            Spec_ial Club
          </h1>
          <p style={{ fontSize: '1.25rem', padding: '1.25rem 0' }}>
            For a virtual fashion show introducing Spec__ial’s first collection
            of handmade imaginative eyewear. Post-show the collection available
            for viewing and purchase in limited quanities.
          </p>
        </div>
        <div className="md:max-w-3xl">
          <TextInput
            name="name"
            label="Name"
            onChange={(e) => {if(error){setError(false)}setName(e.target.value)}}
          />
          <TextInput
            name="email"
            label="Email ( 01-02 emails every month )"
            onChange={(e) => {if(error){setError(false)}setEmail(e.target.value)}}
          />
          <TextInput
            name="phone"
            label="Phone SMS ( 01-02 texts every 03 months )"
            onChange={(e) => {if(error){setError(false)}setPhone(e.target.value)}}
          />
          <Checkbox label="I agree to Spec__ial's terms and conditions" onChange={(e)=>{setAgree(e.target.checked)}} />
          <Button onClick={handleSubmit} disabled={!agree}>Join</Button>
          {formStatus === 'error' && <span className='text-lg type-wrapper' style={{color: 'red'}}>{error}</span>}
        </div>
      </div>
    </div>
  )
}

const Footer = ({ sections, bottomLinks, darkMode }) => {
  const bgClass = darkMode ? 'dark-mode-wrapper' : 'light-mode-wrapper'
  function postContent() {}
  return (
    <div
      className={`mx-auto ${bgClass} w-max-content type-wrapper dark:bg-gray-800`}
      style={{ width: '100%' }}
    >
      <Footer1 />
      <div className="max-h-52 md:max-h-64 ml-10 xl:ml-20 2xl:ml-30 flex flex-col flex-wrap md:flex-row md:flex-nowrap">
        {sections?.map((section) => (
          <div className="md:w-1/3 flex flex-col justify-items-start mb-4">
            <h5 className="uppercase text-gray-400 font-bold mb-3">
              {section.title}
            </h5>

            {section?.links?.map((link) => (
              <a href={link.url} className="text-extrabold">
                {link.title}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="float-right flex flex-row mb-4">
        {bottomLinks?.map((link) => (
          <div className="mx-5">
            <a className="text-gray-500" href={link.url}>
              {link.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
