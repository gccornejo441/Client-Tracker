import {
  Control,
  FieldName,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

export interface IEvents {
  _id: number;
  eventName: string;
  eventMemo: string;
  eventStart: Date;
  eventEnd: string;
  eventAction: string;
}

export interface IProject {
  _id: number;
  status: string;
  counselor: string;
  client: string;
  counselingDate: string;
  timeNoteSubmitted: string;
  state: string;
  clientGrant: string;
  billed: string;
  notes: string;
}

//https://stackoverflow.com/questions/70157050/how-to-pass-an-array-as-a-prop-and-render-in-child-component-in-typescript-react

export interface IEventProps {
  eventValues: IProject[];
}

export interface IClose {
  closeModal(): void;
}

export interface IToggleState {
  enableToggle(checked: boolean): void;
  enabled: boolean;
}

export interface ISwitch {
  switchLabel: string;
}

export interface IPlannerProps {
  isOpen: boolean;
  closeModal(): void;
  openModal(event: React.MouseEvent<HTMLButtonElement>): void;
}

export type UseControllerProps<TFieldValues extends FieldValues = FieldValues> =
  {
    name: FieldName<TFieldValues>;
    rules?: Exclude<
      RegisterOptions,
      'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >;
    onFocus?: () => void;
    defaultValue?: unknown;
    control?: Control<TFieldValues>;
  };
