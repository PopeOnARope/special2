import React from 'react'
import styled from 'styled-components'

import Button from '../Button/Button'

import { H1, SecondaryH1 } from '../../components/Typography'
import TextInput from '../../components/ui/Form/TextInput'
import Checkbox from '../../components/ui/Form/Checkbox'



const Footer = ({ sections, bottomLinks, darkMode, headerColor }) => {
  const bgClass = darkMode ? 'dark-mode-wrapper' : 'light-mode-wrapper'
  return (
    <div
      className={`mx-auto ${bgClass} w-max-content type-wrapper dark:bg-gray-800`}
      style={{ width: '100%' }}
    >
      <div className="max-h-52 md:max-h-64 ml-10 flex flex-col flex-wrap md:flex-row md:flex-nowrap" style={{maxWidth: '64rem'}}>
        {sections?.map((section) => (
          <div className="md:w-1/3 flex flex-col justify-items-start mb-4">
            <h5 className={`uppercase text-gray-400 font-bold mb-3 ${headerColor==='white' && 'text-white'}`} >
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
            <a className={`text-gray-500 ${headerColor==='white' && 'text-white'}`} href={link.url} >
              {link.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
