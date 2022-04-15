import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepo } from '../../Actions/profile'
import { Spinner } from '../Layouts/Spinner'

const ProfileGithub = ({ username, getGithubRepo, repos }) => {
  useEffect(() => {
    getGithubRepo(username)
  }, [getGithubRepo, username])

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary p-1'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark p-1'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light p-1'>
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepo: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
  repos: state.profileReducer.repos
})

export default connect(mapStateToProps, { getGithubRepo })(ProfileGithub)
