import DataGrid from '@inovua/reactdatagrid-enterprise';
import { getDocs } from 'firebase/firestore';
import React from 'react';
import { IEntry, IEventProps } from 'types';

import '@inovua/reactdatagrid-enterprise/index.css';

import { createCollection } from '@/lib/firebaseConfig';

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
    defaultFlex: 1,
    header: 'Status',
  },
  { name: 'counselor', defaultFlex: 1, header: 'Counselor' },
  {
    name: 'client',
    defaultFlex: 1,
    header: 'Client',
    enableColumnFilterContextMenu: true,
  },
  { name: 'counselingDate', defaultFlex: 1, header: 'Counseling Date' },
  { name: 'state', defaultFlex: 1, header: 'State' },
  { name: 'billed', defaultFlex: 1, header: 'Billed' },
  { name: 'notes', defaultFlex: 6, header: 'Notes' },
];

export default function Grid() {
  const [enableColumnFilterContextMenu] = React.useState(true);
  const [data, setData] = React.useState<string[]>([]);
  const [showZebraRows] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      const eventsCol = createCollection<IEntry>('Clients Notes');
      const getEventsDocs = await getDocs(eventsCol);

      // Returns values
      const noteValues: Array<string> = [];

      getEventsDocs.docs.forEach((eventDoc) => {
        const event = eventDoc.data();

        let key: keyof IEntry['noteEntries'];

        const notesArray = event.noteEntries;

        for (key in notesArray) {
          noteValues.push(notesArray[key]);
        }
      });

      setData(noteValues);
    };

    getData();
  }, []);

  return (
    <div>
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
    </div>
  );
}
