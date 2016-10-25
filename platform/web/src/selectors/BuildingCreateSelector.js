
import {createSelector} from 'reselect'

const getRepos = (state) => state.repos

const getGithubAuthURL = (state) => state.githubAuthURL;

const makeGetReposSelector = () => {
  return createSelector(
    [getRepos],
    (repos) => {
      return repos
    }
  )
}

export const makeGetGithubAuthURLSelector = () => {
  return createSelector(
    [getGithubAuthURL],
    (url) => {
      return url;
    }
  )
}

export default makeGetReposSelector
