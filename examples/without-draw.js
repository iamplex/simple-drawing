import Sketchpad from '../src/instance/index.js'
import Point from '../src/geometry/Point.js'
import Circle from '../src/geometry/Circle.js'
import Line from '../src/geometry/Line.js'
import Polygon from '../src/geometry/Polygon.js'

const
  domPad = $('pad'),
  pad = new Sketchpad(domPad),

  width = parseInt(getComputedStyle(domPad).width, 10),
  height = parseInt(getComputedStyle(domPad).height, 10),

  btnClear = $('clear'),
  btnPoint = $('point'),
  btnCircle = $('circle'),
  btnLine = $('line'),
  btnPolygon = $('polygon')

function $(selector) {
  return document.getElementById(selector)
}

function randNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function randPos() {
  return [randNumber(0, width), randNumber(0, height)].slice()
}

function randCoords(min, max) {
  const coords = []

  for (let i = randNumber(min, max); i > 0; i--) {
    coords.push(randPos())
  }

  return coords
}

btnClear.onclick = function() {
  pad.clear()
  pad.clearFeature()
}

btnPoint.onclick = function() {
  const point = new Point()
  point.setCoordinates(randCoords(1, 1))

  pad.addFeature(point)
  pad.render()
}

btnLine.onclick = function() {
  const line = new Line()
  line.setCoordinates(randCoords(2, 5))

  pad.addFeature(line)
  pad.render()
}

btnCircle.onclick = function() {
  const circle = new Circle()
  circle.setCenter(randPos())
  circle.setRadius(randNumber(60, 100))

  pad.addFeature(circle)
  pad.render()
}

btnPolygon.onclick = function() {
  const
    polygon = new Polygon(),
    coords = randCoords(3, 5)

  coords.push(coords[0])
  polygon.setCoordinates(coords)

  pad.addFeature(polygon)
  pad.render()
}
