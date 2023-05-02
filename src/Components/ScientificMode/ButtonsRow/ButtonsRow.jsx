import "./ButtonsRow.css"
const ButtonsRow = (props) => {
    const {row} = props
    console.log(typeof row)
    return (
        <>
            <div className="row">
                {
                    row.map(button => {
                        return (
                            <>
                                {
                                    button.name === "rad" ? (
                                        <button id={button.name} className={"active-angle"}>{button.symbol}</button>
                                    ) : (
                                        <button id={button.name}>{button.symbol}</button>
                                    )
                                }
                            </>
                    )
                })
                }
            </div>
        </>
    )
}

export default ButtonsRow;