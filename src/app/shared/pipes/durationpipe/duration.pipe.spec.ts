import { DurationPipe } from "./duration.pipe";
describe('DurationPipe', () => {
    let pipe: DurationPipe;
    beforeEach(() => {
        pipe = new DurationPipe();
    });
    
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return minutes if vaule is less then 60', () => {
        const duration=55;
        const formattedDuration=pipe.transform(duration);
        expect(formattedDuration).toBe('55 min')
    });

    it('should return duration in "hh h mm min" format if value is bigger than 60', () => {
        const duration=100;
        const formattedDuration=pipe.transform(duration);
        expect(formattedDuration).toBe('1h 40min')
    });
});
