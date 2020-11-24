import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './Timer.scss';

interface ITimerProps {
  id: string;
  time: number;
  onPlayTimer(id: string): void;
  onPauseTimer(id: string): void;
}

const Timer: React.FC<ITimerProps> = ({ id, time, onPlayTimer, onPauseTimer }) => {
  const timerValue = format(time, 'mm:ss');

  return (
    <div className="timer">
      <button
        className=" timer-play"
        type="button"
        label="play"
        onClick={() => {
          onPlayTimer(id);
        }}
      />
      <button
        className=" timer-pause"
        type="button"
        label="pause"
        onClick={() => {
          onPauseTimer(id);
        }}
      />
      <span className="timer-count">{timerValue}</span>
    </div>
  );
};

Timer.propTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  onPlayTimer: PropTypes.func.isRequired,
  onPauseTimer: PropTypes.func.isRequired,
};

export default Timer;
