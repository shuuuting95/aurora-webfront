import dayjs from 'dayjs'
import React, { VFC } from 'react'
import { usePostContent } from 'src/api/client'
import { INITIAL_POST } from 'src/api/initial'
import { SEOProps } from 'src/components/SEO'
import { Post, PostProps } from 'src/compositions/Post'
import { useWalletStore } from 'src/stores'
import { equals } from 'src/utils/address'

export type PostStaticProps = {
  seoProps?: SEOProps
  postStaticProps: Pick<
    PostProps['postProps'],
    'id' | 'keyVisual' | 'title' | 'description' | 'donee' | 'capacity'
  > & {
    endTime: number
  }
}
export const PostContainer: VFC<PostStaticProps> = ({
  postStaticProps,
  seoProps,
}) => {
  const { id } = postStaticProps
  const { account } = useWalletStore()
  const { data: result, refetch } = usePostContent(id)
  const data = result?.postContent || INITIAL_POST
  const totalDonation = data.donatedSum
  const donatedCount = data.donatedCount
  const ownDonation =
    (account &&
      data.donations?.find(({ sender }) => equals(sender, account))) ||
    undefined
  const endTime = dayjs.unix(data.endTime || postStaticProps.endTime)
  const hasClosed = dayjs().isAfter(endTime)
  const isDonee = equals(data.donee, account)
  return (
    <Post
      postProps={{
        ...postStaticProps,
        totalDonation,
        hasClosed,
        endTime,
        hasWithdrawn: data.withdrawn,
        donatedCount,
      }}
      isDonee={isDonee}
      ownDonation={ownDonation}
      seoProps={seoProps}
      hasNoDonations={!data.donations?.length}
      refetch={refetch}
    />
  )
}
