
import './ActivitiesPage.css'
import CardList from './CardList'
import FilterBar from './FilterBar'
import Pagination from './Pagination'
import SearchForm from './SearchForm'
export default function ActivitiesPage() {

  return (
    <section className="bg-black-bg-main text-white">
      <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        
        <div className='mb-6'>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-text mb-6">
            TOUTES LES ATTRACTIONS
          </h1>
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-white/70">24 résultats</p>
              <SearchForm />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <FilterBar />
              
            </div>
          </div>
        </div>
        {/* Grille des cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          <CardList />
          <CardList />
          <CardList />
          <CardList />
          <CardList />
          <CardList />
        </div>
        <Pagination/>
      </div>
    </section>  
  )
}
