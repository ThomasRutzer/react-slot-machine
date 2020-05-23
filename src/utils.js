function getRandomElementFromList(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function fillByWithRandomElement(count, randomElementCollection) {
  return Array.from(Array(count).keys()).reduce(
    acc => [...acc, getRandomElementFromList(randomElementCollection)],
    []
  )
}

export {
  fillByWithRandomElement,
  getRandomElementFromList
}
