const getSchool = require('tfk-schools-info')
const shortenName = require('../lib/shorten-name')

module.exports = person => {
  const school = getSchool({shortName: person.school})[0]
  return person.guardians.map(guardian => ({
    id: person.personalId,
    name: shortenName(guardian.fullname),
    address1: guardian.address.address,
    address2: '',
    zip: guardian.address.zip,
    city: guardian.address.city,
    mobile: guardian.mobile.number,
    email: guardian.email.address,
    notes2: `${shortenName(person.fullname)} - ${school.officialName} - ${school.phoneNumber}`
  }))
};
