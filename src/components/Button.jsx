

export default function Button({onClick}){

    return(
        <>
            <input type="button" id="Btn" onClick={onClick}></input>
            <label htmlFor="Btn"></label>
        </>
    )
}