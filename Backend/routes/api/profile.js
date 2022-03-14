const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const request = require('request')
const config = require('config')
const { check, validationResult } = require('express-validator')

const Profile = require('../../modals/Profile')
const User = require('../../modals/User')

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    )

    if (!profile) {
      return res.status(400).json({ msg: 'There is no Profile for this user' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    Post api/profile
//@desc     Create or update user Profile
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is Required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() })
    }
    const {
      company,
      website,
      location,
      status,
      bio,
      githubUserName,
      skills,
      youtube,
      twitter,
      facebook,
      linkdin,
      instagram
    } = req.body

    //Build profile object

    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (status) profileFields.status = status
    if (bio) profileFields.bio = bio
    if (githubUserName) profileFields.githubUserName = githubUserName
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim())
    }

    //Build Social object
    profileFields.socials = {}
    if (youtube) profileFields.socials.youtube = youtube
    if (twitter) profileFields.socials.twitter = twitter
    if (facebook) profileFields.socials.facebook = facebook
    if (linkdin) profileFields.socials.linkdin = linkdin
    if (instagram) profileFields.socials.instagram = instagram

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      if (profile) {
        //Update user profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }

      //Create user profile
      profile = new Profile(profileFields)
      await profile.save()

      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route    GET api/profile
//@desc     Get all Profiles
//@access   public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'Profile does not Exists' })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile does not Exists' })
    }
    res.status(500).send('Server Error')
  }
})

//@route    DELETE api/profile
//@desc     Delete profile, user and posts
//@access   public
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'User Deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    PUT api/profile/experience
//@desc     add profile experience
//@access   private
router.put(
  '/experiences',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From Date is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, company, location, from, to, current, description } =
      req.body

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })

      profile.experiences.unshift(newExp)

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route    Delete api/profile/experience/:exp_id
//@desc     Delete profile experience
//@access   private
router.delete('/experiences/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    //Get remove index
    const removeIndex = profile.experiences
      .map((item) => item.id)
      .indexOf(req.params.exp_id)

    profile.experiences.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    PUT api/profile/education
//@desc     add profile education
//@access   private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldOfStudy', 'Field of Study is required').not().isEmpty(),
      check('from', 'From Date is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { school, degree, fieldOfStudy, from, to, current, description } =
      req.body

    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })

      profile.education.unshift(newEdu)

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route    Delete api/profile/education/:edu_id
//@desc     Delete profile education
//@access   private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    //Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id)

    profile.education.splice(removeIndex, 1)

    await profile.save()

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    GET api/profile/github/:username
//@desc     Get user repos from github
//@access   public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    }

    request(options, (error, response, body) => {
      if (error) console.log(error)
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' })
      }
      res.json(JSON.parse(body))
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
