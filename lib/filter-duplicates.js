module.exports = (persons) => {
  let ids = []
  const filteredPersons = persons.filter(person => {
    const personId = person.personNr
    if (!personId) throw Error('One object did not include "personNr"')
    if(!ids.includes(personId)) {
      ids.push(personId)
      return true
    }
  })
  return filteredPersons
}