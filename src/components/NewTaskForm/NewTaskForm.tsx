import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.scss';

export interface ITodoFormProps {
  onAdd(title: string, time: number): void;
}

const NewTaskForm: React.FC<ITodoFormProps> = ({ onAdd }) => {
  const [task, setTask] = useState<string>('');
  const [min, setMin] = useState<string>('');
  const [sec, setSec] = useState<string>('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    switch (name) {
      case 'task':
        setTask(value);
        break;
      case 'min':
        setMin(value);
        break;
      case 'sec':
        setSec(value);
        break;

      default:
        break;
    }
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!task) {
      return;
    }
    const time = (Number(min) * 60 + Number(sec)) * 1000;
    onAdd(task, time);
    setTask('');
    setMin('');
    setSec('');
  };

  return (
    <form className="new-todo-form" onSubmit={submitHandler}>
      <input
        className="new-todo"
        name="task"
        placeholder="What needs to be done?"
        value={task}
        onChange={changeHandler}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        name="min"
        max={60}
        placeholder="Min"
        value={min}
        onChange={changeHandler}
      />
      <input
        className="new-todo-form__timer"
        type="number"
        name="sec"
        max={60}
        placeholder="Sec"
        value={sec}
        onChange={changeHandler}
      />
      <input className="submit" type="submit" onSubmit={submitHandler} />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;
