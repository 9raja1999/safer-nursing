import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { addRequest } from '../../store/actions/userActions';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json'
import 'react-phone-input-2/lib/high-res.css'

export default function Request() {
    const [nurseId, setNurseId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [title, setTitle] = useState('');
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('');
    const [reference, setReference] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addRequest(nurseId, firstName, lastName, title, phone, email, reference, message)
            .then(res => {
                console.log(res)
                if (res.success == 1 && res.message == 'Your response has been recorded successfully') {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    setNurseId('');
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPhone('');
                    setReference('');
                    setMessage('');
                    setTitle('');
                }else{
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }).catch(err => {
                toast.error('Something went wrong', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    }


    return (
        <>
            <div>
                <ToastContainer />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label-text">Nurse ID</label>
                    <input type="text" className="form-control" value={nurseId} placeholder="" onChange={(e) => setNurseId(e.target.value)} required />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="label-text">First Name</label>
                            <input type="text" className="form-control" value={firstName} placeholder="" onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="label-text">Last Name</label>
                            <input type="text" className="form-control" value={lastName} placeholder="" onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="label-text">Title</label>
                            <input type="text" className="form-control" value={title} placeholder="" onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        {/* <div className="form-group"> */}
                        <label className="label-text">Phone</label>
                        <PhoneInput
                            inputProps={{
                                required: true
                            }}
                            inputStyle={{
                                width: '100%'
                            }}

                            id="contactInput"
                            name="contact"
                            country={"us"}
                            value={phone}
                            onChange={(e) => setPhone(e)}
                            isValid={(value, country) => {
                                if (value.length === 0) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }}
                        />
                        {/* </div> */}
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="label-text">Email</label>
                            <input type="email" className="form-control" value={email} placeholder="" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="label-text">How did you hear about us?</label>
                            <input type="text" className="form-control" value={reference} placeholder="" onChange={(e) => setReference(e.target.value)} required />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label className="label-text">Message</label>
                    <textarea className="form-control" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
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
        </>
    )
}
