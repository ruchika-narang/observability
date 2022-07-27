/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
import { EuiFlexItem, EuiFlexGroup } from '@elastic/eui';
import React from 'react';
import _ from 'lodash';
import { AGGREGATION_OPTIONS } from '../../../../../common/constants/explorer';
import { EmptyPlaceholder } from '../../../event_analytics/explorer/visualizations/shared_components/empty_placeholder';
import { TabContext } from '../../../event_analytics/hooks';

export const Metrics = ({ visualizations }: any) => {
  const { vis } = visualizations;
  const {
    data,
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const dataConfigTab =
    visualizations.data?.rawVizData?.metrics?.dataConfig &&
    visualizations.data.rawVizData.metrics.dataConfig;

  const calculateValue = (fieldObj: any) => {
    if (fieldObj.aggregation === 'COUNT') {
      return data[fieldObj.label].length;
    } else if (fieldObj.aggregation === 'AVERAGE') {
      return _.meanBy(data[fieldObj.label]);
    }
    return '888.2';
  };

  return (
    <div style={{ fontSize: '16px', height: '1180px' }}>
      {dataConfigTab && dataConfigTab.metrics.length > 0 ? (
        <EuiFlexGroup justifyContent="spaceAround" alignItems="center" style={{ height: '100%' }}>
          {dataConfigTab.metrics.map((metric) => {
            if (metric.aggregation !== '' && metric.label !== '') {
              return (
                <EuiFlexItem grow={false} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', fontWeight: '700' }}>
                    {calculateValue(metric)}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '400' }}>{metric.label}</div>
                </EuiFlexItem>
              );
            }
          })}
        </EuiFlexGroup>
      ) : (
        <EmptyPlaceholder icon={visualizations?.vis?.iconType} />
      )}
    </div>
  );
};
