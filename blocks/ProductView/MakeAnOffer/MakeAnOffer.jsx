import React from 'react'
import styled from 'styled-components'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import TextInput from './TextInput'
import { validateEmail } from '@lib/validateEmail'
import Button from '../../Button/Button'
import { LoadingDots } from '@components/ui'

const StyledWindow = styled.div`
  opacity: ${(props) => (!props.flowState ? '0' : '1')};
  display: ${(props) => (!props.flowState ? 'none' : 'inherit')};
  color: white;
  padding: 2rem 4rem;
  background: black;
  height: calc(100% - 7rem);
  overflow: scroll;
  position: fixed;
  top: 5rem;
  right: 2rem;
  width: calc(100vw - 4.5rem);
  z-index: 10;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    bottom: unset;
    text-align: left;
    button {
      width: 100%;;
    }
  }
  transition: ${(props) =>
    !props.flowState ? '0.8s height, 1s opacity' : '0.8s height, 0.2s opacity'};
`

const OfferForm = (props) => {
  const [amount, setAmount] = props.amount
  const [name, setName] = props.name
  const [email, setEmail] = props.email
  const [phoneNumber, setPhone] = props.phoneNumber
  const [error, setError] = props.error
  const [formStatus, setFormStatus] = props.formStatus
  const [flowState, setFlowState] = props.flowState

  const {legalCopy} = props;

  function doSetFormStatus() {
    if (validateEmail(email)) {
      setFormStatus('ready')
    } else {
      setFormStatus('initial')
    }
  }

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = match[1] ? '+1 ' : ''
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
  }

  async function postData() {
    var urlencoded = new URLSearchParams()
    urlencoded.append('g', 'Y8KUXC')
    urlencoded.append('email', email)
    urlencoded.append('$phone_number', `+${phoneNumber}`)
    urlencoded.append('$first_name', name.split(' ')[0])
    urlencoded.append('$last_name', name.split(' ')[name.split(' ').length - 1])
    urlencoded.append('sms_consent', 'true')
    urlencoded.append('$consent', '[sms, email]')
    urlencoded.append('$offerAmount', amount)
    urlencoded.append(
      '$fields',
      '$phone_number, $first_name, $last_name, sms_consent, $consent, $offerAmount '
    )

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

  React.useEffect(() => {
    if (formStatus !== 'loading' && formStatus !== 'success') doSetFormStatus()
  })

  return (
    <div>
      {formStatus !== 'loading' && formStatus !== 'success' && (
        <div className="form">
          <fieldset>
            <TextInput
              name="amount"
              label="Enter Offer Amount"
              placeholder="$0.00"
              type="currency"
              onChange={(v) => {
                if (error) {
                  setError(false)
                }
                setAmount(v)
              }}
            />

            <TextInput
              name="name"
              label="Name"
              placeholder="John Starks"
              onChange={(e) => {
                if (error) {
                  setError(false)
                }
                setName(e.target.value)
              }}
            />

            <TextInput
              name="email"
              label="Email Address"
              placeholder="youremail@email.com"
              onChange={(e) => {
                if (error) {
                  setError(false)
                }
                setEmail(e.target.value)
              }}
            />

            <TextInput
              name="phone"
              label="Phone Number"
              placeholder="212-555-5555"
              type="phone"
              onChange={(v) => {
                if (error) {
                  setError(false)
                }
                setPhone(v)
              }}
            />

            {/* TODO: Not sure what this is supposed to do? */}
            {/* <span>To add a note or include a barter in your offer click here</span> */}
          </fieldset>

          <button
            onClick={handleSubmit}
            disabled={formStatus === 'success' || formStatus === 'initial'}
            style={{background: 'lightgrey', padding: '3rem 6rem', fontFamily: 'InputMono', color: 'black'}}
          >
            {' '}
            <span> {formStatus === 'loading' && <LoadingDots />}</span>
            <span>
              {(formStatus === 'initial' || formStatus === 'ready') &&
                'SUBMIT OFFER'}
            </span>
            <span>
              {formStatus === 'success' &&
                'Thank you for your offer! We will be in touch'}
            </span>
          </button>
          <p style={{marginTop: '1rem', marginLeft: '1rem', fontSize: '0.75rem'}} dangerouslySetInnerHTML={{__html: legalCopy}}></p>
        </div>

      )}

      {formStatus === 'success' && (
        <div className="submitted-offer">
          <div style={{ fontWeight: 'bold' }}>
            <p>{name},</p>
            <p>Thank you for submitting an offer</p>
          </div>

          <div
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: props.makeAnOfferSubmitInfo }}
          />

          <div className="mb-4 mt-4">
            <label className="block">Offer:</label>
            <strong>{`$${amount}`}</strong>
          </div>

          <div className="mb-4">
            <label className="block">Email:</label>
            <strong>{email}</strong>
          </div>

          <div className="mb-4">
            <label className="block">Phone:</label>
            <strong>{formatPhoneNumber(phoneNumber)}</strong>
          </div>

          <p>
            Can't wait? Purchase this item for the asking price
            <span
              role="button"
              onClick={() => {
                setFlowState(0)
              }}
              className="underline"
            >
              {' '}
              here
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

const MakeAnOffer = ({
  productTitle,
  makeAnOfferInfo,
  makeAnOfferSubmitInfo,
  variant,
  addToCart,
  button,
  orientation,
  onClickMakeAndOffer,
  onCloseMakeAnOfferWindow, legalCopy
}) => {
  const [flowState, setFlowState] = React.useState(0)
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)
  const [amount, setAmount] = React.useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phoneNumber, setPhone] = React.useState('')
  const [error, setError] = React.useState('')
  const [formStatus, setFormStatus] = React.useState('initial')

  React.useEffect(() => {
    setWidth(document.getElementById('buy-button').clientWidth)
    setHeight(window.innerHeight)
  })
  function handleButtonClick() {
    onClickMakeAndOffer();
    if (flowState === 0) {
      setFlowState(1)
    } else {
      setFlowState(0)
    }
  }

  const MoreInfo = styled.span`
    font-size: 0.6rem;
    cursor: pointer;
    &:hover {
      color: #868e96;
    }
  `

  return (
    <div
      className="flex"
      style={{
        zIndex: flowState ? 1 : 100,
        width: '100%',
        flexDirection: orientation,
      }}
    >
      {flowState === 0 &&  button}
      <StyledWindow
        display={flowState ? 'none' : 'inherit'}
        flowState={flowState}
        width={width}
      >
        {flowState !== 0 && (
          <button
            style={{
              marginTop: '-0.75rem',
              marginLeft: '-0.75rem',
              position: 'absolute',
              left: '1.5rem',
            }}
            className="text-xl"
            onClick={() => {
              setFlowState(flowState - 1)
            }}
          >
            &lt; Back
          </button>
        )}
        <button
          onClick={() => {
            onCloseMakeAnOfferWindow();
            setFlowState(0)
          }}
          className="absolute px-4"
          style={{ right: 0, marginTop: '-0.5rem' }}
        >
          X
        </button>

        {/*switchable content*/}
        <SwitchTransition>
          <CSSTransition classNames="in-out" timeout={200} key={flowState}>
            <div>
              {flowState === 1 && (
                <>
                  <br></br>
                  <h1 className="mt-4 mb-4">
                    <span style={{ paddingRight: '5px', fontWeight: 'bold' }}>
                      MAKE AN OFFER
                    </span>
                    <span style={{ fontStyle: 'italic', paddingRight: '5px' }}>
                      {' '}
                      {productTitle}{' '}
                    </span>
                    <MoreInfo
                      onClick={() => {
                        setFlowState(2)
                      }}
                    >
                      {'MORE INFO >'}
                    </MoreInfo>
                  </h1>
                  <br></br>
                  {formStatus !== 'loading' && formStatus !== 'success' && (
                    <div className="mb-4">
                      <p className="mb-2">
                        You'll be notified within 48 hours if your offer is
                        accepted.
                      </p>
                      <p className="mb-2">
                        You'll have 36 hours to complete payment - where you'll
                        provide billing and shipping information.
                      </p>
                      <p className="mb-2">
                        If your offer is not accepted you'll have the ability to
                        make additional offers.
                      </p>
                    </div>
                  )}
                  <OfferForm
                    makeAnOfferSubmitInfo={makeAnOfferSubmitInfo}
                    legalCopy={legalCopy}
                    flowState={[flowState, setFlowState]}
                    amount={[amount, setAmount]}
                    name={[name, setName]}
                    email={[email, setEmail]}
                    phoneNumber={[phoneNumber, setPhone]}
                    error={[error, setError]}
                    formStatus={[formStatus, setFormStatus]}
                  />
                </>
              )}
              {flowState === 2 && (
                <>
                  <br></br>
                  <h1 className="mt-4 mb-4">
                    <span style={{ paddingRight: '5px', fontWeight: 'bold' }}>
                      MAKE AN OFFER INFORMATION
                    </span>
                  </h1>
                  <br></br>
                  <div
                    className="mt-4"
                    dangerouslySetInnerHTML={{ __html: makeAnOfferInfo }}
                  />
                </>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </StyledWindow>
      <button
        id="buy-button"
        className={` hover-button-light w-full ${
          flowState === 0 && 'active'
        } flex flex-col justify-center items-center`}
        onClick={handleButtonClick}
      >
        <span>MAKE OFFER</span>
      </button>
      <div
        className="h-1 button-bottom transition-all"
        style={{
          background: '#FFC391',
          width: `calc(${33.333 * flowState}% - 2rem)`,
          transition: '0.6s all',
          position: 'absolute',
          right: '2rem',
        }}
      ></div>
    </div>
  )
}
export default MakeAnOffer
