def add_time(start, duration, start_day=None):
    try:
        start_time, meridian = start.split()
        start_hour, start_minute = map(int, start_time.split(':'))
        if meridian == 'PM':
            start_hour += 12
    except ValueError:
        return 'Invalid start time format. Use the 12-hour clock format, e.g. "3:30 PM"'

    try:
        duration_hour, duration_minute = map(int, duration.split(':'))
    except ValueError:
        return 'Invalid duration format. Use the format HH:MM, e.g. "2:30"'

    end_minute = (start_minute + duration_minute) % 60
    carry_hour = (start_minute + duration_minute) // 60
    end_hour = (start_hour + duration_hour + carry_hour) % 24
    if end_hour >= 12:
        end_meridian = 'PM'
    else:
        end_meridian = 'AM'
    if end_hour > 12:
        end_hour -= 12
    elif end_hour == 0:
        end_hour = 12

    days_later = (start_hour + duration_hour + carry_hour) // 24

    if start_day:
        try:
            days = [
              'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
              'Sunday'
            ]
            start_day_index = days.index(start_day.title())
            end_day_index = (start_day_index + days_later) % 7
            end_day = ', ' + days[end_day_index]
        except ValueError:
            return 'Invalid start day. Please enter a valid day of the week, e.g. "Monday"'
    else:
        end_day = ''

    result = f'{end_hour}:{end_minute:02d} {end_meridian}{end_day}'
    if days_later == 1:
        result += ' (next day)'
    elif days_later > 1:
        result += f' ({days_later} days later)'
    return result
