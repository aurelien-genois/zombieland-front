import LinkButton from "./LinkButton";

export default function Header (){
    return (
        <div className=" border-b-3 border-red-border-banner bg-black-bg-header max-h-30 fixed left-0 right-0 mt-0 flex justify-between z-50"  >
            <img className="max-w-40" src="/icon/logo.svg " alt="" />
            <nav className="text-white max-w-150  text-xl flex items-center">
                <ul className="flex ">
                    <li className="mr-3">Accueil</li>
                    <li className="mr-3">Attractions</li>
                    <li className="mr-3">Restauration</li>
                    <li>Reservation</li>
                </ul>
            </nav>
            <div className="flex flex-col items-center">
                <img className="max-w-10" src="/icon/account_zombie.svg" alt="" />
                <LinkButton linkBtnClass={"w-30 mb-3 bg-red-bg-btn rounded-xl py-1 text-white font-bold border-3 border-grey-border-btn m-auto"} textBtn={"Découvrir..."} /> 
            </div>
            
        </div>   
    )
}