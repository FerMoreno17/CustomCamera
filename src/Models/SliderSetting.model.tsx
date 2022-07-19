import { facePosition } from '../Enums/facePosition.enum';

export class SliderSetting {
    gesture?: facePosition;
    valueStart?: number;
    valueEnd?: number;

    public constructor(init?: Partial<SliderSetting>) {
        Object.assign(this, init);
    }
}
