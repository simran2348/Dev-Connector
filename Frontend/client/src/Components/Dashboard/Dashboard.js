/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../Actions/profile'
import { Spinner } from '../Layouts/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { DashboardActions } from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { deleteAccount } from '../../Actions/profile'

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  deleteAccount
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
          <Experience experience={profile.experiences} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fas-user-minus' /> Delete my Account
            </button>
          </div>
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
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state?.authReducer,
  isAuthLoading: state?.authReducer?.loading,
  profile: state?.profileReducer
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
)
