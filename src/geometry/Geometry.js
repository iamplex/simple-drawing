class Geometry {
  constructor() {
    this.coordinates = []

    this.style = []
  }

  getCoordinates() {
    return this.coordinates.slice()
  }

  setCoordinates(coordinates) {
    this.coordinates = coordinates
  }

  setStyle(style) {
    this.style = style
  }
}

export default Geometry
