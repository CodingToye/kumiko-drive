import type { RenderKey } from './renders'

export type Feature = {
  id: string
  eyebrow: string
  headline: string
  body: string
  render: RenderKey
  zoom: number
}

/** One idea per section, headline plus two sentences at most. */
export const FEATURES: Feature[] = [
  {
    id: 'torque',
    eyebrow: 'Drivetrain',
    headline: '120 Nm, all the way down.',
    body: 'The brushless motor holds full torque from the first revolution to the last, so it does not slow as the screw bites. The clutch stops it dead at whichever of the twelve numbers you set.',
    render: 'drive_iso',
    zoom: 1.5,
  },
  {
    id: 'balance',
    eyebrow: 'Balance',
    headline: 'The weight sits in your wrist.',
    body: 'The battery runs in line with the grip rather than hanging below it, which puts the centre of mass where your hand already is. Overhead work stops being a forearm exercise.',
    render: 'drive_side',
    zoom: 1.6,
  },
  {
    id: 'controls',
    eyebrow: 'Controls',
    headline: 'Two displays. No menus.',
    body: 'Speed on one side, charge on the other, both readable whichever hand you hold it in. Everything else is a dial you can find without looking down.',
    render: 'drive_top',
    zoom: 1.5,
  },
]
