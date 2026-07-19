import Select from "./Select"
import css from "./PetsFilters.module.css"
import SearchInput from "@/components/Searsh/SearchInput";




export default function PetsFilters() {
    
    return(
       <section className={css.filters}>
            <SearchInput basePath="/find-pet" />

            <div className={css.selects}>
                <Select placeholder="Category" />
                <Select placeholder="Species" />
                <Select placeholder="Sex" />
                <Select placeholder="Location" />
            </div>
            <button>Search</button>
            <button>Reset</button>
       </section>
       )
}