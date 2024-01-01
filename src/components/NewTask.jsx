function NewTask({ filterList, handleCheck, handleDelete }) {  
    return (
        <>
            {filterList.map((item) => 
                (
                    <aside className="flex justify-between items-center p-2" key={item.id}>
                        <div className="flex gap-4">
                            <input type="checkbox" 
                            name={`task-${item.id}`} 
                            id={`task-${item.id}`}
                            checked={item.checked}
                            onChange={(e) => handleCheck(item.id, e.target.checked)}
                            className="appearance-none w-6 h-6 border rounded-sm
                            border-blackbg-gray-600 hover:bg-gray-700                            checked:bg-checkedIcon checked:bg-center checked:bg-no-repeat"
                            />
                            <p className={`text-white capitalize ${item.checked ? 'line-through' : 'no-underline'}`}>{item.task}</p>
                        </div>
                        <button className="material-symbols-outlined text-zinc-400 hover:text-white" onClick={() => handleDelete(item.id)}>close_small</button>
                    </aside>
                )
            )}
        </>
    )
}

export default NewTask