const I = ({ children, size = 22, color = 'currentColor', sw = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

export const TruckIcon = ({ size, color }) => (
  <I size={size} color={color}><rect x="1" y="3" width="15" height="13" rx="2" /><polyline points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></I>
)
export const DollarIcon = ({ size, color }) => (
  <I size={size} color={color}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></I>
)
export const UserIcon = ({ size, color }) => (
  <I size={size} color={color}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></I>
)
export const PhoneIcon = ({ size, color }) => (
  <I size={size} color={color}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></I>
)
export const MapPinIcon = ({ size, color }) => (
  <I size={size} color={color}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></I>
)
export const NavIcon = ({ size, color }) => (
  <I size={size} color={color}><polygon points="3 11 22 2 13 21 11 13 3 11" /></I>
)
export const CameraIcon = ({ size, color }) => (
  <I size={size} color={color}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></I>
)
export const CheckIcon = ({ size = 18, color = 'var(--success)' }) => (
  <I size={size} color={color} sw={2.5}><polyline points="20 6 9 17 4 12" /></I>
)
export const XIcon = ({ size = 18, color = 'var(--error)' }) => (
  <I size={size} color={color} sw={2.5}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></I>
)
export const BackIcon = ({ size, color }) => (
  <I size={size} color={color}><polyline points="15 18 9 12 15 6" /></I>
)
export const ClockIcon = ({ size = 16, color = 'var(--text-muted)' }) => (
  <I size={size} color={color}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></I>
)
export const InfoIcon = ({ size = 16, color = 'var(--text-muted)' }) => (
  <I size={size} color={color}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></I>
)
export const LogoutIcon = ({ size = 20, color = 'var(--error)' }) => (
  <I size={size} color={color}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></I>
)
export const HistoryIcon = ({ size = 20, color = 'currentColor' }) => (
  <I size={size} color={color}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /><path d="M4.93 4.93l2.83 2.83" /><path d="M19.07 4.93l-2.83 2.83" /></I>
)
export const ImageIcon = ({ size = 20, color = 'currentColor' }) => (
  <I size={size} color={color}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></I>
)
export const ChevronRightIcon = ({ size = 18, color = 'var(--text-light)' }) => (
  <I size={size} color={color}><polyline points="9 18 15 12 9 6" /></I>
)
