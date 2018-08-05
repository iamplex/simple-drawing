import {inherits} from '../utils.js'
import Geometry from '../geometry/Geometry.js'
import GeometryType from '../geometry/GeometryType.js'
import {createDefaultStyle, renderStyle} from '../style/Style.js'


function Point(coordinates) {
  Geometry.call(this)

  this.radius = 6

  this.setCoordinates(coordinates)

  this.setStyle(createDefaultStyle(this.getType()))
}

inherits(Point, Geometry)

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Point.prototype.render = function(ctx) {
  ctx.beginPath()

  ctx.arc(this.coordinates[0][0], this.coordinates[0][1], this.radius, 0, 2 * Math.PI)

  renderStyle(ctx, this.style)

  ctx.closePath()
}

Point.prototype.getType = function() {
  return GeometryType.POINT
}

Point.prototype.setRadius = function(radius) {
  this.radius = radius
}

export default Point
