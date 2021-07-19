import './QuickStartTileHeader.scss';
import * as React from 'react';
import { Label, Title } from '@patternfly/react-core';
import OutlinedClockIcon from '@patternfly/react-icons/dist/js/icons/outlined-clock-icon';
import { StatusIcon } from '@console/shared';
import { QuickStartContext, QuickStartContextValues } from '../utils/quick-start-context';
import { QuickStartStatus, QuickStartType } from '../utils/quick-start-types';

type QuickStartTileHeaderProps = {
  status: string;
  duration: number;
  name: string;
  type?: QuickStartType;
};

const statusColorMap = {
  [QuickStartStatus.COMPLETE]: 'green',
  [QuickStartStatus.IN_PROGRESS]: 'purple',
  [QuickStartStatus.NOT_STARTED]: 'grey',
};

const QuickStartTileHeader: React.FC<QuickStartTileHeaderProps> = ({
  status,
  duration,
  name,
  type,
}) => {
  const { getResource } = React.useContext<QuickStartContextValues>(QuickStartContext);

  const statusLocaleMap = {
    [QuickStartStatus.COMPLETE]: getResource('Complete'),
    [QuickStartStatus.IN_PROGRESS]: getResource('In progress'),
    [QuickStartStatus.NOT_STARTED]: getResource('Not started'),
  };

  return (
    <div className="co-quick-start-tile-header">
      <Title headingLevel="h3" data-test="title">
        {name}
      </Title>
      <div className="co-quick-start-tile-header__status">
        {type && (
          <Label className="co-quick-start-tile-header--margin" color={type.color}>
            {type.text}
          </Label>
        )}
        {duration && (
          <Label
            variant="outline"
            data-test="duration"
            icon={<OutlinedClockIcon />}
            className="co-quick-start-tile-header--margin"
          >
            {getResource('{{duration, number}} minutes', duration).replace(
              '{{duration, number}}',
              duration,
            )}
          </Label>
        )}
        {status !== QuickStartStatus.NOT_STARTED && (
          <Label
            variant="outline"
            color={statusColorMap[status]}
            icon={<StatusIcon status={status} />}
            data-test="status"
          >
            {statusLocaleMap[status]}
          </Label>
        )}
      </div>
    </div>
  );
};

export default QuickStartTileHeader;
