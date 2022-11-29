import React from 'react'

export default function ExploreInsidhts({ background , color }) {
    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="generate-insight-box" style={{background : `${background}`}}>
                        <h3 style={{color : `${color}`}}>You can explore more Insights using Insight Generator Tools</h3>
                        <p style={{color : `${color}`}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has been the industry's standard dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make a type specimen book. It has
                            survived not only five centuries,</p>
                        <a
                            href="#"
                            style={{background : `${color}` , color : `${background}`}}
                        >Generate Insights</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
