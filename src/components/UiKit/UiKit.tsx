import Banner from './Banner'
import Card from './Card'
import DirectLink from './DirectLink'
import LinkButton from '../Utils/LinkButton'
import './UiKit.css'
export default function UiKit(){
    return (
        <div>
            <Banner /> 
            <LinkButton linkBtnClass={"w-38 bg-green-bg-btn rounded-xl py-1 text-white border-3 border-grey-border-btn"} textBtn={"CONTACTEZ NOUS"} /> 
            <LinkButton linkBtnClass={"w-38 bg-red-bg-btn rounded-xl py-1 text-white border-3 border-grey-border-btn"} textBtn={"RESERVATION"} />   
            <Card /> 
            <DirectLink />

            <form action="" method="post">
                <input type="text" />
            </form>
        </div>
        
    )
}