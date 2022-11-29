import React from 'react'
import Header from '../components/Header'
import Map from '../components/google_map/Map'
import ExploreInsidhts from '../components/ExploreInsidhts'
import HospitalModal from '../components/Modals/HospitalModal'

import HospitalImage from '../assets/images/hospital-img.png'

export default function Hospital() {
  return (
    <div>
      <Header />
      <section className="banner-sec-2">
        <div className='map-holderHospital'>
          <Map />
        </div>
        <HospitalModal />
      </section>
      <section className="hospital-detail-sec">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title">
                <span><img src={HospitalImage} alt="" className="img-fluid" /></span>
                <div className="text-box">
                  <h3>Hospital <strong>Details</strong> Report</h3>
                  <p>Survey Report & Details as per your requirements</p>
                </div>
              </div>
              <div className="hospital-filter">
                <div className="filter-box">
                  <form>
                    <label>UNIT TYPE</label>
                    <div className="relative">
                      <input type="text" className="form-control" placeholder="Enter Unit Type" />
                      <a className="green-bg" href="#">Apply Filters</a>
                    </div>
                  </form>
                </div>
                <div className="filter-box">
                  <form>
                    <label>ACUITY</label>
                    <div className="relative">
                      <input type="text" className="form-control" placeholder="Enter Acuity" />
                      <a className="" href="#">Apply Filters</a>
                    </div>
                  </form>
                </div>
              </div>
              <div className="filter-detail">
                <ul>
                  <li>
                    <div className="filter-detail-box green-box"> <span>S</span>
                      <p>POSITIVE <strong></strong></p>
                    </div>
                  </li>
                  <li>
                    <div className="filter-detail-box yellow-box"><span><img src="images/a-icon.png"
                      className="img-fluid" alt="" /></span>
                      <p>NEUTRAL <strong></strong></p>
                    </div>
                  </li>
                  <li>
                    <div className="filter-detail-box red-box"><span><img src="images/f-icon.png"
                      className="img-fluid" alt="" /></span>
                      <p>NEGATIVE <strong></strong></p>
                    </div>
                  </li>
                  <li>
                    <div className="filter-detail-box yellow-box"><span><img src="images/e-icon.png"
                      className="img-fluid" alt="" /></span>
                      <p>NEUTRAL <strong></strong></p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="report-detail-sec">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="report-detail-top">
                <div className="report-detail-title">
                  <h3>Report <span>Details</span> </h3>
                  <p>Free text from the survey repprts by the nurses</p>
                </div>
                <a className="view-btn" href="#">View All Reports</a>
              </div>
            </div>
            <div className="report-detail-inner">
              <div className="row">
                <div className="col-md-6">
                  <div className="report-detail-box">
                    <div className="media">
                      <div className="media-left">
                        <h4>Report ID</h4>
                        <p>#01231231241444</p>
                      </div>
                      <div className="media-left text-end">
                        <h4>Monday, 27 August 2023</h4>
                        <p>11:00 AM</p>
                      </div>
                    </div>
                    <div className="text-box">
                      <h3>Lorem Ipsum</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type......</p>
                      <a href="#">Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="report-detail-box">
                    <div className="media">
                      <div className="media-left">
                        <h4>Report ID</h4>
                        <p>#01231231241444</p>
                      </div>
                      <div className="media-left text-end">
                        <h4>Monday, 27 August 2023</h4>
                        <p>11:00 AM</p>
                      </div>
                    </div>
                    <div className="text-box">
                      <h3>Lorem Ipsum</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type......</p>
                      <a href="#">Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="report-detail-box">
                    <div className="media">
                      <div className="media-left">
                        <h4>Report ID</h4>
                        <p>#01231231241444</p>
                      </div>
                      <div className="media-left text-end">
                        <h4>Monday, 27 August 2023</h4>
                        <p>11:00 AM</p>
                      </div>
                    </div>
                    <div className="text-box">
                      <h3>Lorem Ipsum</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type......</p>
                      <a href="#">Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="report-detail-box">
                    <div className="media">
                      <div className="media-left">
                        <h4>Report ID</h4>
                        <p>#01231231241444</p>
                      </div>
                      <div className="media-left text-end">
                        <h4>Monday, 27 August 2023</h4>
                        <p>11:00 AM</p>
                      </div>
                    </div>
                    <div className="text-box">
                      <h3>Lorem Ipsum</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type......</p>
                      <a href="#">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="report-explanation">
              <div className="row">
                <div className="col-lg-5">
                  <div className="report-explanation-left">
                    <h3>Nurse <span>Burnout</span> Index</h3>
                    <p>Index based on the survey assesments.</p>

                    <div className="image-holder">
                      <div className="percent">
                        <p style={{ display: 'none' }}>67%</p>
                      </div>
                      <p className="percent-text"> Burnout Index out of 100%</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="report-explanation-right">
                    <div className="text-box">
                      <h3>Explanation</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only five
                        centuries, but also the leap into electronic typesetting, remaining
                        essentially unchanged.</p>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                        roots in a piece of classNameical Latin literature from 45 BC, making it
                        over 2000 years old. Richard McClintock, a Latin professor at
                        Hampden-Sydney College in Virginia, looked up one of the more obscure
                        Latin words, consectetur, from a Lorem Ipsum passage, and going through
                        the cites of the word in classNameical literature, discovered the
                        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                        Cicero, written in 45 BC. This book is a treatise on the theory of
                        ethics, very popular during the Renaissance. The first line of Lorem
                        Ipsum, "Lorem ipsum dolor sit amet..", comes.....</p>
                      <a href="#">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="generate-insight-sec">
        <ExploreInsidhts
          background='#52B788'
          color='white'
        />
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-box">
                <p>Copyright | 2023 SAFE NURSING. All right reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
