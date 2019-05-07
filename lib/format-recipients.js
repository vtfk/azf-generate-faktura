const getSchool = require('tfk-schools-info')

module.exports = person => {
  const school = getSchool({shortName: person.school})[0]
  return person.guardians.map(guardian => ({
    id: person.personalId,
    name: guardian.fullname,
    address1: guardian.address.address,
    addresse2: '',
    zip: guardian.address.zip,
    city: guardian.address.city,
    mobile: guardian.mobile.number,
    email: guardian.email.address,
    notes2: `${person.fullname} - ${school.officialName} - ${school.phoneNumber}`
  }))
};
