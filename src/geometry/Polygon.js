import {inherits} from '../utils.js'
import Geometry from '../geometry/Geometry.js'
import GeometryType from '../geometry/GeometryType.js';
import {renderStyle} from '../style/Style.js'

function Polygon(coordinates) {
  Geometry.call(this)

  this.setCoordinates(coordinates)
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

// export function createBox() {
//   return (
//     function(coordinates, opt_geometry) {
//       const extent = boundingExtent(coordinates);
//       const geometry = opt_geometry || new Polygon(null);
//       geometry.setCoordinates([[
//         getBottomLeft(extent),
//         getBottomRight(extent),
//         getTopRight(extent),
//         getTopLeft(extent),
//         getBottomLeft(extent)
//       ]]);
//       return geometry;
//     }
//   )
// }

/**
 * [createRegularPolygon description]
 *
 * @param  {<Array.<Number>} start
 * @param  {<Array.<Number>} end
 * @param  {Number} sides
 * @return {Array.<Array.<Number>>}
 */
export function createRegularPolygon(start, end, sides) {
  const
    dx = start[0] - end[0],
    dy = start[1] - end[1],
    angle = Math.atan((end[1] - start[1]) / (end[0] - start[0])),
    radius = Math.sqrt(dx * dx + dy * dy)

  let coordinates = []

  function modulo(a, b) {
    const r = a % b;
    return r * b < 0 ? r + b : r;
  }

  for (let i = 0; i < sides; i++) {
    const _angle = angle + (modulo(i, sides) * 2 * Math.PI / sides)

    coordinates[i] = [
      start[0] + (radius * Math.cos(_angle)),
      start[1] + (radius * Math.sin(_angle))
    ]
  }

  coordinates[sides] = coordinates[0]

  return coordinates
}

