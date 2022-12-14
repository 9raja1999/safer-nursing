import React, { useEffect } from 'react'
import { VictoryPie, VictoryBar } from 'victory'

function BurnIndex({ burnOutIndex }) {
    let burnIndex = burnOutIndex == 0 ? burnOutIndex : burnOutIndex.substring(0, burnOutIndex.length-1);
    // console.log('BB',burnOutIndex.substring(0, burnOutIndex.length-1))
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
                    data={[{ 'key': "", 'y': parseInt(burnIndex) }, { 'key': "", 'y': (100 - parseInt(burnIndex)) }]}
                    colorScale={["#52B788", "#EEEEEE"]}
                />
            </div>
            <div style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%,-60%)' }}>
                <h1> 
                    {   
                        burnOutIndex == 0 ? (
                            '0'
                        ) : burnOutIndex == 'NO DATA' ? (
                            '0'
                        ): parseFloat(burnOutIndex).toFixed(2)
                    } %
                </h1>
                <p>Burn out index out of 100%</p>
            </div>
        </div>
    )
}

export default BurnIndex