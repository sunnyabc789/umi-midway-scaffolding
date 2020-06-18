/*
* 异或base64加密
* xjandwqz
* 2017-09-16
*/
const sn = 'sugo_tindex_des_cipher_jdbc_20170914'
const xorUtils = {
  encrypt(str: string) {
    const snNum = []
    let result = ''
    let temp = ''
    let hash = 0
    for (let i = 0; i < sn.length; i++) {
      hash += sn.charCodeAt(i)
    }
    hash = hash % 128
    for (let i = 0; i < str.length; i++) {
      // tslint:disable-next-line:no-bitwise
      snNum.push((str.charCodeAt(i)) ^ hash)
    }
    for (const v of snNum) {
      if (v < 10) {
        temp = '00' + v
      } else {
        if (v < 100) {
          temp = '0' + v
        } else {
          temp = v + ''
        }
      }
      result += temp
    }
    const buf = new Buffer(result)
    return buf.toString('base64')
  },
  decrypt(str: string) {
    const buf = new Buffer(str, 'base64')
    str = buf.toString()
    let hash = 0
    for (let i = 0; i < sn.length; i++) {
      hash += sn.charCodeAt(i)
    }
    hash = hash % 128
    const snNum = []
    for (let i = 0; i < str.length / 3; i++) {
      const n = parseInt(str.substring(i * 3, i * 3 + 3), 10)
      // tslint:disable-next-line:no-bitwise
      snNum[i] = (n ^ hash)
    }
    return String.fromCharCode(...snNum)
  }
}
export default xorUtils
