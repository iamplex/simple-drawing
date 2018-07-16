import {inherits} from '../utils.js'
import Geometry from '../geometry/Geometry.js'
import GeometryType from '../geometry/GeometryType.js'
import {renderStyle} from '../style/Style.js'

function Line(coordinates) {
  Geometry.call(this)

  this.setCoordinates(coordinates)
}

inherits(Line, Geometry)

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Line.prototype.render = function(ctx) {
  ctx.beginPath()

  ctx.moveTo(this.coordinates[0][0], this.coordinates[0][1])

  for (let i = 1, len = this.coordinates.length; i < len; i++) {
    ctx.lineTo(this.coordinates[i][0], this.coordinates[i][1])
  }

  renderStyle(ctx, this.style)

  ctx.closePath()
}

Line.prototype.getType = function() {
  return GeometryType.LINE
}

export default Line
