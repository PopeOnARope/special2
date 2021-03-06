import React from 'react'

const Footer = ({
  sections,
  bottomLinks,
  darkMode,
  headerColor,
  headerFont,
  secondaryLinkFont,
  linkFont,
}) => {
  const bgClass = darkMode ? 'dark-mode-wrapper' : 'light-mode-wrapper'
  return (
    <div
      className={`mx-auto ${bgClass} w-max-content dark:bg-gray-800`}
      style={{ width: '100%' }}
    >
      <div
        className="max-h-52 md:max-h-64 ml-10 flex flex-col flex-wrap md:flex-row md:flex-nowrap"
        style={{ maxWidth: '64rem' }}
      >
        {sections?.map((section) => (
          <div className="md:w-1/3 flex flex-col justify-items-start mb-4">
            <h5
              style={{ fontFamily: headerFont }}
              className={`uppercase font-bold mb-3  ${
                headerColor === 'white' ? 'text-white' : 'text-gray-500'
              }`}
            >
              {section.title}
            </h5>

            {section?.links?.map((link) => (
              <a
                style={{ fontFamily: linkFont, fontSize: '0.75rem' }}
                href={link.url}
                className="text-extrabold"
                target={link.openInNewTab ? '_blank' : '_self'}
              >
                {link.title}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="float-right flex flex-row mb-4">
        {bottomLinks?.map((link) => (
          <div className="mx-5">
            <a
              style={{ fontFamily: secondaryLinkFont }}
              className={` ${
                headerColor === 'white' ? 'text-white' : 'text-gray-500'
              }`}
              href={link.url}
              target={link.openInNewTab ? '_blank' : '_self'}
            >
              {link.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
