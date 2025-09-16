import LinkButton from "./LinkButton";

export default function Card () {
    return (
        <>
            <img className="rounded-xl" src="/img/activities/activity1.webp" alt="Image de l'activité" />
            <div className="bg-dark opacity-70">
                <h2>Nom activité</h2>
                <p>Phrase d'accroche</p>
                <img src="" alt="Icone d'un crane" />
                <LinkButton linkBtnClass={"w-38 bg-red-bg-btn rounded-xl py-1 text-white border-3 border-grey-border-btn"} textBtn={"Découvrir..."} />  
            </div>
        </>
    )
}