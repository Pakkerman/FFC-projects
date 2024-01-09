import { Games, Kickstarter, Movies } from './global'
import * as d3 from 'd3'
import json from './data.json'

import './style.css'

const KickstarterPledges =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'
const MovieSales =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
const VideoGameSales =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'

main()

async function main() {
  const data = await fetchData([KickstarterPledges, MovieSales, VideoGameSales])

  const [kickstarterData, moviesData, gamesData] = data

  const gamesBtn = document.querySelector('#games')
  const moviesBtn = document.querySelector('#movies')
  const kickstarterBtn = document.querySelector('#kickstarter')
  if (!gamesBtn || !moviesBtn || !kickstarterBtn) {
    console.error('something wrong with buttons')
    return
  }

  gamesBtn.addEventListener('click', () => {
    gamesBtn.classList.add('view-selected')
    draw(gamesData)
  })
  moviesBtn.addEventListener('click', () => {
    moviesBtn.classList.add('view-selected')
    draw(moviesData)
  })
  kickstarterBtn.addEventListener('click', () => {
    kickstarterBtn.classList.add('view-selected')
    draw(kickstarterData)
  })

  draw(gamesData)
}

function draw(data: string[]): void {
  const w = 1100
  const h = 650
  const pad = 30

  const color = d3.scaleOrdinal(
    data.children.map((d) => d.name),
    d3.schemeSet3
  )

  const treemap = d3
    .treemap()
    .size([w - pad, h - pad]) // Set the size of the treemap
    .padding(1) // Set padding between cells

  d3.select('svg').remove()
  // Create an SVG element
  const svg = d3
    .select('.svg-container')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

  // Create a hierarchy from the data
  const root = d3
    .hierarchy(data)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value)

  // Generate the treemap layout
  treemap(root)

  // Create rectangles for each data element

  const leaf = svg
    .selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr('transform', (d) => `translate(${d.x0 + pad / 2},${d.y0 + pad / 2})`)

  leaf
    .append('clipPath')
    .attr('id', (d) => d.value)
    .append('rect')
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)

  leaf
    .append('rect')
    .attr('id', (d) => d.value)
    .attr('class', 'tile')
    .attr('data-name', (d) => d.data.name)
    .attr('data-category', (d) => d.data.category)
    .attr('data-value', (d) => d.data.value)
    .attr('fill-opacity', 0.9)
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0)
    .attr('fill', (d) => {
      return color(d.data.category)
      // while (d.depth > 1) d = d.parent
      // return color(d.data.name)
    })

  leaf
    .append('text')
    .attr('clip-path', (d) => `url(#${d.value})`)
    .selectAll('tspan')
    .data((d) => {
      const regex = /\b\w+\s*-*\d*\w*\b/g
      const content = [...d.data.name.matchAll(regex)].flat()
      return content
    })

    .join('tspan')
    .attr('x', 5)
    .attr('y', (_, idx) => 15 + idx * 15)
    .attr('fill', 'white')
    .text((d) => d)
    .attr('fill', 'black')
    .style('font-size', '0.7rem')

  const legendWidth = 400
  const legendHeight = 400

  console.log(root.data.children)

  d3.select('#legend').remove()
  const legend = d3
    .select('.svg-container')
    .append('svg')
    .attr('id', 'legend')
    .attr('width', legendWidth)
    .attr('height', legendHeight)
    .attr('x', 500)
    .attr('y', 500)

  legend
    .selectAll('g')
    .data(root.data.children)
    .enter()
    .append('g')
    .append('rect')
    .attr('class', 'legend-item')
    .attr('fill', (d) => color(d.name))
    .attr('y', (_, idx) => 10 + idx * 25)
    .attr('width', 20)
    .attr('height', 20)

  legend
    .selectAll('g')
    .append('text')
    .text((d) => d.name)
    .attr('y', (_, idx) => 20 + idx * 25)
    .attr('x', 30)
    .attr('text-anchor', 'left')
    .attr('fill', '#E2E8F0')
    .style('alignment-baseline', 'middle')
    .attr('width', 20)
    .attr('height', 20)
}

async function fetchData(urls: string[]): Promise<any> {
  try {
    const response = await Promise.all([...urls.map((item) => fetch(item))])
    return await Promise.all([...response.map((item) => item.json())])
  } catch (error) {
    console.log('somthing wrong with fetching data:', error)
  }
}
