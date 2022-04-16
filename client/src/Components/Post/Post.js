import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from '../Layouts/Spinner'
import { getPost } from '../../Actions/post'
import { Link, useParams } from 'react-router-dom'
import PostItem from '../Posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading } }) => {
  const params = useParams()

  useEffect(() => {
    getPost(params.id)
  }, [getPost, params.id])

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to={'/posts'} className='btn'>
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  post: state.postReducer
})

export default connect(mapStateToProps, { getPost })(Post)
