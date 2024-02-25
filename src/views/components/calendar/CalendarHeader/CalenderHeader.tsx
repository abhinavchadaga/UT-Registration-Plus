import { Status } from '@shared/types/Course';
import { Button } from '@views/components/common/Button/Button';
import CourseStatus from '@views/components/common/CourseStatus/CourseStatus';
import Divider from '@views/components/common/Divider/Divider';
import ScheduleTotalHoursAndCourses from '@views/components/common/ScheduleTotalHoursAndCourses/ScheduleTotalHoursAndCourses';
import Text from '@views/components/common/Text/Text';
import React from 'react';
import calIcon from 'src/assets/logo.png';

import MenuIcon from '~icons/material-symbols/menu';
import RedoIcon from '~icons/material-symbols/redo';
import SettingsIcon from '~icons/material-symbols/settings';
import UndoIcon from '~icons/material-symbols/undo';

/**
 * Renders the header component for the calendar.
 * @returns The CalendarHeader component.
 */
const CalendarHeader = () => (
    <div className='min-h-79px min-w-672px flex px-0 py-15'>
        <div className='flex flex-row gap-20'>
            <div className='flex gap-10'>
                <div className='flex gap-1'>
                    <Button variant='single' icon={MenuIcon} color='ut-gray' />
                    <div className='flex items-center'>
                        <img src={calIcon} className='max-w-[48px] min-w-[48px]' alt='UT Registration Plus Logo' />
                        <div className='flex flex-col whitespace-nowrap'>
                            <Text className='leading-trim font-roboto text-cap text-base text-ut-burntorange font-medium'>
                                UT Registration
                            </Text>
                            <Text className='leading-trim text-cap font-roboto text-base text-ut-orange font-medium'>
                                Plus
                            </Text>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <ScheduleTotalHoursAndCourses scheduleName='SCHEDULE' totalHours={22} totalCourses={8} />
                    DATA UPDATED ON: 12:00 AM 02/01/2024
                </div>
            </div>
            <div className='flex flex-row items-center space-x-8'>
                <div className='flex flex-row space-x-4'>
                    <CourseStatus size='small' status={Status.WAITLISTED} />
                    <CourseStatus size='small' status={Status.CLOSED} />
                    <CourseStatus size='small' status={Status.CANCELLED} />
                </div>
                <div className='flex flex-row'>
                    <Button variant='single' icon={UndoIcon} color='ut-black' />
                    <Button variant='single' icon={RedoIcon} color='ut-black' />
                    <Button variant='single' icon={SettingsIcon} color='ut-black' />
                </div>
            </div>
        </div>
        {/* <Divider type='solid' /> */}
    </div>
);

export default CalendarHeader;
