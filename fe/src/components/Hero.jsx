import React from 'react'
import '../CSS/globalCss.css';

const Hero = () => {
    return (
        <div className='container-hero'>
            <div className='row-hero'>
                <div className='col-hero'>
                    <img src="https://res.cloudinary.com/do1eu7dnn/image/upload/v1695891139/GaberBlog_logo_completo_no_background_oz46kq.png" alt="Logo_Completo.png" />
                    <p>
                    "Non scegliamo come siamo partiti in questa vita. 
                    La vera grandezza è ciò che facciamo con ciò che ci tocca." 
                    ~ Sully (Uncharted 3)
                    </p>
                </div>
                <div className='col-hero-1'>
                    <p>
                         Siate liberi di scoprire il mondo dei videogiochi nel modo più bello di tutti. Leggete e scrivete cosa pensate
                          del vostro gioco preferito e cresciamo come community col solo scopo di divertirci!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Hero