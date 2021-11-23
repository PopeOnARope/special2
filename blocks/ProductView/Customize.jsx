import React from 'react'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import styled from 'styled-components'
import {
  CSSTransition,
  SwitchTransition,
  Transition,
} from 'react-transition-group'

const CustomizationWindow = styled.div`
  //display: ${(props) => props.display};
  opacity: ${(props) => (!props.flowState ? '0' : '1')};
  color: white;
  margin-right: 0.5rem;
  padding: 1rem 1.5rem;
  background: black;
  height: ${(props) => (!props.flowState ? '0rem' : '21rem')};
  position: absolute;
  margin-top: -22rem;

  @media (max-width: 640px) {
    height: 25rem;
    margin-top: -26rem;
  }
  transition: ${(props) =>
    !props.flowState ? '0.8s height, 1s opacity' : '0.8s height, 0.2s opacity'};
  width: ${(props) => props.width}px;
`

const flow = [
  {
    display: 'none',
    image:
      'https://cdn.builder.io/api/v1/image/assets%2Fd58e15993bf84115968f2dd035ee71a4%2Ff79d3114dd96453f95fc6a0b7b949a4c',
    title: 'CUSTOMIZE',
    subTitle: 'RIGHT ARM',
    description:
      'Customize the right arm. It can be anything: your name, nickname, a\n' +
      "          phrase, handle, partner's name, etc.",
    subDescription: '',
  },
  {
    display: 'inherit',
    image:
      'https://cdn.builder.io/api/v1/image/assets%2Fd58e15993bf84115968f2dd035ee71a4%2Ff79d3114dd96453f95fc6a0b7b949a4c',
    title: 'CUSTOMIZE',
    subTitle: 'RIGHT ARM',
    description:
      'Customize the right arm. It can be anything: your name, nickname, a\n' +
      "          phrase, handle, partner's name, etc.",
    subDescription: '',
  },
  {
    display: 'inherit',
    image:
      'https://cdn.builder.io/api/v1/image/assets%2Fd58e15993bf84115968f2dd035ee71a4%2F564869613efb439eaf7c5d39b17ae046',
    title: 'CUSTOMIZE',
    subTitle: 'LEFT ARM',
    description:
      'Customize the left arm. It can be anything: your name, nickname, a\n' +
      "          phrase, handle, partner's name, etc.",
    subDescription:
      'For a more even / clean look use the same word / name as the right arm.',
  },
  {
    display: 'inherit',
    image: '',
    title: 'SELECT A FRAME SIZE',
    subTitle: '',
    description: '',
    subDescription:
      'Choosing a size: If most glasses fit or run big, get the Regular size. If most sunglasses run small or slightly small, go with Wide.',
  },
]

function formatText(txt) {
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  const lastChar = txt[txt.length - 1]
  if (lastChar === ' ' || format.test(lastChar)) {
    return capitalize(txt.substring(0, txt.length - 1))
  } else return capitalize(txt)
}

const selectedSizeStyles = {
  boxShadow: '-7px 7px 0px 0px #915800',
  background: 'rgb(157, 126, 44)',
}

const Customize = ({
  variant,
  addToCart,
  setLeftArmText,
  setRightArmText,
  setSize,
  leftArmText,
  rightArmText,
  size,
  screenWidth,
}) => {
  const [flowState, setFlowState] = React.useState(0)
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  // const input = React.useRef()
  // console.log({ input })
  // React.useEffect(() => {
  //   input?.current?.focus()
  // })
  console.log({ leftArmText, rightArmText })

  function onTextChange(e) {
    const value = formatText(e.target.value)
    if (flowState === 1) {
      setRightArmText(value)
    }
    if (flowState === 2) {
      setLeftArmText(value)
    }
  }

  React.useEffect(() => {
    setWidth(document.getElementById('buy-button').clientWidth)
    setHeight(window.innerHeight)
    console.log(window.innerHeight)
  })
  function handleButtonClick() {
    if (flowState < 3) {
      setFlowState(flowState + 1)
    } else {
      addToCart()
      setFlowState(0)
    }
  }

  function getButtonContent() {
    if (flowState === 0) {
      return (
        <>
          <span>Customize and Pre-order</span>
          <span>
            {getPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
          </span>
        </>
      )
    } else if (flowState < 3) {
      return (
        <>
          <span>Next</span>
          <span>{flowState} of 3</span>
        </>
      )
    } else {
      return (
        <>
          <span>Finish and Checkout</span>
          <span> {flowState} of 3</span>
        </>
      )
    }
  }

  return (
    <div style={{ zIndex: flowState ? 1 : 100}}>
      {flow.map((step) => (
        <img src={step.image} style={{ display: 'none' }} />
      ))}
      <CustomizationWindow
        display={flow[flowState].display}
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
            &lt;
          </button>
        )}
        <button
          onClick={() => {
            setLeftArmText('')
            setRightArmText('')
            setFlowState(0)
          }}
          className="absolute px-4"
          style={{ right: 0, marginTop: '-0.5rem' }}
        >
          X
        </button>
        <h1 className="text-white font-bold text-center">
          {flow[flowState].title}
        </h1>

        {/*switchable content*/}
        <SwitchTransition>
          <CSSTransition classNames="in-out" timeout={200} key={flowState}>
            <div>
              {(flowState === 1 || flowState === 2) && (
                <>
                  <div className={`px-4 md:p-0 image-wrapper w-full mb-2`}>
                    <div
                      className="text-container absolute text-center text-xl md:text-2xl bpw shine"
                      style={{
                        width: '136px',
                        marginTop: screenWidth > 768 ? '0.5rem' : '0.5rem',
                        marginLeft:
                          flowState === 1
                            ? screenWidth > 768
                              ? '16.1rem'
                              : '11rem'
                            : screenWidth > 768
                            ? '7rem'
                            : '3.4375rem',
                      }}
                    >
                      <span style={{}}>
                        {flowState === 2 ? leftArmText : rightArmText}
                      </span>
                    </div>
                    <img src={flow[flowState].image} layout="intrinsic" />
                    <p className="text-3xs text-center im">
                      The rendering above is a mockup and the final product
                      might look different
                    </p>
                  </div>
                  <div>
                    <h2>{flow[flowState].subTitle}</h2>
                    <p style={{ fontFamily: 'InputMono', fontSize: '0.8rem' }}>
                      {flow[flowState].description}
                    </p>
                    <div className="flex justify-center flex-col items-center p-8">
                      <input
                        autoFocus
                        placeholder="9 characters"
                        onChange={onTextChange}
                        value={flowState === 2 ? leftArmText : rightArmText}
                        maxLength={9}
                        style={{
                          height: '2.5rem',
                          width: '12rem',
                          padding: '0.25rem',
                          fontFamily: 'InputMono',
                          color: 'black',
                        }}
                      />
                      <p className="text-3xs text-center mt-4 im">
                        Due to the custom nature of this product, we do not
                        offer returns. In certain circumstances, we can offer
                        store credit.
                      </p>
                    </div>
                  </div>
                </>
              )}
              {flowState === 3 && (
                <div className="flex flex-col justify-between h-full pb-8">
                  <div className="buttons-wrapper p-2 py-8 pr-8">
                    <button
                      onClick={() => {
                        setSize('regular')
                      }}
                      className="px-8 py-2 pb-4 w-full"
                      style={
                        size === 'regular' ? { ...selectedSizeStyles } : {}
                      }
                    >
                      <h1 className="text-left text-xl font-bold ">Regular</h1>
                      <p
                        className="text-left text-sm"
                        style={{ fontFamily: 'InputMono' }}
                      >
                        For small and medium face sizes.{' '}
                      </p>
                    </button>
                    <button
                      onClick={() => {
                        setSize('wide')
                      }}
                      className="px-8 py-2 pb-4 w-full"
                      style={size === 'wide' ? { ...selectedSizeStyles } : {}}
                    >
                      <h1 className="text-left text-xl font-bold ">Wide</h1>
                      <p
                        className="text-left text-sm"
                        style={{ fontFamily: 'InputMono' }}
                      >
                        For large and extralarge face sizes.{' '}
                      </p>
                    </button>
                  </div>
                  <p className="text-xs im">{flow[flowState].subDescription}</p>
                </div>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </CustomizationWindow>
      <button
        id="buy-button"
        className={`hover-button w-full ${flowState === 0 && 'active'}`}
        onClick={handleButtonClick}
      >
        {getButtonContent()}
      </button>
      <div
        className="h-1 button-bottom transition-all"
        style={{
          background: '#FFC391',
          width: `${33.333 * flowState}%`,
          transition: '0.6s all',
        }}
      ></div>
    </div>
  )
}
export default Customize
