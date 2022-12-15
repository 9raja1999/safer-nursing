import React from 'react'
import { VictoryPie, VictoryBar } from 'victory'

function BurnIndex({ burnOutIndex }) {
    return (
        <div className="report-explanation-left" style={{ position: 'relative' }}>
            <h3>Nurse <span>Burnout</span> Index</h3>
            <p>Index based on the survey assesments.</p>

            <div className="image-holder" style={{ position: 'relative' }}>

                <VictoryPie
                    padAngle={0}
                    padding={10}
                    // used to hide labels
                    labelComponent={<span />}
                    innerRadius={70}
                    width={200} height={200}
                    data={[{ 'key': "", 'y': burnOutIndex }, { 'key': "", 'y': (100 - burnOutIndex) }]}
                    colorScale={["#52B788", "#C7E8D8"]}
                />
            </div>
            <div style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%,-60%)' }}>
                <h1>
                    {burnOutIndex} %
                </h1>
                <p>Burn out index out of 100%</p>
            </div>
        </div>
    )
}

export default BurnIndex