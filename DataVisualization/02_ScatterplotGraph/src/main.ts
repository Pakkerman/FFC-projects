import './style.css'
import * as d3 from 'd3'

const url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

main()

async function main(): Promise<void> {
  const response = await getData(url)
  drawGraph2(response)
}

async function getData(url: string): Promise<Array<RiderRecord>> {
  try {
    const res = await fetch(url)
    const data = res.json()
    return data
  } catch (error) {
    throw error
  }
}

function drawGraph2(json: unknown): void {
  if (!Array.isArray(json)) return
  const data: RiderRecord[] = json.map((item) => {
    const min = item.Time.split(':')[0]
    const sec = item.Time.split(':')[1]

    return {
      time: new Date(1970, 0, 1, 0, min, sec, 0),
      place: +item.Place,
      seconds: item.Seconds,
      name: item.Name,
      year: new Date(item.Year, 0, 1, 0, 0, 0, 0),
      nationality: item.Nationality,
      doping: item.Doping,
      url: item.URL,
    }
  })

  const w = 800
  const h = 500
  const padX = 50
  const padY = 30

  const scaleX = d3.scaleLinear().range([0, w])
  const scaleY = d3.scaleTime().range([0, h])

  const color = d3.scaleOrdinal(d3.schemeCategory10)

  const timeFormat = d3.timeFormat('%M:%S')
  const xAxis = d3.axisBottom(scaleX).tickFormat(d3.format('d'))
  const yAxis = d3.axisLeft(scaleY).tickFormat(timeFormat)

  const svg = d3.select('svg').attr('width', w).attr('height', h)
  svg.select('text').style('display', 'none')

  drawLegends(svg)

  scaleX
    .domain([
      d3.min(data, (d) => d.year.getFullYear() - 1) || 1990,
      d3.max(data, (d) => d.year.getFullYear() + 1) || 2024,
    ])
    .range([padX, w - padX])

  const buffer = 15 * 1000
  const min = new Date(d3.min(data, (d) => d.time)!.getTime() - buffer)
  const max = new Date(d3.max(data, (d) => d.time)!.getTime() + buffer)
  scaleY.domain([min, max]).range([padY, h - padY])

  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${h - padY})`)
    .call(xAxis)
    .append('text')
    .attr('class', 'x-axis-label')
    .attr('x', w)
    .attr('y', -6)
    .style('text-anchor', 'end')
    .text('Year')

  svg
    .append('g')
    .attr('class', 'y axis')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${padX}, 0)`)
    .call(yAxis)
    .append('text')
    .attr('class', 'label')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Best Time (minutes)')

  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -160)
    .attr('y', -44)
    .style('font-size', 18)
    .text('Time in Minutes')

  svg
    .selectAll('.dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('r', 6)
    .attr('cx', (d) => scaleX(d.year.getFullYear()))
    .attr('cy', (d) => scaleY(d.time))
    .attr('data-xvalue', (d) => d.year.getFullYear())
    .attr('data-yvalue', (d) => d.time.toISOString())
    .attr('fill', (d) => (d.doping.length ? 'teal' : 'orange'))
    .on('mouseover', (event, data) => {
      event.target.setAttribute('stroke', 'white')
      event.target.setAttribute('stroke-width', 1)

      showTooltip(event, data)
    })
    .on('mouseout', (event) => {
      event.target.setAttribute('stroke-width', 0)
      hideTooltip()
    })
}

function drawLegends(
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>
): void {
  const legendx = 600
  const legendy = 150

  const g = svg.append('g').attr('id', 'legend')

  g.append('rect')
    .attr('x', legendx - 15)
    .attr('y', legendy - 6)
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', 'teal')

  g.append('text')
    .text('Riders with doping allegations')
    .attr('x', legendx)
    .attr('y', legendy)
    .attr('dominant-baseline', 'middle') // Center the
    .attr('fill', 'white')
    .style('font-size', '0.70rem')
    .style('text-align', 'right')

  g.append('text')
    .text('No doping allegations')
    .attr('x', legendx)
    .attr('y', legendy + 20)
    .attr('dominant-baseline', 'middle') // Center the
    .attr('fill', 'white')
    .style('font-size', '0.70rem')
    .style('text-align', 'right')

  g.append('rect')
    .attr('x', legendx - 15)
    .attr('y', legendy + 15)
    .attr('width', 10)
    .attr('height', 10)
    .attr('fill', 'orange')
    .append('text')
    .text('123')
}

function showTooltip(event: any, data: RiderRecord): void {
  console.log(event, data)
  const tooltip: HTMLDivElement | null = document.querySelector('.tooltip')
  if (!tooltip) return

  tooltip.setAttribute('data-year', event.target.dataset.xvalue)
  tooltip.classList.remove('hidden')

  const cx = +event.target.getAttribute('cx') + 50
  const cy = +event.target.getAttribute('cy') + 100
  tooltip.style.transform = `translate(${cx}px, ${cy}px)`

  tooltip.innerHTML = `
  <div id='legend'>
    <p>${data.name}: ${data.nationality}</p>
    <p>Year: ${data.year.getFullYear()}, Time: ${data.time.getMinutes()}:${data.time.getSeconds()}</p>
  
    ${data.doping.length === 0 ? '' : `<br/><p>${data.doping}</p>`}
  </div>
  `
}

function hideTooltip(): void {
  const tooltip: HTMLDivElement | null = document.querySelector('.tooltip')
  if (!tooltip) return
  tooltip.classList.add('hidden')
}
