/** @jsxRuntime classic */
/** @jsx jsx */
import { FC, useEffect, useState } from 'react'
import { jsx, Close, Themed } from 'theme-ui'
import { BaseModal, ModalCloseTarget } from 'react-spring-modal'
import { isMobile } from '../../../lib/isMobile'

interface Props {
  open: boolean
  onClose: () => void
  from: string
  zIndex: number
}

const Sidebar: FC<Props> = ({
  children,
  open = false,
  onClose,
  from = 'right',
  zIndex = 6,
}) => {
  const [_isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(isMobile())
  })

  return (
    <BaseModal
      isOpen={open}
      onDismiss={onClose}
      contentProps={{
        style: {
          width: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          overflow: _isMobile ? 'scroll' : 'inherit',
        },
      }}
      overlayProps={{
        style: { zIndex: zIndex || 100 },
      }}
      contentTransition={{
        from: {
          transform: `translateX(${from === 'right' ? '100%' : '-100%'})`,
        },
        enter: { transform: `translateX(0)` },
        leave: {
          transform: `translateX(${from === 'right' ? '100%' : '-100%'})`,
        },
      }}
    >
      {children}
    </BaseModal>
  )
}

export default Sidebar
