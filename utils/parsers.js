import {parse} from './yarn.cjs'

const dependencyTypes = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
  'bundledDependencies'
]

export const parsePackageJson = (rawJson) => {
  const parsedJson = JSON.parse(rawJson)
  const packages = []

  dependencyTypes.forEach((dependencyType) => {
    const dependencies = parsedJson[dependencyType] || {}

    Object.entries(dependencies).forEach(([name, rawVersion]) => {
      const version = rawVersion.replace(/[^\d.]/g, '')
      packages.push({name, version, dependencyType})
    })
  });

  return packages
}

export const parsePackageLockJson = (rawJson) => {
  const parsedJson = JSON.parse(rawJson)

  return dependencyTypes.reduce((acc, dependencyType) => {
    const currentBranch = parsedJson[dependencyType] || {}
    Object.assign(acc, currentBranch)

    return acc
  }, {})
}

export const parseYarnLock = (yarnLockText) => {
  return parse(yarnLockText).object
}
