interface ILinkButtonProps {
    linkBtnClass: string,
    textBtn: string
}

export default function LinkButton ({linkBtnClass, textBtn}: ILinkButtonProps){
    return (
        <div className={`${linkBtnClass}`}>
            <a  href="">{textBtn}</a>
        </div>
    )
}