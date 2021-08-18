import React, { VFC } from 'react'
import { CancelButton } from 'src/components/Buttons/CtaButton'
import { useCancelModalStore } from 'src/stores'
import styled from 'styled-components'
import { Modal } from '.'
import { DonationInputPanel } from '../Input/DonationInputPanel'
import { Heading, SubHeading } from './common'

export const CancelModal: VFC<{ cancelableAmount: number }> = ({
  cancelableAmount,
}) => {
  const { isOpen, close } = useCancelModalStore()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={close}>
        <Layout>
          <Heading>Cancel</Heading>
          <SubHeading>Amount to be returned</SubHeading>
          <DonationInputPanel amount={cancelableAmount} />
          <CancelButton />
        </Layout>
      </Modal>
    </>
  )
}

const Layout = styled.div`
  ${Heading} {
    margin-bottom: 16px;
  }
  ${SubHeading}, > div, button:not(:last-child) {
    margin-bottom: 24px;
  }
`