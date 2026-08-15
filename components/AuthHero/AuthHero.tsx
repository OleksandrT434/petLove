import css from './AuthHero.module.css'


type AuthHeroProps = {
    animal: string;
    name?: string;
    description?: string;
    birthday?: string;
}

export default function AuthHero(
    { animal, name, description, birthday }: AuthHeroProps
) {
    return (
        <section className={css.container}>
            <div className={css.imageContainer}>
                <div className={css.animal}>{animal}</div>
            </div>
            <div className={css.textContainer}>
                <div className={css.nameAndBirthday}>
                     <p className={css.name}>{name}</p>
                     <p className={css.birthday}>Birthday: <span className={css.birthdayValue}>{birthday}</span> </p>
               </div>
                      <p className={css.description}>{description}</p>
            </div>
        </section>
    )
}
