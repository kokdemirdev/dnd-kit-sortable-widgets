import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { defaultWidgets, IGroupedWidget, IWidget } from './constants.ts';
import { DragEndEvent } from '@dnd-kit/core';
import { wait } from './utils.ts';

interface DashboardLayoutContextType {
  loading: boolean;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  widgets: IWidget[];
  setWidgets: Dispatch<SetStateAction<IWidget[]>>;
  draftWidgets: IWidget[];
  setDraftWidgets: Dispatch<SetStateAction<IWidget[]>>;
  handleEdit: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  calculatedWidgets: IWidget[];
  groupedWidgets: IGroupedWidget;
  toggleVisibilityItemById: (widgetId: number) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

const DashboardLayoutContext = createContext<
  DashboardLayoutContextType | undefined
>(undefined);

interface DashboardLayoutProviderProps {
  children: ReactNode;
}

export const DashboardLayoutProvider: React.FC<
  DashboardLayoutProviderProps
> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<IWidget[]>(defaultWidgets);
  const [draftWidgets, setDraftWidgets] = useState<IWidget[]>(defaultWidgets);

  const calculatedWidgets: IWidget[] = useMemo(() => {
    return isEditing ? draftWidgets : widgets;
  }, [draftWidgets, isEditing, widgets]);

  const groupedWidgets: IGroupedWidget = useMemo(() => {
    return {
      left: calculatedWidgets.filter((i) => i.group === 1).slice(0, 3),
      right: calculatedWidgets.filter((i) => i.group === 2),
      bottom: calculatedWidgets.filter((i) => i.group === 1).slice(3),
    };
  }, [calculatedWidgets]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      setLoading(true);
      await wait(3000);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const toggleVisibilityItemById = useCallback((widgetId: number) => {
    setDraftWidgets((prevState) => {
      return prevState.map((item) => {
        return item.id === widgetId
          ? { ...item, visible: !item.visible }
          : item;
      });
    });
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    console.log(event);
  }, []);

  return (
    <DashboardLayoutContext.Provider
      value={{
        loading,
        isEditing,
        setIsEditing,
        widgets,
        setWidgets,
        draftWidgets,
        setDraftWidgets,
        handleEdit,
        handleSave,
        handleCancel,
        groupedWidgets,
        calculatedWidgets,
        toggleVisibilityItemById,
        handleDragEnd,
      }}
    >
      {children}
    </DashboardLayoutContext.Provider>
  );
};

export const useDashboardLayout = (): DashboardLayoutContextType => {
  const context = useContext(DashboardLayoutContext);
  if (!context) {
    throw new Error(
      'useDashboardLayout must be used within a DashboardLayoutProvider'
    );
  }
  return context;
};
