import * as d3 from 'd3'
import './style.css'

type TemperatureData = Array<{ variance: number; temp: number; date: Date }>

const url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

main()

async function main() {
  const json = await fetchData(url)
  drawGraph(json)
}

async function fetchData(url: string): Promise<any> {
  try {
    const res = await fetch(url)
    const json = await res.json()
    return json
  } catch (error) {
    throw error
  }
}

const w = 1800
const h = 450
const padX = 70
const padY = 30

function drawGraph(json: any): void {
  const baseTemp: number = json.baseTemperature
  const data: TemperatureData = json.monthlyVariance.map((item: any) => {
    return {
      variance: item.variance,
      temp: item.variance + baseTemp,
      date: new Date(item.year, item.month - 1, 1, 0, 0, 0, 0),
    }
  })

  const svg = d3.select('svg').attr('width', w).attr('height', h)
  const xmax = d3.max(data, (d) => d.date) || new Date(1700, 0)
  const xmin = d3.min(data, (d) => d.date) || new Date(2024, 0)
  const yearScale = d3
    .scaleTime()
    .domain([xmin, xmax])
    .range([padX, w - padX])

  const monthScale = d3
    .scaleTime()
    .domain([new Date(0, 0), new Date(0, 11)])
    .range([padY, h - padY * 2])

  const colorScale = d3.scaleDiverging([14, 6, 0], d3.interpolateRdYlBu)

  drawAxis(svg, yearScale, monthScale)
  drawRect(svg, data, yearScale, monthScale, colorScale, baseTemp)

  drawLegend(colorScale)
}

function drawAxis(
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  yearScale: d3.ScaleTime<number, number, never>,
  monthScale: d3.ScaleTime<number, number, never>
): void {
  const xaxis = d3.axisBottom(yearScale).ticks(d3.timeYear.every(10))
  const yaxis = d3.axisLeft(monthScale).tickFormat(d3.timeFormat('%B'))

  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${h - padY + 5})`)
    .call(xaxis)

  svg
    .append('g')
    .attr('id', 'y-axis')
    .call(yaxis)
    .attr('transform', `translate(${padX - 2}, 0)`)
}

function drawRect(
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
  data: TemperatureData,
  yearScale: d3.ScaleTime<number, number, never>,
  monthScale: d3.ScaleTime<number, number, never>,
  colorScale: d3.ScaleDiverging<string, never>,
  baseTemp: number
): void {
  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('data-month', (d) => d.date.getMonth())
    .attr('data-year', (d) => d.date.getFullYear())
    .attr('data-temp', (d) => d.temp)
    .attr('width', w / (2015 - 1776))
    .attr('height', (h - padY * 2) / 12 + 2)
    .attr('x', (d) => yearScale(new Date(d.date.getFullYear(), 0)))
    .attr('y', (d) => monthScale(new Date(0, d.date.getMonth(), 0)))
    .attr('fill', (d) => colorScale(d.temp))
    .on('mouseover', (event) => showTooltip(event, baseTemp))
    .on('mouseout', hideTooltip)
}

function drawLegend(colorScale: d3.ScaleDiverging<string, never>): void {
  const w = 375
  const h = 100
  const padX = 30
  const padY = 20
  const legend = d3.select('#legend').attr('w', w).attr('y', h)

  legend
    .append('text')
    .attr('id', 'description')
    .text('1753 - 2015: base temperature 8.66℃')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('transform', 'translateX(50%)')
    .attr('y', 20)
    .attr('fill', '#FEF3C7')

  const temperatureScale = d3
    .scaleLinear()
    .domain([0, 14])
    .range([padX, w - padX])

  const temperatureAxis = d3.axisBottom(temperatureScale).ticks(7)

  legend
    .append('g')
    .call(temperatureAxis)
    .style('transform', `translateY(${h - padY - 10}px)`)

  const temps = [0, 2, 4, 6, 8, 10, 12]

  legend
    .selectAll('rect')
    .data(temps)
    .enter()
    .append('rect')
    .attr('width', (w - 2 * padX) / temps.length)
    .attr('height', 30)
    .attr('x', (_, idx) => padX + ((w - 2 * padX) / temps.length) * idx)
    .attr('y', 40)
    .attr('fill', (d) => colorScale(d))
}

function showTooltip(event: MouseEvent, baseTemp: number): void {
  const tooltip: HTMLDivElement | null = document.querySelector('.tooltip')
  if (!tooltip) return
  tooltip.classList.remove('hidden')

  const { x, y } = event
  tooltip.style.transform = `translate(${x + 20}px,${y + 10}px)`

  const month = event.target!.getAttribute('data-month')
  const year = event.target!.getAttribute('data-year')
  const temp = event.target!.getAttribute('data-temp')
  tooltip.setAttribute('data-year', year)

  tooltip.querySelector('#date')!.textContent = `Date: ${year} - ${new Date(
    0,
    Number(month)
  ).toLocaleString('en-US', { month: 'long' })}`

  tooltip.querySelector('#temp')!.textContent = `Temperature: ${Number(
    temp
  ).toFixed(2)}`

  tooltip.querySelector('#delta')!.textContent = `Delta: ${(
    baseTemp - Number(temp)
  ).toFixed(2)}`
}

function hideTooltip(): void {
  const tooltip: HTMLDivElement | null = document.querySelector('.tooltip')
  if (!tooltip) return
  tooltip.classList.add('hidden')
}
