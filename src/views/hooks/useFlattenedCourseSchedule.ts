import type { CalendarCourseCellProps } from 'src/views/components/calendar/CalendarCourseCell/CalendarCourseCell';
import { CourseMeeting, TimeStringOptions } from 'src/shared/types/CourseMeeting';
import type { Status } from 'src/shared/types/Course';
import useSchedules from './useSchedules';


const dayToNumber: { [day: string]: number } = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
};

interface CalendarGridPoint {
    dayIndex: number;
    startIndex: number;
    endIndex: number;
}

/**
 * Return type of useFlattenedCourseSchedule
 */
export interface CalendarGridCourse {
    calendarGridPoint: CalendarGridPoint;
    componentProps: CalendarCourseCellProps;
    gridColumnStart?: number;
    gridColumnEnd?: number;
    totalColumns?: number;
}

const convertMinutesToIndex = (minutes: number): number => Math.floor((minutes - 420) / 30);

/**
 * Get the active schedule, and convert it to be render-able into a calendar.
 * @returns CalendarGridCourse
 */
export function useFlattenedCourseSchedule(): CalendarGridCourse[] {
    const [activeSchedule] = useSchedules();
    if (!activeSchedule) {
        return [];
    }
    const { courses } = activeSchedule;

    return courses
        .flatMap(course => {
            const {
                status,
                department,
                instructors,
                schedule: { meetings },
            } = course as {
                status: Status; // Change the type of 'status' to 'Status'
                department: string;
                instructors: { lastName: string }[];
                schedule: { meetings: CourseMeeting[] };
            };
            const courseDeptAndInstr = `${department} ${instructors[0].lastName}`;

            if (meetings.length === 0) {
                // asynch, online course
                return [
                    {
                        calendarGridPoint: {
                            dayIndex: 0,
                            startIndex: 0,
                            endIndex: 0,
                        },
                        componentProps: {
                            courseDeptAndInstr,
                            status,
                            colors: {
                                // TODO: figure out colors - these are defaults
                                primaryColor: 'ut-gray',
                                secondaryColor: 'ut-gray',
                            },
                        },
                    },
                ];
            }

            // in-person
            return meetings.flatMap((meeting) => {
                const { days, startTime, endTime, location } = meeting;
                const time = getTimeString({ separator: '-', capitalize: true }, startTime, endTime);
                const timeAndLocation = `${time} - ${location ? location.building : 'WB'}`;
            
                return days.map(d => ({
                    calendarGridPoint: {
                        dayIndex: dayToNumber[d],
                        startIndex: convertMinutesToIndex(startTime),
                        endIndex: convertMinutesToIndex(endTime),
                    },
                    componentProps: {
                        courseDeptAndInstr,
                        timeAndLocation,
                        status,
                        colors: {
                            // TODO: figure out colors - these are defaults
                            primaryColor: 'ut-orange',
                            secondaryColor: 'ut-orange',
                        },
                    },
                }));
            });
        })
        .sort((a: CalendarGridCourse, b: CalendarGridCourse) => {
            if (a.calendarGridPoint.dayIndex !== b.calendarGridPoint.dayIndex) {
                return a.calendarGridPoint.dayIndex - b.calendarGridPoint.dayIndex;
            }
            if (a.calendarGridPoint.startIndex !== b.calendarGridPoint.startIndex) {
                return a.calendarGridPoint.startIndex - b.calendarGridPoint.startIndex;
            }
            return a.calendarGridPoint.endIndex - b.calendarGridPoint.endIndex;
        });
}

function getTimeString(options: TimeStringOptions, startTime: number, endTime: number): string {
    const startHour = Math.floor(startTime / 60);
    const startMinute = startTime % 60;
    const endHour = Math.floor(endTime / 60);
    const endMinute = endTime % 60;

    let startTimeString = '';
    let endTimeString = '';

    if (startHour === 0) {
        startTimeString = '12';
    } else if (startHour > 12) {
        startTimeString = `${startHour - 12}`;
    } else {
        startTimeString = `${startHour}`;
    }

    startTimeString += startMinute === 0 ? ':00' : `:${startMinute}`;
    startTimeString += startHour >= 12 ? 'pm' : 'am';

    if (endHour === 0) {
        endTimeString = '12';
    } else if (endHour > 12) {
        endTimeString = `${endHour - 12}`;
    } else {
        endTimeString = `${endHour}`;
    }
    endTimeString += endMinute === 0 ? ':00' : `:${endMinute}`;
    endTimeString += endHour >= 12 ? 'pm' : 'am';

    if (options.capitalize) {
        startTimeString = startTimeString.toUpperCase();
        endTimeString = endTimeString.toUpperCase();
    }

    return `${startTimeString} ${options.separator} ${endTimeString}`;
}