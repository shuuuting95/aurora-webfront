import React, { VFC } from 'react'
import { Image } from 'src/components/Image'
import { breakpoint, noGuide } from 'src/styles/mixins'
import styled from 'styled-components'
import { ActionSection } from './ActionSection'
import { DonationSection } from './DonationSection'
import { PostSection } from './PostSection'
import { PreviewSection } from './PreviewSection'

export type ContentsProps = {
  id: string
  keyVisual: string
  title: string
  description: string
  donee: string
  hasClosed: boolean
  totalDonation: string
  capacity: number
  donatedCount: number
  doneeCredit?: string
  hasWithdrawn?: boolean
}
export const Contents: VFC<
  ContentsProps & {
    isDonee?: boolean
    hasDonated?: boolean
    hasNoDonations?: boolean
  }
> = ({
  id,
  keyVisual,
  title,
  description,
  donee,
  totalDonation,
  capacity,
  donatedCount,
  doneeCredit,
  hasClosed,
  hasDonated,
  hasWithdrawn,
  isDonee,
  hasNoDonations,
}) => (
  <>
    <>
      {keyVisual ? (
        <ImageDiv>
          <Image src={keyVisual} alt="key visual" />
        </ImageDiv>
      ) : (
        <p>This project has already been closed.</p>
      )}
      <PostSection
        title={title}
        description={description}
        totalDonation={totalDonation}
      />
      {!hasClosed && <PreviewSection postId={id} />}
      <ActionSection
        postTitle={title}
        postId={id}
        isDonee={isDonee}
        hasClosed={hasClosed}
        hasDonated={hasDonated}
        hasWithdrawn={hasWithdrawn}
        hasNoDonations={hasNoDonations}
      />
      <DonationSection
        donee={donee}
        credit={doneeCredit}
        hasClosed={hasClosed}
        isDonee={isDonee}
        capacity={capacity}
        donatedCount={donatedCount}
      />
    </>
  </>
)

const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 66.7%;
  @media ${breakpoint.m} {
    ${noGuide}
    width: 100vw;
  }
`
