import NewTask from "./newTask"

function List({handleCheck, filterList, handleDelete}) {
    return (
        <section className="p-4">
           <NewTask handleCheck={handleCheck} filterList={filterList} handleDelete={handleDelete}/>
        </section>
    )
}

export default List