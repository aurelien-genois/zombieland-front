import LinkButton from "./LinkButton";

export default function Card () {
    return (
        <>
        <div className="relative max-w-sm">
        <img className="rounded-xl relative" src="/img/activities/activity1.webp" alt="Image de l'activité" />
            <div className="bg-black-500/70 absolute bottom-10 left-0 right-0 text-white text-center">
                <h2 className="z-10 mt-3 text-3xl font-bold text-white">Appocalypse Drop</h2>
                <p className="z-10 gap-y-1 overflow-hidden text-sm font-bold leading-6 text-gray-300">Laissez-vous chuter !</p>
                <img src="/icon/crane_zombie.svg" className="m-auto max-w-8" alt="Icone d'un crane" />
                <LinkButton linkBtnClass={"w-38 mb-3 bg-red-bg-btn hover:bg-red-500 rounded-xl py-1 text-white font-bold border-3 border-grey-border-btn m-auto"} textBtn={"Découvrir..."} />  
            </div>
        </div>
           
        </>
    )
}