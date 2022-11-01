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
  Selected: string;
  eventEnd: string;
  eventAction: string;
}

//https://stackoverflow.com/questions/70157050/how-to-pass-an-array-as-a-prop-and-render-in-child-component-in-typescript-react

export interface IEventProps {
  eventValues: IEvents[];
}

export interface IClose {
  closeModal(): void;
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
