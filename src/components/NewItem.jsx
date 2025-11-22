import cross from "../assets/images/icon-cross.svg"

export default function NewItem({task,completed,onToggle,onDeleted,ID,ondragstart,ondragover,ondrop}){

    return(
        <>
            <div 
                className="item"
                draggable="true"
                onDragStart={ondragstart}
                onDragOver={ondragover}
                onDrop={ondrop}>
                <div className="Newtask">
                    <input
                    type="checkbox"
                    checked={completed}
                    onChange={onToggle}
                    id={`task-${ID}`}
                    />
                    <label htmlFor={`task-${ID}`}></label>
                    <p>{task}</p>
                </div>
                <button onClick={onDeleted}>
                    <img src={cross} alt="X"/>
                </button>
            </div>
        </>
    )
}