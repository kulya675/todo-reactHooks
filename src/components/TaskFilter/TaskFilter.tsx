import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './TaskFilter.scss';

interface ITaskFilterProps {
  onChangeFilter(filterValue: string): void;
}

const TaskFilter: React.FC<ITaskFilterProps> = ({ onChangeFilter }) => {
  const [currentFilter, setCurrentFilter] = useState<string>('All');

  const changeFilterHandler = (event: React.SyntheticEvent) => {
    const { value } = event.target as HTMLButtonElement;
    setCurrentFilter(value);
    onChangeFilter(value);
  };

  const filterItems = ['All', 'Active', 'Completed'].map((elem) => {
    return (
      <li key={elem}>
        <button
          type="button"
          className={elem === currentFilter ? 'selected' : ''}
          value={elem}
          onClick={changeFilterHandler}
        >
          {elem}
        </button>
      </li>
    );
  });

  return <ul className="filters">{filterItems}</ul>;
};

TaskFilter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};

export default TaskFilter;
