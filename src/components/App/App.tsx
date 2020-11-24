/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Header from '../Header';
import TaskList from '../TaskList';
import Footer from '../Footer';

import './App.scss';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ButtonHTMLAttributes<T> {
    label?: string;
  }
}

interface ITodos {
  task: string;
  id: string;
  createdDate: number;
  completed: boolean;
  editing: boolean;
  time: number;
  timerState: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timerID: any;
}

const App: React.FC = () => {
  const initialTodos = () => [
    {
      task: 'Completed Task',
      id: 'C',
      createdDate: Date.now(),
      completed: false,
      editing: false,
      time: 600000,
      timerState: false,
      timerID: 0,
    },
    {
      task: 'Editing task',
      id: 'E',
      createdDate: Date.now(),
      completed: false,
      editing: false,
      time: 10000,
      timerState: false,
      timerID: null,
    },
    {
      task: 'Active task',
      id: 'A',
      createdDate: Date.now(),
      completed: false,
      editing: false,
      time: 6000,
      timerState: false,
      timerID: null,
    },
  ];
  const [todos, setTodos] = useState<Array<ITodos>>(initialTodos);

  const [filter, setFilter] = useState<string>('All');

  const addHandler = (task: string, time: number) => {
    const id = task.charAt(0) + String(Date.now());
    const newTodos = {
      task,
      id,
      createdDate: Date.now(),
      completed: false,
      editing: false,
      time,
      timerState: false,
      timerID: 0,
    };
    setTodos([...todos, newTodos]);
  };

  const deleteHandler = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changePropertyHandler = (arr: Array<ITodos>, id: string, propName: string, value: any) => {
    const newArr: Array<ITodos> = arr.map((elem: ITodos) => {
      if (elem.id !== id) return elem;

      const newElem: ITodos = { ...elem };

      if (propName === 'completed' || propName === 'editing') {
        if (value) {
          newElem.completed = value;
          return newElem;
        }
        newElem[propName] = !newElem[propName];
      }

      if (propName === 'task') {
        newElem.task = value;
        newElem.editing = false;
      }

      if (propName === 'timerState' && value === true) {
        if (elem.timerState) {
          return newElem;
        }
        newElem.timerID = setInterval(
          () => setTodos((prevTodos) => changePropertyHandler(prevTodos, id, 'time', null)),
          1000
        );
        newElem.timerState = true;
      }

      if (propName === 'timerState' && value === false) {
        clearInterval(newElem.timerID);
        newElem.timerState = false;
      }

      if (propName === 'time') {
        if (newElem.time === 0) {
          clearInterval(elem.timerID);
          setTodos((prevTodos) => changePropertyHandler(prevTodos, id, 'completed', true));
          return newElem;
        }
        newElem.time -= 1000;
      }

      return newElem;
    });
    return newArr;
  };

  const completeToggleHandler = (id: string) => {
    setTodos(changePropertyHandler(todos, id, 'completed', null));
  };

  const editToggleHandler = (id: string) => {
    setTodos(changePropertyHandler(todos, id, 'editing', null));
  };

  const editTaskHandler = (id: string, task: string) => {
    setTodos(changePropertyHandler(todos, id, 'task', task));
  };

  const changeFiltreHandler = (filterValue: string) => {
    setFilter(filterValue);
  };

  const clearCompletedHandler = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const playTimerHandler = (id: string) => {
    setTodos(changePropertyHandler(todos, id, 'timerState', true));
  };

  const pauseTimerHandler = (id: string) => {
    setTodos(changePropertyHandler(todos, id, 'timerState', false));
  };

  const leftCounter = todos.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <Header onAdd={addHandler} />
      <section className="main">
        <TaskList
          todos={todos}
          filter={filter}
          onDelete={deleteHandler}
          onCompleteToggle={completeToggleHandler}
          onEditingToggle={editToggleHandler}
          onEditTask={editTaskHandler}
          onPlayTimer={playTimerHandler}
          onPauseTimer={pauseTimerHandler}
        />
        <Footer
          leftCounter={leftCounter}
          onChangeFilter={changeFiltreHandler}
          onClearCompleted={clearCompletedHandler}
        />
      </section>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
