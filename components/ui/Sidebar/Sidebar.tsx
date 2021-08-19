/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Close, Themed } from 'theme-ui'
import { useResponsiveValue } from '@theme-ui/match-media'
import { FC } from 'react'
import { BaseModal, ModalCloseTarget } from 'react-spring-modal'

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
  zIndex=6
}) => {
  const width = useResponsiveValue(['100%', 500])
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
