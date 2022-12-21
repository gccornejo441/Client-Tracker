import DataGrid from '@inovua/reactdatagrid-enterprise';
import React from 'react';
import { IEventProps, IProject } from 'types';

import '@inovua/reactdatagrid-enterprise/index.css';

const renderRowDetails = ({ data }: { data: IEventProps }) => {
  return (
    <div style={{ padding: 20 }}>
      <h3>Client Details:</h3>
      <table>
        <tbody>
          {Object.keys(data).map((name) => {
            return (
              <tr key={name}>
                <td>{name}</td>
                <td>{data[name]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const gridStyle = { minHeight: 550, margin: 10 };

const filterValue = [
  { name: 'status', operator: 'startsWith', type: 'string', value: '' },
  { name: 'client', operator: 'startsWith', type: 'string', value: '' },
];

const columns = [
  {
    name: 'status',
    lockedRowCellRender: (value: string) => {
      return value + '!';
    },
    defaultFlex: 2,
    header: 'Status',
  },
  { name: 'counselor', defaultFlex: 1, header: 'Counselor' },
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

const Grid = (props: IEventProps) => {
  const { eventValues } = props;

  const [enableColumnFilterContextMenu] = React.useState(true);
  const [data, setData] = React.useState<IProject[]>([]);
  const [showZebraRows] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      if (eventValues) {
        setData(eventValues);
      }
    };
    getData();
  }, [eventValues]);

  return (
    <DataGrid
      licenseKey={process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}
      defaultFilterValue={filterValue}
      pagination
      idProperty='_id'
      style={gridStyle}
      columns={columns}
      columnMinWidth={300}
      columnMaxWidth={400}
      rowExpandHeight={250}
      renderRowDetails={renderRowDetails}
      columnDefaultWidth={500}
      showZebraRows={showZebraRows}
      dataSource={data}
      enableColumnFilterContextMenu={enableColumnFilterContextMenu}
    />
  );
};

export default Grid;
