import { projects } from './projects.js'
import {fetchProjectData} from './utils/fetchers.js'

async function getAllData(projects) {
  const rawResults = await Promise.allSettled(projects.map(
    (projectConfig) => fetchProjectData(projectConfig))
  )

  return rawResults
    .filter((result) => result.status === 'fulfilled')
    .reduce((acc, item) => {
      return acc.concat(item.value)
    }, [])
}

getAllData(projects)
  .then((result) => {
    // console.log('res:', result);
    console.log('res:', result.length);
  })
