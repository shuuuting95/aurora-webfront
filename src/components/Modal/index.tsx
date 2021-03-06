import React, { ReactNode, VFC } from 'react'
import { black, white } from 'src/styles/colors'
import { breakpoint, flexCenter } from 'src/styles/mixins'
import styled from 'styled-components'

type Props = {
  isOpen: boolean
  children: ReactNode
  closeModal?: () => void
  transparent?: boolean
}

export const Modal: VFC<Props> = ({
  isOpen,
  closeModal,
  transparent,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <Overlay onClick={closeModal}>
          <div onClick={(e) => e.stopPropagation()}>
            {transparent ? children : <Contents>{children}</Contents>}
          </div>
        </Overlay>
      )}
    </>
  )
}

const Overlay = styled.div`
  ${flexCenter}
  position: fixed;
  inset: 0;
  overflow: hidden;
  background-color: ${black}80;
  z-index: 1000;
`

const Contents = styled.div`
  max-width: 400px;
  max-height: 85vh;
  width: 50vw;
  padding: 40px 50px 48px 50px;
  position: relative;
  border-radius: 32px;
  background-color: ${white}80;
  backdrop-filter: blur(30px) brightness(150%);
  overflow-y: auto;

  @media ${breakpoint.l} {
    width: 80vw;
  }
  @media ${breakpoint.s} {
    width: 85vw;
    padding-right: 24px;
    padding-left: 24px;
  }
`
