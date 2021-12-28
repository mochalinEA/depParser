import axios from 'axios'
const GITLAB_API_URL = process.env.GITLAB_API_URL || ''
const GITLAB_API_TOKEN = process.env.GITLAB_API_TOKEN || ''

export const fetchData = async (projectId, path) => {
  const filePath = path !== ''
    ? path.replace(/\//g, '%2F') + '%2F'
    : ''

  const response = await axios({
    url: `${GITLAB_API_URL}/${projectId}/repository/files/${filePath}?ref=master`,
    method: 'get',
    headers: {
      'private-token': GITLAB_API_TOKEN
    }
  })

  const base64Content = response.data.content

  return Buffer.from(base64Content, 'base64').toString()
}
