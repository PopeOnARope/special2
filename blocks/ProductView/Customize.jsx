import React from 'react'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'

const flow = [
  {
    display: 'none',
    image: '',
    title: '',
    subTitle: '',
    description: '',
    subDescription: '',
  },
  {
    display: 'inherit',
    image:
      'https://cdn.builder.io/api/v1/image/assets%2Fd58e15993bf84115968f2dd035ee71a4%2F3ea6b7ee3c1c412fac591d4f15d90c9a',
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
      'https://cdn.builder.io/api/v1/image/assets%2Fd58e15993bf84115968f2dd035ee71a4%2Ffe9f789336994bd8aaf103f0fc99321b',
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
}) => {
  const [flowState, setFlowState] = React.useState(0)
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  console.log({ leftArmText, rightArmText })

  function onTextChange(e) {
    if (flowState === 1) {
      setRightArmText(e.target.value)
    }
    if (flowState === 2) {
      setLeftArmText(e.target.value)
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
          <span>Customize and Buy</span>
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
    <div>
      <div
        className="customization-window absolute bg-black mr-2 py-4 px-6 text-white"
        style={{
          display: flow[flowState].display,
          height: `32rem`,
          opacity: flow[flowState].display === 'none' ? 0 : 1,
          transition: '0.3s all',
          marginTop: '-33rem',
          width: `${width}px`,
        }}
      >
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
        <h1 className="text-white font-bold">{flow[flowState].title}</h1>

        {/*switchable content*/}
        {(flowState === 1 || flowState === 2) && (
          <>
            <div
              className={`image-wrapper h-96 w-full mb-2`}
              style={{ height: '300px' }}
            >
              <div
                className="text-container absolute text-center text-lg"
                style={{
                  width: '136px',
                  marginTop: '108px',
                  marginLeft: flowState === 1 ? '280px' : '124px',
                }}
              >
                {flowState === 2 ? leftArmText : rightArmText}
              </div>
              <img src={flow[flowState].image} />
            </div>
            <div>
              <h2>RIGHT ARM</h2>
              <p style={{ fontFamily: 'InputMono', fontSize: '0.8rem' }}>
                {flow[flowState].description}
              </p>
              <div className="flex justify-center p-8">
                <input
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
                className="px-8 py-4 pb-12 w-full"
                style={size === 'regular' ? { ...selectedSizeStyles } : {}}
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
                className="px-8 py-4 pb-12 w-full"
                style={size === 'wide' ? { ...selectedSizeStyles } : {}}
              >
                <h1 className="text-left text-xl font-bold ">Wide</h1>
                <p
                  className="text-left text-sm"
                  style={{ fontFamily: 'InputMono' }}
                >
                  For small and medium face sizes.{' '}
                </p>
              </button>
            </div>
            <p className="text-sm">{flow[flowState].subDescription}</p>
          </div>
        )}
      </div>
      <button
        id="buy-button"
        className=" w-full flex justify-between bg-black text-white p-4 type-wrapper"
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
