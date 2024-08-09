import React from 'react';

function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.min(255, Math.floor((R * (100 + percent)) / 100));
    G = Math.min(255, Math.floor((G * (100 + percent)) / 100));
    B = Math.min(255, Math.floor((B * (100 + percent)) / 100));

    const RR = R.toString(16).padStart(2, '0');
    const GG = G.toString(16).padStart(2, '0');
    const BB = B.toString(16).padStart(2, '0');

    return `#${RR}${GG}${BB}`;
}

const DEFAULT_RADIUS = 60;
const MAX_VALUE = 10;

const Direction = {
    CLOCKWISE: 1,
    ANTI_CLOCKWISE: -1,
};

const CircularProgressBar = ({
    maxValue = MAX_VALUE,
    selectedValue = 0,
    radius = DEFAULT_RADIUS,
    strokeWidth = DEFAULT_RADIUS / 10,
    label = '',
    activeStrokeColor = '#05a168',
    inactiveStrokeColor = '#ddd',
    backgroundColor = '#fff',
    textColor = '#000',
    labelFontSize = Math.floor(DEFAULT_RADIUS / 3),
    valueFontSize = Math.floor(DEFAULT_RADIUS / 2.5),
    withGradient = false,
    anticlockwise = false,
    initialAngularDisplacement = 0,
}) => {

    const generatePie = (value) => {
        const angle = (2 * Math.PI * value) / 100;
        const x = radius + Math.sin(angle) * radius;
        const y = radius - Math.cos(angle) * radius;
        const largeArcFlag = value > 50 ? 1 : 0;

        return `M ${radius},${radius} L ${radius},0 A ${radius},${radius} 0 ${largeArcFlag},1 ${x},${y} Z`;
    };

    const calculatePieValue = (numberOfBars) => {
        const angle = 360 / numberOfBars;
        return Math.max(Math.floor(angle / 4), 1);
    };

    const renderPie = (i) => {
        const DIRECTION = anticlockwise ? Direction.ANTI_CLOCKWISE : Direction.CLOCKWISE;
        const rotationAngle = DIRECTION * (initialAngularDisplacement + (i * 360) / maxValue);
        const rotationTransformation = `rotate(${rotationAngle}, ${radius}, ${radius})`;

        const pieValue = calculatePieValue(maxValue);
        const dValue = generatePie(pieValue);

        const activeColor = withGradient
            ? shadeColor(activeStrokeColor, ((i + 1) * 100) / maxValue)
            : activeStrokeColor;

        const fillColor = selectedValue > 0 && i <= selectedValue ? activeColor : inactiveStrokeColor;

        return (
            <path
                key={i}
                d={dValue}
                fill={fillColor}
                transform={rotationTransformation}
                style={{ opacity: i === 0 ? 0 : 1 }}
            />
        );
    };

    const renderOuterCircle = () => [...Array(maxValue)].map((_, i) => renderPie(i));

    const labelView = (
        <text
            fill={textColor}
            fontSize={labelFontSize}
            x={radius}
            y={radius + labelFontSize}
            textAnchor="middle"
        >
            {label}
        </text>
    );

    const textValueY = label ? radius : radius + valueFontSize / 3;

    return (
        <svg width={radius * 2} height={radius * 2}>
            {renderOuterCircle()}

            <circle r={radius - strokeWidth} cx={radius} cy={radius} fill={backgroundColor} />

            <text
                fill={textColor}
                fontSize={valueFontSize}
                fontWeight="bold"
                x={radius}
                y={textValueY}
                textAnchor="middle"
            >
                {selectedValue}
            </text>
            {label && labelView}
        </svg>
    );
};

export default CircularProgressBar;
