import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import React from 'react';
import { IEventProps, IProject } from 'types';

import '@inovua/reactdatagrid-enterprise/index.css';

const gridStyle = { minHeight: 550, marginTop: 10 };

const filterValue = [
  { name: 'status', operator: 'startsWith', type: 'string', value: '' },
  { name: 'client', operator: 'startsWith', type: 'string', value: '' },
];

const columns = [
  { name: 'status', defaultFlex: 2, header: 'Status' },
  { name: 'counselor', defaultFlex: 2, header: 'Counselor' },
  {
    name: 'client',
    defaultFlex: 3,
    header: 'Client',
    enableColumnFilterContextMenu: true,
  },
  { name: 'counselingDate', defaultFlex: 2, header: 'Counseling Date' },
  { name: 'state', defaultFlex: 1, header: 'State' },
  { name: 'billed', defaultFlex: 1, header: 'Billed' },
  { name: 'notes', defaultFlex: 6, header: 'Notes' },
];

export default function Grid(props: IEventProps) {
  const [enableColumnFilterContextMenu] = React.useState(true);
  const [data, setData] = React.useState<IProject[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      if (props.eventValues) {
        setData(props.eventValues);
      }
    };
    getData();
  }, [props.eventValues]);

  return (
    <div>
      <ReactDataGrid
        licenseKey={process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}
        idProperty='id'
        style={gridStyle}
        defaultFilterValue={filterValue}
        columns={columns}
        pagination
        dataSource={data}
        defaultLimit={10}
        enableColumnFilterContextMenu={enableColumnFilterContextMenu}
      />
    </div>
  );
}
