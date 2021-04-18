export class EdgeService {
  constructor (xstep, ystep) {
    this.xstep = xstep
    this.ystep = ystep
  }

  static getDrawEdgeService (lineStyle, step) {
    switch (lineStyle) {
      case 'default':
        return new DefaultStyleService(step.x, step.y)
      case 'bessel':
        return new BesselStyleService(step.x, step.y)
      case 'line':
        return new LineStyleService(step.x, step.y)
      default:
        break
    }
  }

  // eslint-disable-next-line no-unused-vars
  drawEdge (start, end) {}

  drawVerticalEdge (start, end) {
    const radius = 14
    return `M ${start.x},${start.y + radius} L${start.x},${start.y + radius} ${end.x},${
      end.y - radius
    }`
  }

  drawHEdge (start, end) {
    if (end.x > start.x + this.xstep) {
      if (!start) {
        // console.log(start, end);
      }
      // let start = start.x + 10;
      const number = parseInt((end.x - start.x) / this.xstep)

      const control1 = this.xstep / 2 + 40
      const control2 = this.xstep / 2 + 30

      let d = `M ${start.x + 10} ${start.y} \
              l 20 0\
             C ${start.x + control1},${start.y} \
              ${start.x + control2},${start.y + 30} \
               ${start.x + this.xstep},${start.y + 30}`
      if (number > 2) {
        d += `l ${this.xstep * (number - 2)} 0`
      }

      d += `C ${end.x - control2},${start.y + 30} \
          ${end.x - control1},${start.y} \
          ${end.x - 10 - 20},${end.y} \
          l 20 0`

      return d
    }
    return this.getStraightLinePath(start, end)
  }

  /**
   * 生成直线的指令
   * @param {*} start
   * @param {*} end
   */
  getStraightLinePath (start, end) {
    return `M ${start.x + 12},${start.y} L${start.x + 12},${start.y} ${
      end.x - 15
    },${end.y}`
  }
}

class DefaultStyleService extends EdgeService {
  // eslint-disable-next-line no-useless-constructor
  constructor (xstep, ystep) {
    super(xstep, ystep)
  }

  drawEdge (start, end) {
    if (start.y === end.y) {
      return this.drawHEdge(start, end)
    }
    if (start.x === end.x) {
      return this.drawVerticalEdge(start, end)
    }
    const lb = 'c 0 12 12 12 12 12'
    const rb = 'c 12 0 12 -12 12 -12'
    const rt = 'c 12 0 12 12 12 12'
    const lt = 'c 0 -12 12 -12 12 -12'
    const midy = Math.abs(end.y - start.y)
    if (end.y > start.y) {
      // 左上到右下
      const firstCorner = end.x - start.x - 50
      const d = `M ${start.x + 10} ${start.y}\
                l ${20} 0\
                ${rt} \
                l 0 ${midy - 24} \
                ${lb} \
                l ${firstCorner - 20} 0
            `
      return d
    } else {
      const lastCorner = end.x - start.x - 50
      const d = `M ${start.x + 14} ${start.y}\
        l ${lastCorner - 20} 0\
        ${rb} \
        l 0 -${midy - 24} \
        ${lt} \
        l ${20} 0
        `
      // console.log(d)
      return d
    }
  }
}

class BesselStyleService extends EdgeService {
  drawEdge (start, end) {
    if (start.y === end.y) {
      return this.drawHEdge(start, end)
    }
    if (start.x === end.x) {
      return this.drawVerticalEdge(start, end)
    }
    let path = ''
    if (end.y > start.y) {
      path = `M ${start.x + 12},${start.y}\
            C ${end.x},${start.y}\
            ${start.x + 50},${end.y}\
            ${end.x - 15},${end.y}
            `
      return path
    } else {
      path = `M ${start.x},${start.y}\
            C ${end.x - 50},${start.y}\
            ${start.x},${end.y}\
            ${end.x - 12},${end.y}
            `
      return path
    }
  }
}

class LineStyleService extends EdgeService {
  drawEdge (start, end) {
    if (start.y === end.y) {
      return this.drawHEdge(start, end)
    }
    return this.getStraightLinePath(start, end)
  }
}
