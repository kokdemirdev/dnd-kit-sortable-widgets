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
import {
  calculateGroupedWidgets,
  defaultWidgets,
  IGroupedWidget,
  toggleVisibility,
  wait,
} from './constants.ts';
import { DragEndEvent } from '@dnd-kit/core';

interface DashboardLayoutContextType {
  loading: boolean;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  widgets: IGroupedWidget;
  setWidgets: Dispatch<SetStateAction<IGroupedWidget>>;
  draftWidgets: IGroupedWidget;
  setDraftWidgets: Dispatch<SetStateAction<IGroupedWidget>>;
  handleEdit: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  calculatedWidgets: IGroupedWidget;
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
  const [widgets, setWidgets] = useState<IGroupedWidget>(
    calculateGroupedWidgets(defaultWidgets)
  );
  const [draftWidgets, setDraftWidgets] = useState<IGroupedWidget>(
    calculateGroupedWidgets(defaultWidgets)
  );

  const calculatedWidgets = useMemo(
    () => (isEditing ? draftWidgets : widgets),
    [draftWidgets, isEditing, widgets]
  );

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
      return {
        left: toggleVisibility(prevState.left, widgetId),
        right: toggleVisibility(prevState.right, widgetId),
        bottom: toggleVisibility(prevState.bottom, widgetId),
      };
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
        toggleVisibilityItemById,
        handleDragEnd,
        calculatedWidgets
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
