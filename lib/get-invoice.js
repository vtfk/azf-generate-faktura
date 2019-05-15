module.exports = (pcCode) => {
  const invoice = tempData.fakturaLinjer[pcCode]
  if (!invoice) { throw Error(`The PC-Code '${pcCode}' does not exist`) }
  return  invoice ? invoice : false
}

const tempData = {
  fakturaLinjer: {
    PC17: {
      partNumber: 103,
      amount: 1032,
      note: 'Leasing elev-PC skoleåret 2018-2019'
    },
    'PC17-KJØPx2': {
      partNumber: 105,
      amount: 2064,
      note: 'Kjøp av elev-PC'
    },
    PC17x: {
      partNumber: 104,
      amount: 2046,
      note: 'Leie av elev-PC skoleåret 2017-2019'
    },
    PC18: {
      partNumber: 103,
      amount: 1032,
      note: 'Leasing elev-PC skoleåret 2018-2019'
    }
  }
}
