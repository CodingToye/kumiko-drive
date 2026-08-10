/**
 * The spec strip figures. Placeholder values agreed at planning time — edit here
 * and nowhere else. "12+1" matches the 10 / 11 / 12 / T collar markings visible
 * on the renders.
 */
export type Spec = {
  figure: string
  unit?: string
  label: string
}

export const SPECS: Spec[] = [
  { figure: '120', unit: 'Nm', label: 'Peak torque' },
  { figure: '18', unit: 'V', label: '5.0 Ah battery' },
  { figure: '1.4', unit: 'kg', label: 'Weight, bare' },
  { figure: '12+1', label: 'Clutch settings' },
]
