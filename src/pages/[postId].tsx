import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import { publicApiClient } from 'src/api/client'
import { Post, PostProps } from 'src/compositions/Post'
import { isProd } from 'src/utils/env'
import { isString } from 'src/utils/typeguard'
import {
  GetPostContentDocument,
  GetPostContentQuery,
  GetPostContentQueryVariables,
} from 'src/__generated__/graphql'

type PostPageContext = {
  postId: string
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})

export const getStaticProps: GetStaticProps<PostPageContext> = async ({
  params = {},
}) => {
  if (!isString(params.postId))
    return {
      notFound: true,
    }
  const client = publicApiClient()
  if (!client)
    return {
      notFound: true,
    }

  const { data, error } = await client
    .query<GetPostContentQuery, GetPostContentQueryVariables>(
      GetPostContentDocument,
      { id: params.postId },
    )
    .toPromise()

  if (error || !data?.postContent)
    return {
      notFound: true,
    }

  const props: PostProps = {
    id: params.postId,
    title: data?.postContent.title,
    keyVisual: data?.postContent.imageUrl,
    description: data?.postContent.description,
  }

  const result = {
    props,
    revalidate: isProd ? undefined : 1,
  }
  return JSON.parse(JSON.stringify(result))
}

const PostPage: NextPage<PostProps> = (props) => (
  <Post {...props} pageTitle={props.title} image={props.keyVisual} />
)

export default PostPage
