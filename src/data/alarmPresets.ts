import { AlarmPreset } from '../types';

export const ALARM_PRESETS: AlarmPreset[] = [
  {
    id: 'preset-preheat',
    label: 'Preheat oven',
    duration: 10,
    icon: '🔥',
  },
  {
    id: 'preset-butter',
    label: 'Take butter out',
    duration: 30,
    icon: '🧈',
  },
  {
    id: 'preset-cookies',
    label: 'Check cookies',
    duration: 8,
    icon: '🍪',
  },
  {
    id: 'preset-proofing',
    label: 'Bread proofing',
    duration: 45,
    icon: '🍞',
  },
  {
    id: 'preset-cooldown',
    label: 'Cake cooldown',
    duration: 20,
    icon: '🎂',
  },
  {
    id: 'preset-eggs',
    label: 'Room temp eggs',
    duration: 20,
    icon: '🥚',
  },
  {
    id: 'preset-rest',
    label: 'Dough rest',
    duration: 15,
    icon: '⏱️',
  },
  {
    id: 'preset-chill',
    label: 'Chill dough',
    duration: 30,
    icon: '❄️',
  },
];
