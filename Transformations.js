const anArray = ['PTB_1', 'PTB_2', 'PTB_3', null, 'PTB_4']

const result = {
  PTB_1: 1,
  PTB_2: 2,
  PTB_3: 3,
  PTB_4: 4,
}

const simplerSolution = (array) => {
  const transformedArray = []
  array.forEach((item) => {
    if (item) {
      const value = item.split('_')[1]
      transformedArray.push([item, +value])
    }
  })
  return Object.fromEntries(transformedArray)
}

const prepareArrayForObject = (array) => {
  return array
    .filter((item) => !!item)
    .map((item) => {
      const value = item.split('_')[1]
      return [item, +value]
    })
}

const getResult = (array) => {
  //First solution
  const transformedArray = prepareArrayForObject(array)
  const transformedObject = Object.fromEntries(transformedArray)
  return transformedObject
  //Second solution
  //return simplerSolution(array)
}

console.log(getResult(anArray))
