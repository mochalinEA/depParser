import {fetchData} from './gitlabFetcher.js'
import {parsePackageJson, parsePackageLockJson, parseYarnLock} from './parsers.js'
import {fixProjectId, fixVersions, fixVersionsByPackageLock, fixVersionsByYarnLock} from './fixers.js'

const fetchRawPackages = async (projectConfig) => {
  try {
    const packageJson = await fetchData(projectConfig.id, projectConfig.packageJsonPath)
    console.log(`${projectConfig.name}: package.json found`);

    return parsePackageJson(packageJson)
  } catch (error) {
    console.log(`${projectConfig.name}: can't fetch package.json`, error);

    return []
  }
}

const fetchPackageLockJson = async (projectConfig) => {
  try {
    const packageLockJson = await fetchData(projectConfig.id, projectConfig.packageLockJsonPath)
    console.log(`${projectConfig.name}: package-lock.json found`);

    return parsePackageLockJson(packageLockJson)
  } catch (error) {
    console.log(`${projectConfig.name}: can't fetch package-lock.json`, error);

    return {}
  }
}

const fetchYarnLock = async (projectConfig) => {
  try {
    const rawYarnLock = await fetchData(projectConfig.id, projectConfig.yarnLockPath)
    console.log(`${projectConfig.name}: yarn.lock found`);

    return parseYarnLock(rawYarnLock)
  } catch (error) {
    console.log(`${projectConfig.name}: can't fetch yarn.lock`, error);

    return {}
  }
}

export const fetchProjectData = async (projectConfig) => {
  if (projectConfig.packageJsonPath === undefined) {
    return []
  }

  const rawPackages = await fetchRawPackages(projectConfig)

  const packagesWithProjectId = await fixProjectId(rawPackages, projectConfig.id)

  if (projectConfig.packageLockJsonPath !== undefined) {
    const packageLockJson = await fetchPackageLockJson(projectConfig)

    return fixVersionsByPackageLock(packagesWithProjectId, packageLockJson)
  }

  if (projectConfig.yarnLockPath !== undefined) {
    const yarnLock = await fetchYarnLock(projectConfig)

    return fixVersionsByYarnLock(packagesWithProjectId, yarnLock)
  }

  return fixVersions(packagesWithProjectId)
}
