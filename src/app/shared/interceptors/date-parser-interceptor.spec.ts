import { TestBed } from '@angular/core/testing';
import { DateParserInterceptor } from './date-parser-interceptor';

describe('DateParserInterceptor', () => {
  let interceptor: DateParserInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: []
    });

    interceptor = new DateParserInterceptor();
  });

  const checkOtherBodyPropertiesForTypes = (body: any): void => {
    expect(typeof body.awesomeString === 'string').toBe(true);
    expect(typeof body.awesomeNumber === 'number').toBe(true);
    expect(typeof body.awesomeNestedObject === 'object').toBe(true);
  };

  const isDateType = (object: any): boolean => {
    return Object.prototype.toString.call(object) === '[object Date]';
  };

  const doTryConvertDatesTest = (dateString: string): void => {
    const body = {
      awesomeString: 'awesomeString',
      awesomeNumber: 1488,
      awesomeDate: dateString,
      awesomeNestedObject: {
        awesomeString: 'awesomeString',
        awesomeNumber: 1488
      }
    };

    // First we check, that the property is not a Date
    expect(isDateType(body.awesomeDate)).toBe(false);
    checkOtherBodyPropertiesForTypes(body);

    interceptor.tryConvertDates(body);

    expect(isDateType(body.awesomeDate)).toBe(true);

    // Previous values were not changed
    checkOtherBodyPropertiesForTypes(body);
  };

  it('should convert date from ISO 8601 minus zone', () => {
    doTryConvertDatesTest('2020-03-18T10:26:50.6047306-06:00');
  });

  it('should convert date from ISO 8601 plus zone', () => {
    doTryConvertDatesTest('2020-03-18T10:26:50.6047306+06:00');
  });
});
