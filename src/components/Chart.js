import * as d3 from 'd3';
import { Axis, Orient } from 'd3-axis-for-react';

export default function Chart({ data }) {
	let balance = 10;
	let chartData = data.transactions.map((entry) => {
		if (data.name === entry.from) {
			balance -= Number(entry.amount);
		} else {
			balance += Number(entry.amount);
		}
		return {
			date: entry.createdAt.getSeconds(),
			value: balance,
		};
	});

	chartData = [{ date: chartData[0].date - 5, value: 10 }, ...chartData];
	const width = 600;
	const height = 200;
	const margin = { top: 20, right: 30, bottom: 30, left: 40 };

	const x = d3
		.scaleUtc()
		.domain(d3.extent(chartData, (d) => d.date))
		.range([margin.left, width - margin.right]);

	const y = d3
		.scaleLinear()
		.domain([0, d3.max(chartData, (d) => d.value)])
		.nice()
		.range([height - margin.bottom, margin.top]);

	const line = d3
		.line()
		.defined((d) => !isNaN(d.value))
		.x((d) => x(d.date))
		.y((d) => y(d.value));

	return (
		<div>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				<g transform={`translate(0,${height - margin.bottom})`}>
					<Axis scale={x} orient={Orient.bottom} />
				</g>
				<g transform={`translate(${margin.left},0)`}>
					<Axis scale={y} orient={Orient.left} />
				</g>
				<path
					fill="none"
					stroke="steelblue"
					strokeWidth="1.5"
					strokeLinejoin="round"
					strokeLinecap="round"
					d={line(chartData)}
				/>
			</svg>
		</div>
	);
}
