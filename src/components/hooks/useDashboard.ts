import {useCallback, useState} from 'react';
import {
  useGetFamiliesOverviewQuery,
  useGetEventsOverviewQuery,
  FamilyOverview,
} from '../../store/slices/dashboardApiSlice';
import {Event_} from '../events/types';

// TypeScript interfaces for structured dashboard data
export interface DashboardFamiliesOverview {
  population: number | string;
  families: number | string;
  demographics: {
    children: number | string;
    adults: number | string;
    seniors: number | string;
  };
  genderDistribution: {
    male: number;
    female: number;
    malePercent: number;
    femalePercent: number;
  };
}

export interface DashboardLatestEvent {
  title: string;
  date: string;
  head: string;
  status: string;
  finances: {
    contribution: number;
    expense: number;
    fundingProgress: number;
  };
}

export interface DashboardUI {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
}

export interface DashboardData {
  familiesOverview: DashboardFamiliesOverview;
  latestEvent: DashboardLatestEvent;
  ui: DashboardUI;
}

export function getEventStatus(dateStr: string): string {
  if (!dateStr) return '-';
  const today = new Date();
  const eventDate = new Date(dateStr);
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  if (eventDate.getTime() > today.getTime()) return 'Upcoming';
  if (eventDate.getTime() === today.getTime()) return 'Current';
  if (eventDate.getTime() < today.getTime()) return 'Last Event';
  return '-';
}

function getErrorMessage(error: any): string {
  if (!error) return '';
  if (typeof error === 'string') return error;
  if (
    'status' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'message' in error.data
  ) {
    return error.data.message;
  }
  if ('message' in error) return error.message;
  return JSON.stringify(error);
}

export const useDashboard = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data
  const {
    data: familyData,
    isLoading: familyLoading,
    isError: familyError,
    refetch: refetchFamily,
    error: familyErrorObj,
  } = useGetFamiliesOverviewQuery();
  const {
    data: eventData,
    isLoading: eventLoading,
    isError: eventError,
    refetch: refetchEvent,
    error: eventErrorObj,
  } = useGetEventsOverviewQuery();

  // Pull to refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchFamily(), refetchEvent()]);
    setRefreshing(false);
  }, [refetchFamily, refetchEvent]);

  // Family stats
  const family: FamilyOverview | undefined = familyData;
  const population = familyLoading ? '-' : family?.totalPopulation ?? 0;
  const families = familyLoading ? '-' : family?.families ?? 0;
  const children = familyLoading ? '-' : family?.children ?? 0;
  const adults = familyLoading ? '-' : family?.adults ?? 0;
  const seniors = familyLoading ? '-' : family?.seniors ?? 0;
  const male = familyLoading ? 0 : family?.male ?? 0;
  const female = familyLoading ? 0 : family?.female ?? 0;
  const totalGender = male + female;
  const malePercent = totalGender ? Math.round((male / totalGender) * 100) : 0;
  const femalePercent = totalGender
    ? Math.round((female / totalGender) * 100)
    : 0;

  // Event stats
  const event: Event_ | undefined = eventData;
  const eventTitle = eventLoading ? '-' : event?.title ?? '-';
  const eventDate = eventLoading
    ? '-'
    : event?.date
    ? new Date(event.date).toLocaleDateString()
    : '-';
  const eventHead = eventLoading ? '-' : event?.eventHead?.name ?? '-';
  const contribution = eventLoading ? 0 : event?.total_contribution ?? 0;
  const expense = eventLoading ? 0 : event?.total_expenditure ?? 0;
  const fundingProgress = expense > 0 ? contribution / expense : 0;
  const eventStatus = eventLoading ? '-' : getEventStatus(event?.date ?? '');

  // Loading and error UI
  const loading = familyLoading && eventLoading;
  const error = familyError || eventError;
  const errorMessage = [
    getErrorMessage(familyErrorObj),
    getErrorMessage(eventErrorObj),
  ]
    .filter(Boolean)
    .join(' | ');

  // Return structured dashboard data
  return {
    familiesOverview: {
      population,
      families,
      demographics: {
        children,
        adults,
        seniors,
      },
      genderDistribution: {
        male,
        female,
        malePercent,
        femalePercent,
      },
    },
    latestEvent: {
      title: eventTitle,
      date: eventDate,
      head: eventHead,
      status: eventStatus,
      finances: {
        contribution,
        expense,
        fundingProgress,
      },
    },
    ui: {
      loading,
      error,
      errorMessage,
      refreshing,
      onRefresh,
    },
  } as DashboardData;
};
