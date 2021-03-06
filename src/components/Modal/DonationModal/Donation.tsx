import AsyncRetry from 'async-retry'
import { utils } from 'ethers'
import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react'
import { postClient } from 'src/api/postClient'
import { PrimaryButton } from 'src/components/Buttons/CtaButton'
import { STORAGE_HOST } from 'src/constants/misc'
import { useContract } from 'src/external/contract/hooks'
import {
  useDonationModalStore,
  useModelViewerModalStore,
  useWalletStore,
} from 'src/stores'
import { equals } from 'src/utils/address'
import styled from 'styled-components'
import { DonationModalProps } from '.'
import { DisclaimerCheckbox } from '../../Input/Checkbox'
import { DonationInputPanel } from '../../Input/DonationInputPanel'
import { Heading, SubHeading } from '../common'
import { useWithTxModalContext } from '../WithTxModal'

const MIMUM_AMOUNT = '0.01' // MATIC

export const Donation: VFC<DonationModalProps> = ({
  postId,
  totalDonation,
  refetch,
}) => {
  const { disableEscape, enableEscape } = useDonationModalStore()
  const { account } = useWalletStore()
  const { setLoading, close, onFail } = useWithTxModalContext()
  const { open: openModelViewerModal } = useModelViewerModalStore()

  const [isChecked, setIsChecked] = useState(false)
  const [inputValueMatic, setInputValueMatic] = useState('')
  const [balance, setBalance] = useState('')
  const [isInsufficient, setIsInsufficient] = useState(false)

  const canDonate = useMemo(() => {
    try {
      return (
        isChecked &&
        utils.parseEther(inputValueMatic).gte(utils.parseEther(MIMUM_AMOUNT)) &&
        !isInsufficient
      )
    } catch {
      return false
    }
  }, [isChecked, inputValueMatic, isInsufficient])

  const { donate } = useContract()
  const { currentSigner } = useWalletStore()

  useEffect(() => {
    const fetch = async () => {
      const balance = await currentSigner?.getBalance()
      if (balance) {
        const parsedBalance = utils.formatEther(balance)
        setBalance(parsedBalance)
      }
    }
    fetch()
  }, [currentSigner])

  const onUserInput = useCallback(
    (value: string) => {
      setInputValueMatic(value)
      setIsInsufficient(value > balance)
    },
    [setInputValueMatic, balance],
  )

  return (
    <>
      <Layout>
        <Heading>Donation</Heading>
        <SubHeading>{`Min: ${MIMUM_AMOUNT} MATIC`}</SubHeading>
        <DonationInputPanel value={inputValueMatic} onUserInput={onUserInput} />
        <DisclaimerCheckbox
          id="disclaimer-check"
          setIsChecked={setIsChecked}
          isChecked={isChecked}
        />
        <PrimaryButton
          label={isInsufficient ? 'Insufficient MATIC' : 'Donate'}
          disabled={!canDonate}
          onClick={async () => {
            setLoading(true)
            disableEscape()
            try {
              if (!account) {
                throw new Error('You must connect wallet.')
              }
              const res = await postClient.postReceipt({
                postId,
                address: account,
                amount: inputValueMatic,
              })
              await donate(postId, inputValueMatic, res.data.metadata)
              await AsyncRetry(async () => {
                const res = await refetch()
                if (
                  !res?.donations?.some((each) => equals(each.sender, account))
                )
                  throw new Error()
              })
              openModelViewerModal({
                src: `${STORAGE_HOST}/${res.data.image}`,
                alt: 'NFT Card',
                onLoad: () => {
                  close()
                  setLoading(false)
                },
              })
            } catch (error: any) {
              onFail(error)
              console.error(error)
              return
            } finally {
              enableEscape()
            }
          }}
        />
      </Layout>
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
