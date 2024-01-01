function Header({menu, menuActive}) {
    return (
        <section className="text-white p-2 bg-zinc-700">
            <ul className="flex justify-evenly border-b border-zinc-800">
                {menu.map((item, index) => 
                    (
                    <li key={index} onClick={() => menuActive(index)}
                    className={`border-b-2 p-2 cursor-pointer capitalize ${item.active ? 'border-red-600' : 'border-transparent'}`}>
                        {item.name}
                    </li>
                    )
                )}
            </ul>
        </section>
    )
}
export default Header