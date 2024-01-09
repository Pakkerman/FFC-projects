import './style.css'
import * as d3 from 'd3'

const URL =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

getData()

function getData(): void {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => drawGraph(data.data))
}

function drawGraph(array: string[][]): void {
  const pad = 50
  const w = 800
  const h = 500

  const yMax = d3.max(array, (item) => +item[1])
  const length = array.length

  const yScale = d3
    .scaleLinear()
    .domain([0, yMax as number])
    .range([h - pad, pad])

  const xScale = d3
    .scaleLinear()
    .domain([0, length])
    .range([pad, w - pad])

  const svg = d3
    .select('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('class', 'svg')

  svg
    .selectAll('rect')
    .data(array)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('data-date', (item) => item[0])
    .attr('data-gdp', (item) => item[1])
    .attr('x', (_, idx) => xScale(idx))
    .attr('y', (item) => yScale(+item[1]))
    .attr('width', () => w / length)
    .attr('height', (item) => h - yScale(+item[1]) - pad)
    .attr('fill', 'orange')
    .on('mouseover', (event) => {
      const tooltip = document.querySelector('#tooltip')
      if (!tooltip) return
      tooltip.setAttribute('data-date', event.target.dataset.date)
      tooltip.setAttribute('data-gdp', event.target.dataset.gdp)
      tooltip.classList.remove('hidden')

      tooltip.setAttribute(
        'style',
        `translateX(${event.target.y.baseVal.value})`
      )

      tooltip.textContent = `Date: ${
        event.target.dataset.date
      } | GDP: ${event.target.dataset.gdp.padStart(8, '\u00A0')} `
    })
    .on('mouseout', () => {
      const tooltip = document.querySelector('#tooltip')
      if (!tooltip) return
      tooltip.classList.add('hidden')
    })

  const maxDate = d3.max(array, (item) => new Date(item[0]))
  const minDate = d3.min(array, (item) => new Date(item[0]))
  const dateScale = d3
    .scaleTime()
    .domain([
      minDate || new Date('1900-01-01'),
      maxDate || new Date('2099-01-01'),
    ])
    .range([pad, w - pad])

  const xAxis = d3.axisBottom(dateScale)
  const yAxis = d3.axisLeft(yScale)

  svg
    .append('g')
    .attr('transform', `translate(0 , ${h - pad})`)
    .attr('id', 'x-axis')
    .call(xAxis)
  svg
    .append('g')
    .attr('transform', `translate(${pad},0)`)
    .attr('id', 'y-axis')
    .call(yAxis)
}
