/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../Actions/profile'
import { Spinner } from '../Layouts/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { DashboardActions } from './DashboardActions'

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' />
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet created a profile, please add some info</p>
          <Link className='btn btn-primary my-1' to={'/create-profile'}>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state?.authReducer,
  isAuthLoading: state?.authReducer?.loading,
  profile: state?.profileReducer
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
