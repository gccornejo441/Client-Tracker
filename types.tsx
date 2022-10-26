export interface IEvents {
  eventName: string;
  eventMemo: string;
  eventStart: string;
  eventEnd: string;
  eventAction: string;
}

//https://stackoverflow.com/questions/70157050/how-to-pass-an-array-as-a-prop-and-render-in-child-component-in-typescript-react

export interface IEventProps {
  tableData: IEvents[];
}
