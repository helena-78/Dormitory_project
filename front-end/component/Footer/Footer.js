import Image from "next/image";
import * as React from "react";
import styles from "./Footer.css"
import Divider from '@mui/material/Divider';

export default function () {
    const LogoImage = () => (<Image src="/LogoFooter.png" height={200} width={200} alt=""/>);

    return (
        <>
        <div id={'footer'}>
            <Divider></Divider>
            <div className="footerGroup">
                <LogoImage></LogoImage>
            </div>
            <div className="footerGroup">
                <div>
                    <h3>Адреса</h3>
                    <div><a style={{color: "black"}} href="https://maps.app.goo.gl/EEStFPDmQ3SVXyCbA">пр. Дмитра
                        Яворницького, 19 <br></br>Дніпро, Дніпропетровська область, Украина, 49000</a>
                    </div>
                </div>
                <div>
                    <h3>Номер телефону</h3>
                    <div><a href="tel:+380-56-744-73-39">+380 56 744-73-39</a></div>
                </div>
                <div>
                    <h3>E-mail</h3>
                    <div><a href="mailto:rector@nmu.org.ua">rector@nmu.org.ua</a></div>
                </div>
            </div>
            <div className="footerGroup">
                <div>
                    <h3>Контактні дані Приймальної комісії Національного технічного університету «Дніпровська
                        політехніка»: </h3>
                    <div>електронна адреса Приймальної комісії <a href="mailto:master@nmu.one">master@nmu.one</a>,
                        телефони <a href="tel:+380-67-447-51-52">(067) 447-51-52</a>, <a href="tel:+380-099-271-40-80">(099)
                            271-40-80</a>.
                    </div>
                </div>
                <div>
                    <h3>ГРАФІК РОБОТИ ПРИЙМАЛЬНОЇ КОМІСІЇ</h3>
                    <div>(4 корпус, кімн. 30) понеділок – п’ятниця з 10:00 до 12:00 та з 13:00 до 17:00</div>
                </div>
            </div>
            <Divider></Divider>
        </div>
    <div style={{height: '100vh'}}></div>
        </>
    );
}