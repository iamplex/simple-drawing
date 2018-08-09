import {inherits} from '../utils.js'
import Geometry from '../geometry/Geometry.js'
import GeometryType from '../geometry/GeometryType.js'
import {createDefaultStyle, renderStyle} from '../style/Style.js'


function Polygon(coordinates) {
  Geometry.call(this)

  this.setCoordinates(coordinates)

  this.setStyle(createDefaultStyle(this.getType()))
}

inherits(Polygon, Geometry)

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Polygon.prototype.render = function(ctx) {
  ctx.beginPath()

  ctx.moveTo(this.coordinates[0][0], this.coordinates[0][1])

  for (let i = 1, len = this.coordinates.length; i < len; i++) {
    ctx.lineTo(this.coordinates[i][0], this.coordinates[i][1])
  }

  renderStyle(ctx, this.style)

  ctx.closePath()
}

Polygon.prototype.getType = function() {
  return GeometryType.POLYGON
}

export default Polygon
