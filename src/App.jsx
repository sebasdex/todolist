import Header from "./components/Header";
import List from "./components/List"
import { useState, useEffect } from "react";

function App() {
  const saveLocal = JSON.parse(localStorage.getItem('task'));
  const [list, setList] = useState(saveLocal || []);
  const [taskName, setTaskName] = useState('');
  const [menu, setMenu] = useState([
    { name: 'todos', active: true },
    { name: 'pendientes', active: false },
    { name: 'realizados', active: false }
  ]);
  const [filterList, setFilterList] = useState(list);
  const date = new Date();
  const fullDay = date.toLocaleDateString('es-ES', { weekday: 'long' });
  const nameDayShort = date.toLocaleDateString('es-ES', { weekday: 'short' });
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString('es-ES', { month: 'long' });
  const year = date.getFullYear();
  const fullDate = `${nameDayShort} ${dayNumber} ${monthName}, ${year}`;


  const menuActive = (id) => {
    const updatedMenu = menu.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          active: true
        };
      }
      return {
        ...item,
        active: false
      };
    });
    setMenu(updatedMenu);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([taskName].includes('')) {
      return;
    }
    const random = Math.random().toString(32).substring(2);
    const dateID = Date.now().toString(32);
    const newID = random + dateID;
    const data = {
      id: newID,
      task: taskName,
      checked: false
    }
    setList([...list, data]);
    setTaskName('');
  }

  const handleCheck = (id, check) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: check
        };
      }
      return item;
    });
    setList(updatedList);
  }

  const handleDelete = (id) =>{
    const deleteList = list.filter(item => item.id !== id);
    setList(deleteList);
  }

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    setFilterList(list);
  }, [list])

  useEffect(() => {
    const menuAll = menu.find(item => item.name === 'todos' && item.active);
    const menuToDo = menu.find(item => item.name === 'pendientes' && item.active);
    const menuDone = menu.find(item => item.name === 'realizados' && item.active);
    if (menuAll) {
      setFilterList(list);
    }
    if(menuToDo){
      const toDoFilter = list.filter(item => !item.checked);
      setFilterList(toDoFilter);
    }
    if(menuDone){
      const doneFilter = list.filter(item => item.checked);
      setFilterList(doneFilter);
    }
  }, [menu, list]);

  return (
    <>
      <main className="bg-zinc-700 min-w-80 md:w-[30rem] h-[43rem] rounded-md overflow-y-auto relative z-50">
        <aside className="sticky top-0">
          <Header menu={menu} menuActive={menuActive}/>
          <section className="border-b border-zinc-800 h-60 text-white flex flex-col justify-evenly items-center text-center gap-5 mx-2 bg-zinc-700">
            <h1 className="text-3xl p-4 capitalize">{fullDay}
              <span className="block text-sm mt-2">{fullDate}</span>
            </h1>
            <form className="w-full px-4 flex items-center p-2 relative" onSubmit={handleSubmit}>
              <span className="material-symbols-outlined absolute p-2 text-zinc-400">list</span>
              <input type="text" name="taskName" id="taskName" className="bg-zinc-800 p-2 rounded-md w-full focus:outline-white outline-none outline-1 border-black border pl-10" placeholder="Add a task..." value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </form>
          </section>
        </aside>
        {list && list.length > 0 ? (
          <List filterList={filterList} handleCheck={handleCheck} handleDelete={handleDelete} />
        ) : (
          <section className="text-white h-96 flex justify-center items-center">
            <p className="text-lg text-zinc-400">No tienes tareas agregadas</p>
          </section>
        )}
      </main>
    </>
  )
}

export default App