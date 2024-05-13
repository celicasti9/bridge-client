function Footer() {
    return (
        <footer id="footer" className="bg-blue-950 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <div>
                            <a href="./">
                                <img src="/footer-logo.png" alt="Site Logo" className="img-fluid w-20"/>
                            </a>
                            <p className="text-white text-sm mt-2">Somos una empresa dedicada a ofrecer guardias de seguridad. Estos servicios incluyen armado, desarmado, paramédicos, patrullaje, supervisión y seguridad virtual.</p>
                            <div>
                                <ul className="flex space-x-4 mt-2">
                                    <li>
                                        <a href="https://www.facebook.com/bridgepuertorico" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                            <i className="fab fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/bridgesecuritypr/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/channel/UC95XK1MgeRpchund-IX0Vpw" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-700">Enlaces principales</h4>
                        <ul className="mt-2 space-y-1">
                            <li><a href="/" className="text-white hover:text-indigo-800">Home</a></li>
                            <li><a href="./about-us.html" className="text-white hover:text-indigo-800">Acerca de</a></li>
                            <li><a href="./careers.html" className="text-white hover:text-indigo-800">Carreras</a></li>
                            <li><a href="./contact-us.html" className="text-white hover:text-indigo-800">Contáctenos</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-700">Contáctenos</h4>
                        <div className="flex items-center mt-2">
                            <i className="fa-solid fa-envelope mr-2"></i>
                            <div>
                                <p className="text-sm text-white">Correo electrónico</p>
                                <a href="mailto:Info@bridgesecuritypr.com" className="text-white hover:text-indigo-800">Info@bridgesecuritypr.com</a>
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <i className="fa-solid fa-phone mr-2"></i>
                            <div>
                                <p className="text-sm text-white">Oficina</p>
                                <a href="tel:7877877125" className="text-white hover:text-indigo-800">787-787-7125</a>
                            </div>
                        </div>
                        <div className="flex items-center mt-2">
                            <i className="fa-solid fa-phone mr-2"></i>
                            <div>
                                <p className="text-sm text-white">Ventas</p>
                                <a href="tel:7877877125" className="text-white hover:text-indigo-800">787-974-7777</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-700">Dirección Postal</h4>
                        <p className="text-sm mt-2 text-white">
                            P.O. Box 4215 <br/> Bayamón, Puerto Rico 00958
                        </p>
                        <h4 className="font-semibold mt-4 text-red-700">Ubicación</h4>
                        <p className="text-sm text-white">
                            L15 Ave. Magnolia<br/> Bayamón, Puerto Rico 00956
                        </p>
                        <h4 className="font-semibold mt-4 text-red-700">Horas de oficina</h4>
                        <p className="text-sm text-white">Lunes a Viernes 8:00 am a 5:00 pm</p>
                    </div>
                </div>
                <div className="text-center bg-red-700 mt-4">
                    <p className="text-sm text-white">Copyright © 2024 Bridge Security Services INC. todos los derechos reservados</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
