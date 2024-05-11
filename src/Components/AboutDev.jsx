
import "../Styles/AboutDev.css"
import team from "../team.json"
import AboutCard from "../Components/AboutCard"

export default function AboutDev(){

    return(
        <div className="aboutDev">
            <h3>Meet The Creators</h3>
           <div className="profileList">
            {team.map((engineers)=>{
                return(
                    <AboutCard key={engineers.name} engineers={engineers} />

                )
            })}
        </div>
<br />
<br />
<br />

        </div>
    )
}
