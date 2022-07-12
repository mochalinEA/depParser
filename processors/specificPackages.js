export const processSpecificPackages = (results, projectsByName, regExp) => {
  const allProjectNames = Object.keys(projectsByName)
  const allProjects = allProjectNames.reduce((acc, name) => {
    acc[name] = {}
    return acc
  }, {})

  results.forEach((record) => {
    if (!regExp.test(record.name)) {
      return
    }

    if (allProjects[record.projectName] === undefined) {
      allProjects[record.projectName] = {}
    }

    allProjects[record.projectName][record.name] = record.version
  })

  return allProjects
}
