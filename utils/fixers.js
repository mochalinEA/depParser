export const fixVersionsByPackageLock = (draftPackages, packageLock) => {
  return draftPackages.map((rawPackage) => {
    let { version } = rawPackage

    try {
      version = packageLock[rawPackage.name].version
    } catch (error) {
      // nothing to do
    }

    return {
      ...rawPackage,
      version
    }
  })
}

export const fixVersionsByYarnLock = (draftPackages, yarnLock) => {
  return draftPackages.map((rawPackage) => {
    let { version } = rawPackage

    try {
      const key = `${rawPackage.name}@${version}`
      version = yarnLock[key].version
    } catch (error) {
      // nothing to do
    }

    return {
      ...rawPackage,
      version,
    }
  })
}

export const fixProjectName = (packages, projectConfig) => {
  return packages.map((currentPackage) => ({
    ...currentPackage,
    projectName: projectConfig.name
  }))
}
