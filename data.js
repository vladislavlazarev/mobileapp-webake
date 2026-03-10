export const DELIVERIES = [
  { id: 1, slot: '6:00 – 6:30 AM', name: 'Sarah Johnson', phone: '+1 (555) 123-4567', address: '142 Oak Street, Apt 3B', shortAddr: '142 Oak St, 3B', items: [{ n: 'Baguette', q: 2 }, { n: 'Sourdough Loaf', q: 1 }], instr: 'Leave at the front door, please ring the bell', status: 'delivered' },
  { id: 2, slot: '6:00 – 6:30 AM', name: 'Mike Chen', phone: '+1 (555) 234-5678', address: '158 Oak Street', shortAddr: '158 Oak St', items: [{ n: 'Ciabatta', q: 1 }, { n: 'Rye Bread', q: 1 }], instr: '', status: 'delivered' },
  { id: 3, slot: '6:30 – 7:00 AM', name: 'Emily Davis', phone: '+1 (555) 345-6789', address: '27 Maple Avenue, Unit 12', shortAddr: '27 Maple Ave, #12', items: [{ n: 'Uzbek Flatbread', q: 2 }, { n: 'Baguette', q: 1 }], instr: 'Gate code: 4521. Leave on the porch.', status: 'in_progress' },
  { id: 4, slot: '6:30 – 7:00 AM', name: 'James Wilson', phone: '+1 (555) 456-7890', address: '31 Maple Avenue', shortAddr: '31 Maple Ave', items: [{ n: 'Whole Wheat Loaf', q: 1 }], instr: '', status: 'pending' },
  { id: 5, slot: '7:00 – 7:30 AM', name: 'Anna Kowalski', phone: '+1 (555) 567-8901', address: '8 Birch Lane', shortAddr: '8 Birch Ln', items: [{ n: 'Baguette', q: 3 }, { n: 'Croissant', q: 4 }], instr: 'Please knock, baby sleeping — don\'t ring bell', status: 'pending' },
  { id: 6, slot: '7:00 – 7:30 AM', name: 'Tom Brown', phone: '+1 (555) 678-9012', address: '15 Birch Lane, Apt 2A', shortAddr: '15 Birch Ln, 2A', items: [{ n: 'Sourdough Loaf', q: 2 }], instr: '', status: 'pending' },
  { id: 7, slot: '7:30 – 8:00 AM', name: 'Lisa Park', phone: '+1 (555) 789-0123', address: '204 Cedar Road', shortAddr: '204 Cedar Rd', items: [{ n: 'Ciabatta', q: 2 }, { n: 'Uzbek Flatbread', q: 1 }, { n: 'Rye Bread', q: 1 }], instr: 'Side entrance, brown door', status: 'in_progress' },
  { id: 8, slot: '7:30 – 8:00 AM', name: 'David Kim', phone: '+1 (555) 890-1234', address: '210 Cedar Road', shortAddr: '210 Cedar Rd', items: [{ n: 'Baguette', q: 1 }], instr: '', status: 'pending' },
]

export const DELIVERY_HISTORY = [
  { id: 101, date: 'Feb 24, 2026', slot: '6:00 – 6:30 AM', name: 'Sarah Johnson', shortAddr: '142 Oak St, 3B', items: [{ n: 'Baguette', q: 2 }], status: 'delivered', photoUrl: 'delivery_001.jpg' },
  { id: 102, date: 'Feb 24, 2026', slot: '6:30 – 7:00 AM', name: 'Emily Davis', shortAddr: '27 Maple Ave, #12', items: [{ n: 'Uzbek Flatbread', q: 2 }, { n: 'Baguette', q: 1 }], status: 'delivered', photoUrl: 'delivery_002.jpg' },
  { id: 103, date: 'Feb 24, 2026', slot: '7:00 – 7:30 AM', name: 'Anna Kowalski', shortAddr: '8 Birch Ln', items: [{ n: 'Baguette', q: 3 }, { n: 'Croissant', q: 4 }], status: 'delivered', photoUrl: 'delivery_003.jpg' },
  { id: 104, date: 'Feb 23, 2026', slot: '6:00 – 6:30 AM', name: 'Mike Chen', shortAddr: '158 Oak St', items: [{ n: 'Ciabatta', q: 1 }], status: 'delivered', photoUrl: 'delivery_004.jpg' },
  { id: 105, date: 'Feb 23, 2026', slot: '6:30 – 7:00 AM', name: 'James Wilson', shortAddr: '31 Maple Ave', items: [{ n: 'Whole Wheat Loaf', q: 1 }], status: 'failed_unavailable', photoUrl: 'delivery_005.jpg' },
  { id: 106, date: 'Feb 23, 2026', slot: '7:00 – 7:30 AM', name: 'Tom Brown', shortAddr: '15 Birch Ln, 2A', items: [{ n: 'Sourdough Loaf', q: 2 }], status: 'delivered', photoUrl: 'delivery_006.jpg' },
  { id: 107, date: 'Feb 22, 2026', slot: '6:00 – 6:30 AM', name: 'Lisa Park', shortAddr: '204 Cedar Rd', items: [{ n: 'Ciabatta', q: 2 }, { n: 'Rye Bread', q: 1 }], status: 'delivered', photoUrl: 'delivery_007.jpg' },
  { id: 108, date: 'Feb 22, 2026', slot: '6:30 – 7:00 AM', name: 'David Kim', shortAddr: '210 Cedar Rd', items: [{ n: 'Baguette', q: 1 }], status: 'delivered', photoUrl: 'delivery_008.jpg' },
  { id: 109, date: 'Feb 21, 2026', slot: '7:00 – 7:30 AM', name: 'Sarah Johnson', shortAddr: '142 Oak St, 3B', items: [{ n: 'Sourdough Loaf', q: 1 }], status: 'delivered', photoUrl: 'delivery_009.jpg' },
  { id: 110, date: 'Feb 21, 2026', slot: '7:30 – 8:00 AM', name: 'Emily Davis', shortAddr: '27 Maple Ave, #12', items: [{ n: 'Baguette', q: 2 }], status: 'failed_issue', photoUrl: 'delivery_010.jpg' },
  { id: 111, date: 'Feb 20, 2026', slot: '6:00 – 6:30 AM', name: 'Mike Chen', shortAddr: '158 Oak St', items: [{ n: 'Rye Bread', q: 1 }, { n: 'Ciabatta', q: 1 }], status: 'delivered', photoUrl: 'delivery_011.jpg' },
  { id: 112, date: 'Feb 20, 2026', slot: '6:30 – 7:00 AM', name: 'Anna Kowalski', shortAddr: '8 Birch Ln', items: [{ n: 'Croissant', q: 6 }], status: 'delivered', photoUrl: 'delivery_012.jpg' },
]

export const WEEK = [
  { short: 'Mon', num: 23, full: 'Monday, February 23', today: false },
  { short: 'Tue', num: 24, full: 'Tuesday, February 24', today: false },
  { short: 'Wed', num: 25, full: 'Wednesday, February 25', today: true },
  { short: 'Thu', num: 26, full: 'Thursday, February 26', today: false },
  { short: 'Fri', num: 27, full: 'Friday, February 27', today: false },
  { short: 'Sat', num: 28, full: 'Saturday, February 28', today: false },
  { short: 'Sun', num: 1, full: 'Sunday, March 1', today: false },
]

export const TODAY_IDX = 2
