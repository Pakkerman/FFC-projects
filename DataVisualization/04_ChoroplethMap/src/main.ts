import * as d3 from 'd3'
import * as topojson from 'topojson-client'
// import * as topojson from 'topojson-client'
import './style.css'
import type { Topology } from 'topojson-specification'

const countiesURL =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'

const educationURL =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

const worldMapTopoJSONDataURL =
  'https://unpkg.com/visionscarto-world-atlas@0.1.0/world/110m.json'

const worldGDPDataURL =
  'https://gist.githubusercontent.com/Pakkerman/531fc1b952b5d3165f7b991d0f508337/raw/d0365faf0762345939fd49ad96b8d89ad923db21/API_NY.GDP.PCAP.PP.CD_DS2_en_csv_v2_6298503.csv'

main()

const w = 775
const h = 500
const padX = 30
const padY = 30

async function main(): void {
  const topoJSON = await fetchData(countiesURL, 'JSON')
  const educationJSON = await fetchData(educationURL, 'JSON')

  const worldMapTopoJSONData = await fetchData(worldMapTopoJSONDataURL, 'JSON')
  const worldGDPData = await fetchData(worldGDPDataURL, 'CSV')
  const parsedCSV = d3.csvParse(worldGDPData.substring(82)).map((item) => ({
    gdp: +item['2021'] || null,
    code: item['Country Code'],
    name: item['Country Name'],
  }))

  // drawWorldMap(worldMapTopoJSONData, parsedCSV)
  d3.select('#loading').attr('class', 'hidden')
  drawGraph(topoJSON, educationJSON)
}

function colorValue(data: any) {
  return data.gdp
}

function drawWorldMap(
  topoJSON: Topology,
  data: {
    gdp: number | null
    code: string
    name: string
  }[]
): void {
  const geoJSON = topojson.feature(topoJSON, 'countries')

  const projection = d3.geoNaturalEarth1()
  const path = d3.geoPath(projection)
  const graticule = d3.geoGraticule()
  const svg = d3.select('.svg-primary').attr('width', w).attr('height', h)

  const a3ToRow = new Map()
  for (const item of data) {
    a3ToRow.set(item.code, item)
  }

  svg
    .selectAll('path.graticule')
    .data([null])
    .join('path')
    .attr('class', 'graticule')
    .attr('d', path(graticule()))
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 0.1)

  svg
    .selectAll('path.outline')
    .data([null])
    .join('path')
    .attr('class', 'graticule')
    .attr('d', path(graticule.outline()))
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 0.3)

  const missingDataFill = 'gray'
  const colorScale = d3
    .scaleQuantile()
    .domain(data.map(colorValue))
    .range(d3.schemeYlGnBu[9].reverse())

  svg
    .selectAll('path.countries')
    .data(geoJSON.features)
    .join('path')
    .attr('d', (d) => path(d))
    .attr('class', 'countries')
    .attr('fill', (d) => {
      const data = a3ToRow.get(d.properties.a3)

      if (data && colorValue(data)) return colorScale(colorValue(data))
      return missingDataFill
    })
    .attr('stroke', '#AAA')
    .attr('stroke-width', 0.25)
}

type EducationData = {
  area_name: string
  bachelorsOrHigher: number
  fips: number
  state: string
}

function drawGraph(topoJSON: Topology, educationJSON: EducationData[]): void {
  const geoJSON = topojson.feature(topoJSON, 'counties')
  const map = new Map()
  for (const item of educationJSON) {
    map.set(item.fips, item)
  }

  const colorValue = (data: EducationData) => data.bachelorsOrHigher

  const path = d3.geoPath()
  const svg = d3.select('.svg-primary').attr('width', w).attr('height', h)

  const colorScale = d3
    .scaleQuantile()
    .domain(educationJSON.map(colorValue))
    .range(d3.schemeOranges[5].reverse())

  svg
    .append('g')
    .attr('class', 'counties')
    .style('transform', `scale(0.8)`)
    .selectAll('path')
    .data(geoJSON.features)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('stroke', 'white')
    .attr('data-fips', (d) => {
      return map.get(d.id).fips
    })
    .attr('data-education', (d) => {
      return map.get(d.id).bachelorsOrHigher
    })
    .attr('d', path)
    .attr('fill', (d) => {
      const color = map.get(d.id)
      return colorScale(colorValue(color))
    })
    .attr('stroke-width', 0.2)
    .on('mouseover', (event, d) => {
      showTooltip(event, d, map)
    })
    .on('mouseout', () => {
      d3.select('.tooltip').style('display', 'none')
    })

  const percentage = [20, 40, 60, 80, 100]
  const legendScale = d3
    .scaleQuantile()
    .domain(percentage)
    .range(d3.schemeOranges[5].reverse())

  const legendWidth = 375
  const legendHeight = 75

  const legend = d3
    .select('#legend')
    .attr('width', legendWidth)
    .attr('height', legendHeight)

  const rectWidth = 40
  const rectHeight = 20
  legend
    .append('g')
    .selectAll('rect')
    .data(percentage)
    .enter()
    .append('rect')
    .attr('width', rectWidth)
    .attr('height', rectHeight)
    .attr(
      'x',
      (d, idx) =>
        legendWidth / 2 - (rectWidth * percentage.length) / 2 + idx * rectWidth
    )

    .attr('y', legendHeight / 2 - rectHeight / 2)
    .attr('fill', (d) => legendScale(d))

  legend
    .append('text')
    .text('Bachelor or higher (%)')
    .attr('x', legendWidth / 2)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('font-size', '0.8rem')
    .attr('fill', '#CBD5E1')

  legend
    .append('g')
    .selectAll('text')
    .data(percentage)
    .enter()
    .append('text')
    .style('font-size', '0.7rem')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')

    .attr(
      'x',
      (d, idx) =>
        legendWidth / 2 -
        (rectWidth * percentage.length) / 2 +
        idx * rectWidth +
        rectWidth / 2
    )
    .attr('y', legendHeight / 2 + 25)
    .text((d) => d)
    .attr('fill', '#CBD5E1')
}

function showTooltip(
  event: MouseEvent,
  d: any,
  map: Map<number, EducationData>
): void {
  const { x, y } = event
  const { area_name, bachelorsOrHigher } = map.get(d.id)!

  d3.select('.tooltip')
    .attr('data-education', bachelorsOrHigher)
    .attr('data-fips', d.id)
    .style('display', 'block')
    .style('transform', `translate(${x + 10}px, ${y + 10}px)`)
    .html(() => {
      return `<p>Location: ${area_name}</p><p>Education: ${bachelorsOrHigher}%</p>`
    })
}

async function fetchData(url: string, type: 'JSON' | 'CSV'): Promise<any> {
  let response = undefined
  try {
    response = await fetch(url)
  } catch (error) {
    throw error
  }

  switch (type) {
    case 'CSV':
      return await response.text()
    case 'JSON':
      return await response.json()
  }
}
