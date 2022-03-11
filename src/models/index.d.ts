import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type AnnouncementMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShiftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ScheduleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Announcement {
  readonly id: string;
  readonly pinned?: boolean;
  readonly subject?: string;
  readonly body?: string;
  readonly userID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Announcement, AnnouncementMetaData>);
  static copyOf(source: Announcement, mutator: (draft: MutableModel<Announcement, AnnouncementMetaData>) => MutableModel<Announcement, AnnouncementMetaData> | void): Announcement;
}

export declare class Shift {
  readonly id: string;
  readonly date?: string;
  readonly startTime?: string;
  readonly endTime?: string;
  readonly position?: string;
  readonly userID: string;
  readonly scheduleID: string;
  readonly inTime?: number;
  readonly outTime?: number;
  readonly totalTime?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Shift, ShiftMetaData>);
  static copyOf(source: Shift, mutator: (draft: MutableModel<Shift, ShiftMetaData>) => MutableModel<Shift, ShiftMetaData> | void): Shift;
}

export declare class Schedule {
  readonly id: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly Shifts?: (Shift | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Schedule, ScheduleMetaData>);
  static copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule, ScheduleMetaData>) => MutableModel<Schedule, ScheduleMetaData> | void): Schedule;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly name: string;
  readonly employer: string;
  readonly isManager: boolean;
  readonly Shifts?: (Shift | null)[];
  readonly Announcements?: (Announcement | null)[];
  readonly imageURI?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}