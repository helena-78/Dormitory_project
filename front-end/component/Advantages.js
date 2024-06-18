import Image from "next/image"

export const Advantages = () => {
  return (
    <div className="container">
        <div className="advantage-block">
            <div className="advantage-icon">
                <Image 
                    src="/icons/wifi.png"
                    width={70}
                    height={70}   
                />
            </div>
            <p className="advantage-text">На території гуртожитку надається безкоштовний WiFi.</p>
        </div>
        <div className="advantage-block">
            <div className="advantage-icon">
                <Image 
                    src="/icons/home.png"
                    width={75}
                    height={75}   
                />
            </div>
            <p className="advantage-text">Хороше співвідношення ціни та якості</p>
        </div>
        <div className="advantage-block">
            <div className="advantage-icon">
                <Image 
                    src="/icons/geo.png"
                    width={85}
                    height={85}   
                />
            </div>
            <p className="advantage-text">Зручне розташування гуртожитку</p>
        </div>
    </div>
  )
}
