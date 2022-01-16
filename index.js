import {projects, projectsByName} from './projects.js'
import {fetchProjectData} from './utils/fetchers.js'
// import {processTop100NoVersion} from './processors/top100.js'
import {createAllPackagesJSON} from './processors/createAllPackagesJSON.js'

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
  .then((results) => {
    // const top100 = processTop100NoVersion(results, projectsByName)
    // console.log('res:', top100);

    createAllPackagesJSON(results, projectsByName)
  })
