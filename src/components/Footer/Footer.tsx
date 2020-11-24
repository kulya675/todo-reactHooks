import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TaskFilter';

import './Footer.scss';

interface IFooterProps {
  leftCounter: number;
  onChangeFilter(filterValue: string): void;
  onClearCompleted(): void;
}

const Footer: React.FC<IFooterProps> = ({ leftCounter, onChangeFilter, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{`${leftCounter} items left`}</span>
      <TaskFilter onChangeFilter={onChangeFilter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  leftCounter: PropTypes.number.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
