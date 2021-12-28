export const fixVersionsByPackageLock = (rawPackages, packageLock) => {
  return rawPackages.map((rawPackage) => {
    const { name, rawVersion, dependencyType } = rawPackage
    const key = `${name}`

    let packageLockVersion = rawVersion.replace(/[^\d.]/g, '')

    try {
      packageLockVersion = packageLock[key].version
    } catch (error) {
      // nothing to do
    }

    return {
      name,
      version: packageLockVersion,
      dependencyType
    }
  })
}

export const fixVersionsByYarnLock = (rawPackages, yarnLock) => {
  return rawPackages.map((rawPackage) => {
    const { name, rawVersion, dependencyType } = rawPackage
    const key = `${name}@${rawVersion}`

    let yarnLockVersion = rawVersion.replace(/[^\d.]/g, '')

    try {
      yarnLockVersion = yarnLock[key].version
    } catch (error) {
      // nothing to do
    }

    return {
      name,
      version: yarnLockVersion,
      dependencyType
    }
  })
}

export const fixVersions = (rawPackages) => {
  return rawPackages.map((rawPackage) => {

    return {
      name: rawPackage.name,
      version: rawPackage.rawVersion.replace(/[^\d.]/g, ''),
      dependencyType: rawPackage.dependencyType
    }
  })
}

export const fixProjectId = (packages, projectId) => {
  return packages.map((currentPackage) => ({
    ...currentPackage,
    projectId
  }))
}
