import fs from 'fs'

export const createAllPackagesJSON = (results, projectsByName) => {
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

  fs.writeFile('allPackages.json', JSON.stringify(sortedEntries), err => {
    if (err) {
      console.error(err)
    }
  })
}


const struct = {
  react: {
    weight: 100,
    projectNames: ['one', 'two']
  },
}
