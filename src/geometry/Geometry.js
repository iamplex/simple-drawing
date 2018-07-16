function Geometry() {
  this.coordinates = []

  this.style = []
}

Geometry.prototype.getCoordinates = function() {
  return this.coordinates.slice()
}

Geometry.prototype.setCoordinates = function(coordinates) {
  this.coordinates = coordinates
}

Geometry.prototype.setStyle = function(style) {
 this.style = style
}

export default Geometry
