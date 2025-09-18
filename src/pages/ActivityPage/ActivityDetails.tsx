export default function ActivityDetails() {
  return(
    <>
      <div>
        <div  className="text-white text-center mt-5">
          <h1 className="text-6xl font-bold">CinéZombie 4D</h1>
          <h2 className="text-2xl font-bold italic text-gray-400 mt-2 mb-5">- Spectacle -</h2>
          <h3 className="text-xl font-bold italic mb-3">Une aventure immersive au coeur du labo !</h3>
          <p className="max-w-200 mx-auto text-lg mt-7">Vous reprenez connaissance dans un laboratoire où les bruits et les odeurs vous sont inconnus. A peine réveillé, qu'une panne de courant vous plonge dans l'obscurité... Avez vous entendu ? Avez vous senti ? C'est tous vos sens qu'il vous faudra utiliser pour tenter de vous sortir de cet endroit... Aurez-vous l'audace de ne pas quitter la salle avant le dénouement ?<br />N'ayez crainte, ce n'est qu'un film... n'est-ce pas !</p>
        </div>
        <div className="flex justify-center my-8">
          <div className="flex mx-auto w-40 justify-center gap-1.5">
            <span aria-hidden className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"/>
            <span aria-hidden className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"/>
            <span aria-hidden className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"/>
            <span aria-hidden className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"/>
            <span aria-hidden className="h-8 w-6 bg-green-500 text-green-500 [mask:url(/icon/star-full.svg)_no-repeat_center/contain]"/>
            
          </div>
          <div className="flex mx-auto  w-40 justify-center">
             <img className="max-w-10" src="icon/crane_zombie.svg" alt="Crane de niveau" />
             <img className="max-w-10" src="icon/crane_zombie.svg" alt="Crane de niveau" />
             <img className="max-w-10" src="icon/crane_zombie.svg" alt="Crane de niveau" />
          </div>
          <div className="flex mx-auto w-40 justify-center">
            <img className="max-w-10" src="/icon/heart.svg" alt="Déconseillée aux personnes souffrant de troubles cardiaques" />
            <img className="max-w-10" src="/icon/disabled.svg" alt="Accessible aux personnes à mobilité réduite" />
          </div>
        </div>
      </div>
    </>
  )
}