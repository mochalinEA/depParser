import {projects, projectsByName} from './projects.js'
import {fetchProjectData} from './utils/fetchers.js'
import {processTop} from './processors/top.js'
import {processSpecificPackages} from './processors/specificPackages.js'
import {createAllPackagesFile} from './processors/createAllPackagesFile.js'

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
    // получить top100 самых используемых пакетов
    const top10 = processTop(results, projectsByName)
    console.log('res:', top10);

    // найти все пакеты, использующие компоненты дизайн системы
    // const baseUI = processSpecificPackages(results, projectsByName, /^@base-ui/)
    // console.log('res:', baseUI);

    // создать файл со списком всех используемых в проектах зависимостей
    // createAllPackagesFile(results, projectsByName)
  })
