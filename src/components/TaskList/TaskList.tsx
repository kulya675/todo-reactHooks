/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './TaskList.scss';

interface ITodoListProps {
  todos: Array<{
    task: string;
    id: string;
    createdDate: number;
    completed: boolean;
    editing: boolean;
    time: number;
  }>;
  filter: string;
  onDelete(id: string): void;
  onCompleteToggle(id: string): void;
  onEditingToggle(id: string): void;
  onEditTask(id: string, task: string): void;
  onPlayTimer(id: string): void;
  onPauseTimer(id: string): void;
}

const TaskList: React.FC<ITodoListProps> = ({
  todos,
  filter,
  onDelete,
  onCompleteToggle,
  onEditingToggle,
  onEditTask,
  onPlayTimer,
  onPauseTimer,
}) => {
  const filteredArr = todos.filter((task) => {
    switch (filter) {
      case 'All':
        return true;
      case 'Active':
        return !task.completed;
      case 'Completed':
        return task.completed;
      default:
        return true;
    }
  });

  const tasks = filteredArr.map((todo) => {
    const { task, id, createdDate, completed, editing, time } = todo;
    return (
      <Task
        key={id}
        task={task}
        id={id}
        createdDate={createdDate}
        completed={completed}
        editing={editing}
        time={time}
        onDelete={onDelete}
        onCompleteToggle={onCompleteToggle}
        onEditingToggle={onEditingToggle}
        onEditTask={onEditTask}
        onPlayTimer={onPlayTimer}
        onPauseTimer={onPauseTimer}
      />
    );
  });

  return <ul className="todo-list">{tasks}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCompleteToggle: PropTypes.func.isRequired,
  onEditingToggle: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  onPlayTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
};

export default TaskList;
