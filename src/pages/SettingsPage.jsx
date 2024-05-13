import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // import the editor
import 'react-quill/dist/quill.snow.css'; // include stylesheets
import Sidebar from '../components/Sidebar';

import { put, get } from '../services/authService'

function SettingsPage() {
    const [smtpSettings, setSmtpSettings] = useState({
        host: '',
        port: '',
        user: '',
        pass: '',
    });
    const [registrationEmailTemplate, setRegistrationEmailTemplate] = useState('');
    const [passwordRecoveryEmailTemplate, setPasswordRecoveryEmailTemplate] = useState('');

    const handleSMTPChange = (e) => {
        const { name, value } = e.target;
        setSmtpSettings(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        put('/transport/update', smtpSettings)
        // Here you would typically send this data to the server
        console.log(smtpSettings, registrationEmailTemplate, passwordRecoveryEmailTemplate);
    };

    useEffect(() => {
        get('/transport')
            .then((response) => {
                console.log("response from config request", response.data)
                setSmtpSettings(response.data)
            })
    }, [])



    return (
        <>
        <Sidebar />
        <div className="flex-1 p-10">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="block text-gray-700 text-xl font-bold mb-2">SMTP Settings</h1>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Host:
                        <input type="text" name="host" value={smtpSettings.host} onChange={handleSMTPChange} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Port:
                        <input type="text" name="port" value={smtpSettings.port} onChange={handleSMTPChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username:
                        <input type="text" name="user" value={smtpSettings.user} onChange={handleSMTPChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password:
                        <input type="password" name="passw" value={smtpSettings.pass} onChange={handleSMTPChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                    </label>
                </div>

                
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Save Settings
                </button>
            </form>
        </div>
        </>
    );
}

export default SettingsPage;
