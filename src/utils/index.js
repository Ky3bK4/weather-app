// Search time in string (e.g. 01:00)
export const formatTime = (str) => {
  return str.match(/\d+:\d+/)[0]
}

export const getClassNameForIcon = (code) => {
  switch (code) {
    case 1000:
      return 'sun'
    case 1003:
      return 'cloudy1'
    case 1006:
      return 'cloud'
    case 1009:
      return 'cloudy'
    case 1030:
    case 1135:
    case 1147:
      return 'lines'
    case 1063:
    case 1150:
    case 1153:
    case 1180:
    case 1183:
      return 'rainy1'
    case 1189:
    case 1192:
    case 1195:
    case 1246:
    case 1273:
    case 1276:
      return 'rainy'
    case 1069:
    case 1072:
    case 1204:
    case 1210:
    case 1213:
    case 1279:
      return 'snowy1'
    case 1066:
    case 1114:
    case 1117:
    case 1207:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
    case 1255:
    case 1258:
    case 1282:
      return 'snowy'
    default:
      return 'cloudy1'
  }
}

