export const processTop100NoVersion = (results, projectsByName) => {
  const entries = results.reduce((acc, result) => {
    const key = result.name;
    const project = projectsByName[result.projectName]

    if (acc[key] === undefined) {
      acc[key] = {
        weight: 0,
        projectNames: []
      }
    }

    acc[key].weight += project.weight
    acc[key].projectNames.push(project.name)

    return acc
  }, {})

  const sortedEntries = Object
    .entries(entries)
    .sort((a, b) => {
      return b[1].weight - a[1].weight
    })

  return sortedEntries.slice(0, 100)
}


const struct = {
  react: {
    weight: 100,
    projectNames: ['one', 'two']
  },
}
