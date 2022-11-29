import React from 'react'

export default function Request() {
    return (
        <form>
            <div className="form-group">
                <label className="label-text">Nurse ID</label>
                <input type="text" className="form-control" placeholder="" />
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="label-text">First Name</label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="label-text">Last Name</label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="label-text">Title</label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="label-text">Phone</label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="label-text">Email</label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="label-text">How did you hear about us?</label>
                        <input type="text" className="form-control" placeholder="" />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label className="label-text">Message</label>
                <textarea className="form-control"></textarea>
            </div>
            <div className="form-group">
                <input type="submit" className="btn-default" value="Submit Request" />
            </div>
            <div className="form-group">
                <p>By clicking <strong>“Submit Reqeust” </strong> you aagreee to receive
                    marketing communication from us in accordance whit our <a
                        href="#">Privacy Policy.</a> </p>
            </div>
        </form>
    )
}
