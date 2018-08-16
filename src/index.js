import $sd$geom$Type from './geometry/GeometryType.js'
import $sd$geom$Point from './geometry/Point.js'
import $sd$geom$Circle from './geometry/Circle.js'
import $sd$geom$Line from './geometry/Line.js'
import $sd$geom$Polygon from './geometry/Polygon.js'

import $sd$interaction$Draw from './interaction/Draw.js'

import $sd$interaction$Sketchpad from './instance/index.js'

const sd = {}

sd.geom = {}
sd.geom.Type = $sd$geom$Type
sd.geom.Point = $sd$geom$Point
sd.geom.Circle = $sd$geom$Circle
sd.geom.Line = $sd$geom$Line
sd.geom.Polygon = $sd$geom$Polygon

sd.interaction = {}
sd.interaction.Draw = $sd$interaction$Draw

sd.Sketchpad = $sd$interaction$Sketchpad

export default sd
