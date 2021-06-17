export default ({ app }, inject) => {
  inject('capitalize', (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  })
  inject('isPDF', (src) => {
    return ['pdf'].includes(src.substr(src.lastIndexOf('.') + 1))
  })
  inject('isImage', (src) => {
    return ['bmp', 'png', 'jpeg', 'jpg', 'gif'].includes(src.substr(src.lastIndexOf('.') + 1))
  })
  inject('checkIdCard', (val) => {
    if (!val) { return false }
    const idc = val.replaceAll('-', '')
    if (idc.length < 13) {
      return false
    }
    let sum = 0
    for (let index = 0; index < idc.length - 1; index++) {
      sum += parseInt(idc.charAt(index)) * (idc.length - index)
    }
    return (11 - (sum % 11)) % 10 === parseInt(idc.charAt(idc.length - 1))
  })
  inject('age', (dob) => {
    return app.$dayjs().diff(dob, 'years')
  })
  inject('currencyText', (num, digitOptions = {}) => {
    return new Intl.NumberFormat(app.$lang.getIso(), digitOptions).format(num)
  })
  inject('idCardText', (idCard) => {
    return app.$checkIdCard(idCard) ? idCard.substr(0, 1) + '-' + idCard.substr(1, 4) + '-' + idCard.substr(5, 5) + '-' + idCard.substr(10, 2) + '-' + idCard.substr(12, 1) : idCard
  })
  inject('dateText', (date = null, dateStyle = null, timeStyle = null) => {
    const dateTimeFormat = {
      th: {
        merge: '',
        date: {
          short: 'D/M/BB',
          medium: 'D MMM BBBB',
          long: 'D MMMM BBBB',
          full: 'วันddddที่ D MMMM พ.ศ. BBBB'
        },
        time: {
          short: 'H:mm',
          medium: 'HH.mm น.',
          long: 'HH:mm:ss',
          full: 'HH นาฬิกา mm นาที ss วินาที'
        }
      },
      en: {
        merge: 'at',
        date: {
          short: 'M/D/YY',
          medium: 'MMM D, YYYY',
          long: 'MMMM D, YYYY',
          full: 'dddd, MMMM D, YYYY'
        },
        time: {
          short: 'h:mm A',
          medium: 'hh:mm A',
          long: 'hh:mm:ss A',
          full: 'hh:mm:ss A'
        }
      }
    }
    if (date) {
      return app.$dayjs(date).locale('th').format(dateTimeFormat.th.date[(dateStyle || 'medium')]) + (timeStyle ? ` ${dateTimeFormat.th.merge} ${app.$dayjs(date).locale('th').format(dateTimeFormat.th.time[timeStyle])}` : '')
    } else {
      return app.$dayjs().locale('th').format(dateTimeFormat.th.date[(dateStyle || 'medium')]) + (timeStyle ? ` ${dateTimeFormat.th.merge} ${app.$dayjs().locale('th').format(dateTimeFormat.th.time[timeStyle])}` : '')
    }
  })
  inject('objToArr', (object) => {
    return Object.keys(object).map((key) => {
      const obj = {
        value: key,
        text: app.i18n.t(object[key])
      }
      return obj
    })
  })
  inject('objGetKey', (object, value) => {
    return Object.keys(object).find(key => object[key] === value)
  })
  inject('randomColor', (tone = 'all') => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        if (tone === 'dark') {
          color += letters[2 + Math.floor(Math.random() * 4)]
        } else if (tone === 'light') {
          color += letters[10 + Math.floor(Math.random() * 4)]
        } else {
          color += letters[Math.floor(Math.random() * 16)]
        }
      } else {
        color += letters[Math.floor(Math.random() * 16)]
      }
    }
    return color
  })
  inject('componentToHex', (c) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  })
  inject('rgbToHex', (r, g, b) => {
    return '#' + app.$componentToHex(r) + app.$componentToHex(g) + app.$componentToHex(b)
  })
  inject('hexToRgb', (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null
  })
  inject('rgbToHistogram', (r, g, b) => {
    return Math.floor((r + g + b) / 3)
  })
  inject('hexToHistogram', (hex) => {
    const rgb = app.$hexToRgb(hex)
    return rgb ? Math.floor((rgb.r + rgb.g + rgb.b) / 3) : null
  })
  inject('rgbIsDark', (r, g, b) => {
    const histogram = app.$rgbToHistogram(r, g, b)
    return histogram < 128
  })
  inject('hexIsDark', (hex) => {
    const histogram = app.$hexToHistogram(hex)
    return histogram < 128
  })
  inject('rgbIsLight', (r, g, b) => {
    return !app.$rgbIsDark(r, g, b)
  })
  inject('hexIsLight', (hex) => {
    return !app.$hexIsDark(hex)
  })
  inject('charSwitch', (str) => {
    const charFrom = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'ๅ', '/', '-', 'ภ', 'ถ', 'ุ', 'ึ', 'ค', 'ต', 'จ', 'ข', 'ช', 'ๆ', 'ไ', 'ำ', 'พ', 'ะ', 'ั', 'ี', 'ร', 'น', 'ย', 'บ', 'ล', 'ฃ', 'ฟ', 'ห', 'ก', 'ด', 'เ', '้', '่', 'า', 'ส', 'ว', 'ง', 'ผ', 'ป', 'แ', 'อ', 'ิ', 'ื', 'ท', 'ม', 'ใ', 'ฝ', '+', '๑', '๒', '๓', '๔', 'ู', '฿', '๕', '๖', '๗', '๘', '๙', '๐', '"', 'ฎ', 'ฑ', 'ธ', 'ํ', '๊', 'ณ', 'ฯ', 'ญ', 'ฐ', ',', 'ฅ', 'ฤ', 'ฆ', 'ฏ', 'โ', 'ฌ', '็', '๋', 'ษ', 'ศ', 'ซ', '.', '(', ')', 'ฉ', 'ฮ', 'ฺ', '์', '?', 'ฒ', 'ฬ', 'ฦ']
    const charTo = ['ๅ', '/', '-', 'ภ', 'ถ', 'ุ', 'ึ', 'ค', 'ต', 'จ', 'ข', 'ช', 'ๆ', 'ไ', 'ำ', 'พ', 'ะ', 'ั', 'ี', 'ร', 'น', 'ย', 'บ', 'ล', 'ฃ', 'ฟ', 'ห', 'ก', 'ด', 'เ', '้', '่', 'า', 'ส', 'ว', 'ง', 'ผ', 'ป', 'แ', 'อ', 'ิ', 'ื', 'ท', 'ม', 'ใ', 'ฝ', '+', '๑', '๒', '๓', '๔', 'ู', '฿', '๕', '๖', '๗', '๘', '๙', '๐', '"', 'ฎ', 'ฑ', 'ธ', 'ํ', '๊', 'ณ', 'ฯ', 'ญ', 'ฐ', ',', 'ฅ', 'ฤ', 'ฆ', 'ฏ', 'โ', 'ฌ', '็', '๋', 'ษ', 'ศ', 'ซ', '.', '(', ')', 'ฉ', 'ฮ', 'ฺ', '์', '?', 'ฒ', 'ฬ', 'ฦ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?']
    let newStr = ''
    for (let i = 0; i < str.length; i++) {
      const char = str.charAt(i)
      if (char !== ' ') {
        const indexFrom = charFrom.indexOf(char)
        if (indexFrom !== -1) {
          newStr += charTo[indexFrom]
        }
      } else {
        newStr += ' '
      }
    }
    return newStr
  })
}
