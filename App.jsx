import { useState } from 'react'
import { DELIVERIES, DELIVERY_HISTORY, WEEK, TODAY_IDX } from './data'
import {
  TruckIcon, DollarIcon, UserIcon, PhoneIcon, MapPinIcon, NavIcon,
  CameraIcon, CheckIcon, XIcon, BackIcon, ClockIcon, InfoIcon,
  LogoutIcon, ImageIcon, ChevronRightIcon,
} from './Icons'

/* ================================================================
   SHARED UI
   ================================================================ */

function StatusBadge({ status }) {
  const map = {
    pending: ['Pending', 'badge-pending'],
    in_progress: ['In Progress', 'badge-progress'],
    delivered: ['Delivered', 'badge-delivered'],
    failed_unavailable: ['Failed', 'badge-failed'],
    failed_issue: ['Failed', 'badge-failed'],
  }
  const [label, cls] = map[status] || map.pending
  return <span className={cls} style={styles.badge}>{label}</span>
}

function TabBar({ active, onNavigate }) {
  const tabs = [
    { id: 'deliveries', label: 'Deliveries', Icon: TruckIcon },
    { id: 'earnings', label: 'Earnings', Icon: DollarIcon },
    { id: 'profile', label: 'Profile', Icon: UserIcon },
  ]
  return (
    <div style={styles.tabBar}>
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button key={t.id} onClick={() => onNavigate(t.id)} style={styles.tabBtn}>
            <t.Icon size={22} color={isActive ? 'var(--accent)' : 'var(--text-light)'} />
            <span style={{
              fontSize: 13,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? 'var(--accent)' : 'var(--text-light)',
            }}>{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function Overlay({ children }) {
  return <div className="anim-scale-in" style={styles.overlay}>{children}</div>
}

function Modal({ children }) {
  return <div style={styles.modal}>{children}</div>
}

function StatusBar() {
  return (
    <div className="status-bar" style={styles.statusBar}>
      <span style={{ fontWeight: 600, fontSize: 14 }}>9:41</span>
      <div className="notch" style={styles.notch} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <div style={{ width: 16, height: 11, border: '1.5px solid var(--text)', borderRadius: 2, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '1.5px', background: 'var(--text)', borderRadius: 0.5 }} />
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   LOGIN
   ================================================================ */

function LoginScreen({ onLogin }) {
  const [showPw, setShowPw] = useState(false)

  return (
    <div style={{ ...styles.screen }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={styles.loginLogo}>
            <span style={{ fontSize: 36 }}>🍞</span>
          </div>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>WE BAKE</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6, fontWeight: 500 }}>Courier App</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={styles.label}>Login</label>
            <input className="input-field" placeholder="Enter your login" style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input className="input-field" type={showPw ? 'text' : 'password'} placeholder="Enter your password" style={{ ...styles.input, paddingRight: 52 }} />
              <button onClick={() => setShowPw(!showPw)} style={styles.showPwBtn}>
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
        </div>

        <button onClick={onLogin} style={{ ...styles.btnPrimary, marginTop: 28 }}>Sign In</button>
      </div>
      <div style={styles.homeIndicator}><div style={styles.homeBar} /></div>
    </div>
  )
}

/* ================================================================
   DELIVERIES
   ================================================================ */

function DeliveriesScreen({ deliveries, dayIdx, setDayIdx, onSelect, activeTab, onNavigate }) {
  const day = WEEK[dayIdx]
  const isToday = day.today
  const isPast = dayIdx < TODAY_IDX
  const isFuture = dayIdx > TODAY_IDX

  const list = isToday
    ? deliveries
    : isPast
      ? deliveries.map(d => ({ ...d, status: 'delivered' }))
      : deliveries.filter((_, i) => i % 2 === 0).map(d => ({ ...d, status: 'pending' }))

  const done = list.filter(d => d.status === 'delivered' || d.status.startsWith('failed')).length
  const left = list.length - done

  const grouped = {}
  list.forEach(d => { (grouped[d.slot] = grouped[d.slot] || []).push(d) })

  return (
    <div style={styles.screen}>
      {/* Header */}
      <div style={{ padding: '8px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🍞</span>
            <span className="serif" style={{ fontSize: 18, fontWeight: 700 }}>WE BAKE</span>
          </div>
          <div style={styles.avatar}>A</div>
        </div>
        <h2 className="serif" style={{ fontSize: 22, fontWeight: 600, margin: '10px 0 2px' }}>
          {isToday ? "Today's Deliveries" : 'Deliveries'}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 12px' }}>{day.full}</p>

        {/* Day picker */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
          {WEEK.map((d, i) => {
            const isSel = i === dayIdx
            return (
              <button key={i} onClick={() => setDayIdx(i)} style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                padding: '8px 0 10px', borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit',
                border: isSel ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: isSel ? 'var(--accent-glow)' : d.today ? 'var(--cream)' : 'var(--bg-card)',
                transition: 'all .15s',
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: isSel ? 'var(--accent)' : 'var(--text-light)', letterSpacing: 0.5 }}>{d.short}</span>
                <span style={{ fontSize: 16, fontWeight: isSel ? 800 : 600, color: isSel ? 'var(--accent)' : 'var(--text)' }}>{d.num}</span>
                {d.today && <div style={{ width: 4, height: 4, borderRadius: '50%', background: isSel ? 'var(--accent)' : 'var(--text-light)', marginTop: -1 }} />}
              </button>
            )
          })}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <StatCard value={list.length} label="Total" color="var(--text)" bg="var(--bg-card)" border="var(--border)" />
          <StatCard value={done} label="Done" color="var(--success)" bg="var(--success-bg)" border="rgba(61,139,94,0.12)" />
          <StatCard value={left} label="Left" color="var(--accent)" bg="var(--accent-glow)" border="var(--border-accent)" />
        </div>
      </div>

      {/* List */}
      <div className="screen-scroll" style={{ padding: '0 20px 20px' }}>
        {!isToday && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, marginBottom: 16, background: isPast ? 'var(--cream)' : 'var(--warning-bg)', border: `1px solid ${isPast ? 'var(--border)' : 'rgba(212,134,10,0.12)'}` }}>
            <InfoIcon color={isPast ? 'var(--text-muted)' : 'var(--warning)'} />
            <span style={{ fontSize: 13, fontWeight: 500, color: isPast ? 'var(--text-muted)' : 'var(--warning)' }}>
              {isPast ? 'Viewing past deliveries' : 'Viewing upcoming schedule'}
            </span>
          </div>
        )}

        {list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>No deliveries</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Nothing scheduled for this day</div>
          </div>
        ) : Object.entries(grouped).map(([slot, items]) => (
          <div key={slot} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <ClockIcon />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 0.3 }}>{slot}</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 500 }}>{items.length} {items.length === 1 ? 'stop' : 'stops'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map(d => <DeliveryCard key={d.id} d={d} onSelect={onSelect} />)}
            </div>
          </div>
        ))}
      </div>

      <TabBar active={activeTab} onNavigate={onNavigate} />
    </div>
  )
}

function StatCard({ value, label, color, bg, border }) {
  return (
    <div style={{ flex: 1, padding: '12px 14px', borderRadius: 14, background: bg, border: `1px solid ${border}` }}>
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 13, color, fontWeight: 500, opacity: 0.8 }}>{label}</div>
    </div>
  )
}

function DeliveryCard({ d, onSelect }) {
  const isDone = d.status === 'delivered' || d.status.startsWith('failed')
  const isActive = d.status === 'in_progress'
  return (
    <button onClick={() => onSelect(d)} style={{
      background: 'var(--bg-card)', borderRadius: 16, padding: '14px 16px',
      border: isActive ? '1.5px solid var(--border-accent)' : '1px solid var(--border)',
      cursor: 'pointer', textAlign: 'left', width: '100%',
      display: 'flex', alignItems: 'center', gap: 14,
      opacity: isDone ? 0.55 : 1, transition: 'all .2s', fontFamily: 'inherit',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: isDone ? 'var(--success-bg)' : isActive ? 'var(--accent-glow)' : 'var(--cream)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 700,
        color: isDone ? 'var(--success)' : isActive ? 'var(--accent)' : 'var(--text-muted)',
      }}>
        {isDone ? <CheckIcon size={16} /> : `#${d.id}`}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{d.name}</span>
          <StatusBadge status={d.status} />
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 3 }}>{d.shortAddr}</div>
        <div style={{ fontSize: 14, color: 'var(--text-light)' }}>{d.items.map(i => `${i.q}× ${i.n}`).join(', ')}</div>
      </div>
    </button>
  )
}

/* ================================================================
   DELIVERY DETAIL
   ================================================================ */

function DetailScreen({ delivery, onBack, onComplete, onStartProgress }) {
  if (!delivery) return null
  const canStart = delivery.status === 'pending'
  const canComplete = delivery.status === 'in_progress'

  return (
    <div style={styles.screen}>
      <div style={{ padding: '8px 20px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={styles.backBtn}><BackIcon /></button>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, flex: 1 }}>Delivery Details</h2>
        <StatusBadge status={delivery.status} />
      </div>

      <div className="screen-scroll" style={{ padding: '0 20px 20px' }}>
        {/* Time slot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--accent-glow)', borderRadius: 14, marginBottom: 16, border: '1px solid var(--border-accent)' }}>
          <ClockIcon color="var(--accent)" />
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>{delivery.slot}</span>
        </div>

        {/* Customer */}
        <div style={styles.card}>
          <div style={styles.sectionLabel}>Customer</div>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 14 }}>{delivery.name}</div>
          <button style={styles.contactBtn}>
            <PhoneIcon size={18} color="var(--accent)" />
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)' }}>{delivery.phone}</span>
          </button>
          <button style={{ ...styles.contactBtn, marginTop: 8, textAlign: 'left' }}>
            <MapPinIcon size={18} color="var(--accent)" />
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)', flex: 1 }}>{delivery.address}</span>
          </button>
        </div>

        {/* Items */}
        <div style={styles.card}>
          <div style={styles.sectionLabel}>Order Items</div>
          {delivery.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < delivery.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🍞</div>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{item.n}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-glow)', padding: '4px 12px', borderRadius: 100 }}>×{item.q}</div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        {delivery.instr && (
          <div style={styles.card}>
            <div style={styles.sectionLabel}>Delivery Instructions</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, padding: '10px 14px', background: 'var(--cream)', borderRadius: 12, borderLeft: '3px solid var(--accent)' }}>{delivery.instr}</div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
          <button style={{ ...styles.btnPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <NavIcon size={18} color="#FBF6EF" />Start Navigation
          </button>
          {canStart && <button onClick={() => onStartProgress(delivery.id)} style={styles.btnOutline}>Mark as In Progress</button>}
          {canComplete && <button onClick={() => onComplete(delivery)} style={styles.btnSuccess}>Complete Delivery</button>}
        </div>
      </div>
      <div style={styles.homeIndicator}><div style={styles.homeBar} /></div>
    </div>
  )
}

/* ================================================================
   COMPLETE DELIVERY
   ================================================================ */

function CompleteScreen({ delivery, onBack, onConfirm }) {
  const [photo, setPhoto] = useState(false)
  const [cs, setCs] = useState('delivered')
  const [fr, setFr] = useState(null)
  const canConfirm = photo && (cs === 'delivered' || (cs === 'failed' && fr))

  return (
    <div style={styles.screen}>
      <div style={{ padding: '8px 20px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={styles.backBtn}><BackIcon /></button>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, flex: 1 }}>Complete Delivery</h2>
      </div>

      <div className="screen-scroll" style={{ padding: '0 20px 20px' }}>
        {/* Mini info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border)', marginBottom: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--accent)' }}>#{delivery.id}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{delivery.name}</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{delivery.shortAddr}</div>
          </div>
        </div>

        {/* Photo */}
        <div style={styles.card}>
          <div style={styles.sectionLabel}>Delivery Photo <span style={{ color: 'var(--error)' }}>*</span></div>
          {!photo ? (
            <button onClick={() => setPhoto(true)} style={styles.photoUpload}>
              <CameraIcon size={32} color="var(--accent)" />
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Upload Photo</span>
              <span style={{ fontSize: 14, color: 'var(--text-light)' }}>Take a photo of the delivery at the door</span>
            </button>
          ) : (
            <div style={{ position: 'relative' }}>
              <div style={{ width: '100%', height: 180, borderRadius: 14, background: 'linear-gradient(135deg,#E8C9A0,#D4A574)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 48 }}>📸</span>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>delivery_photo.jpg</div>
                </div>
              </div>
              <button onClick={() => setPhoto(false)} style={styles.photoRemoveBtn}><XIcon size={14} color="#fff" /></button>
            </div>
          )}
        </div>

        {/* Status */}
        <div style={styles.card}>
          <div style={styles.sectionLabel}>Delivery Status</div>
          <StatusOption selected={cs === 'delivered'} color="success" onClick={() => { setCs('delivered'); setFr(null) }} title="Delivered successfully" sub="Customer will be charged" icon={<CheckIcon size={14} color="#fff" />} />
          <StatusOption selected={cs === 'failed'} color="error" onClick={() => setCs('failed')} title="Delivery failed" sub="Select reason below" icon={<XIcon size={14} color="#fff" />} />

          {cs === 'failed' && (
            <div style={{ marginTop: 12, paddingLeft: 8 }}>
              <FailReason selected={fr === 'unavailable'} color="warning" onClick={() => setFr('unavailable')} title="Customer unavailable" sub="Customer will be charged" />
              <FailReason selected={fr === 'issue'} color="error" onClick={() => setFr('issue')} title="Order issue" sub="Customer will NOT be charged" />
            </div>
          )}
        </div>

        <button
          disabled={!canConfirm}
          onClick={() => {
            if (!canConfirm) return
            onConfirm({ deliveryId: delivery.id, status: cs === 'delivered' ? 'delivered' : `failed_${fr}` })
          }}
          style={{
            ...styles.btnPrimary,
            marginTop: 4,
            background: !canConfirm ? '#ccc' : cs === 'delivered' ? 'var(--success)' : 'var(--error)',
            boxShadow: !canConfirm ? 'none' : cs === 'delivered' ? '0 4px 16px rgba(61,139,94,0.25)' : '0 4px 16px rgba(195,59,59,0.25)',
            cursor: canConfirm ? 'pointer' : 'not-allowed',
          }}
        >Confirm</button>
      </div>
      <div style={styles.homeIndicator}><div style={styles.homeBar} /></div>
    </div>
  )
}

function StatusOption({ selected, color, onClick, title, sub, icon }) {
  const c = `var(--${color})`
  const bg = `var(--${color}-bg)`
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '14px 16px', marginBottom: 10,
      border: selected ? `2px solid ${c}` : '1px solid var(--border)',
      borderRadius: 14, background: selected ? bg : 'var(--bg-card)',
      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
      textAlign: 'left', fontFamily: 'inherit',
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: selected ? c : 'transparent',
        border: selected ? 'none' : '2px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{selected && icon}</div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
      </div>
    </button>
  )
}

function FailReason({ selected, color, onClick, title, sub }) {
  const c = `var(--${color})`
  const bg = `var(--${color}-bg)`
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '12px 14px', marginBottom: 8,
      border: selected ? `1.5px solid ${c}` : '1px solid var(--border)',
      borderRadius: 12, background: selected ? bg : 'var(--bg-card)',
      cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
    }}>
      <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 13, color: c, marginTop: 2, fontWeight: 500 }}>{sub}</div>
    </button>
  )
}

/* ================================================================
   PROFILE + DELIVERY HISTORY
   ================================================================ */

function ProfileScreen({ activeTab, onNavigate, onLogout }) {
  const [historyOpen, setHistoryOpen] = useState(false)
  const [viewingPhoto, setViewingPhoto] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  if (viewingPhoto) {
    return (
      <div style={styles.screen}>
        <div style={{ padding: '8px 20px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setViewingPhoto(null)} style={styles.backBtn}><BackIcon /></button>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, flex: 1 }}>Delivery Photo</h2>
        </div>
        <div className="screen-scroll" style={{ padding: '0 20px 20px' }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{ width: '100%', aspectRatio: '4/3', background: 'linear-gradient(135deg,#E8C9A0,#D4A574)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 64 }}>📸</span>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 8, color: 'var(--text)' }}>{viewingPhoto.photoUrl}</div>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{viewingPhoto.name}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{viewingPhoto.shortAddr} · {viewingPhoto.date}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{viewingPhoto.items.map(i => `${i.q}× ${i.n}`).join(', ')}</div>
              <div style={{ marginTop: 12 }}><StatusBadge status={viewingPhoto.status} /></div>
            </div>
          </div>
        </div>
        <div style={styles.homeIndicator}><div style={styles.homeBar} /></div>
      </div>
    )
  }

  if (historyOpen) {
    const grouped = {}
    DELIVERY_HISTORY.forEach(d => { (grouped[d.date] = grouped[d.date] || []).push(d) })

    return (
      <div style={styles.screen}>
        <div style={{ padding: '8px 20px 16px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => { setHistoryOpen(false); setExpandedId(null) }} style={styles.backBtn}><BackIcon /></button>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, flex: 1 }}>Delivery History</h2>
          <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 600 }}>{DELIVERY_HISTORY.length} total</span>
        </div>

        <div className="screen-scroll" style={{ padding: '0 20px 20px' }}>
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{date}</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 500 }}>{items.length} deliveries</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map(d => {
                  const isExp = expandedId === d.id
                  const isFailed = d.status.startsWith('failed')
                  return (
                    <div key={d.id} style={{
                      background: 'var(--bg-card)', borderRadius: 16, overflow: 'hidden',
                      border: '1px solid var(--border)', transition: 'all .2s',
                    }}>
                      <button onClick={() => setExpandedId(isExp ? null : d.id)} style={{
                        width: '100%', padding: '14px 16px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 12,
                        textAlign: 'left', fontFamily: 'inherit',
                        background: 'transparent', border: 'none',
                      }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                          background: isFailed ? 'var(--error-bg)' : 'var(--success-bg)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {isFailed ? <XIcon size={16} /> : <CheckIcon size={16} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                            <span style={{ fontSize: 14, fontWeight: 600 }}>{d.name}</span>
                            <StatusBadge status={d.status} />
                          </div>
                          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{d.shortAddr} · {d.slot}</div>
                        </div>
                        <ChevronRightIcon size={16} color="var(--text-light)" />
                      </button>

                      {isExp && (
                        <div style={{ padding: '0 16px 14px', borderTop: '1px solid var(--border)' }}>
                          <div style={{ padding: '12px 0 8px' }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-light)', marginBottom: 6 }}>ORDER ITEMS</div>
                            {d.items.map((item, i) => (
                              <div key={i} style={{ fontSize: 13, color: 'var(--text)', padding: '3px 0' }}>
                                {item.q}× {item.n}
                              </div>
                            ))}
                          </div>
                          <button onClick={() => setViewingPhoto(d)} style={{
                            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                            padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
                            border: '1px solid var(--border-accent)',
                            background: 'var(--accent-glow)', fontFamily: 'inherit', marginTop: 4,
                          }}>
                            <ImageIcon size={18} color="var(--accent)" />
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', flex: 1 }}>View delivery photo</span>
                            <ChevronRightIcon size={16} color="var(--accent)" />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <TabBar active={activeTab} onNavigate={onNavigate} />
      </div>
    )
  }

  // Main profile view
  return (
    <div style={styles.screen}>
      <div style={{ padding: '8px 20px 16px', flexShrink: 0 }}>
        <h2 className="serif" style={{ fontSize: 24, fontWeight: 600, margin: '4px 0 0' }}>Profile</h2>
      </div>

      <div className="screen-scroll" style={{ padding: '0 20px 20px' }}>
        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="serif" style={styles.profileAvatar}>A</div>
          <div className="serif" style={{ fontSize: 20, fontWeight: 700 }}>Alex Morrison</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Courier · Downtown District</div>
        </div>

        {/* Info */}
        <div style={{ background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border)', marginBottom: 16, overflow: 'hidden' }}>
          {[['Name', 'Alex Morrison'], ['Phone', '+1 (555) 999-0000'], ['Login', 'alex.courier']].map(([label, val], i, arr) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={styles.sectionLabel}>This Month</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, padding: 16, borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>187</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>Deliveries</div>
          </div>
          <div style={{ flex: 1, padding: 16, borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div className="serif" style={{ fontSize: 24, fontWeight: 700, color: 'var(--success)' }}>98%</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>Success rate</div>
          </div>
        </div>

        {/* Delivery History button */}
        <button onClick={() => setHistoryOpen(true)} style={{
          width: '100%', padding: '16px 18px', marginBottom: 16,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
          fontFamily: 'inherit',
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClockIcon size={20} color="var(--accent)" />
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Delivery History</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 2 }}>{DELIVERY_HISTORY.length} completed deliveries</div>
          </div>
          <ChevronRightIcon />
        </button>

        {/* Sign out */}
        <button onClick={onLogout} style={styles.signOutBtn}>
          <LogoutIcon />
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--error)' }}>Sign Out</span>
        </button>
      </div>

      <TabBar active={activeTab} onNavigate={onNavigate} />
    </div>
  )
}

/* ================================================================
   V2 POPUP
   ================================================================ */

function V2Popup({ onClose }) {
  return (
    <Overlay>
      <Modal>
        <div style={{ width: 64, height: 64, borderRadius: 20, margin: '0 auto 16px', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
          <DollarIcon size={32} color="var(--text-light)" />
        </div>
        <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Coming in v2</h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 6 }}>
          Earnings tracking will be available in the next version of the app.
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.5, marginBottom: 28 }}>
          You'll see daily and monthly earnings, delivery stats, and payment history.
        </p>
        <button onClick={onClose} style={{ ...styles.btnPrimary, width: 'auto', padding: '14px 40px', display: 'inline-block' }}>Got it</button>
      </Modal>
    </Overlay>
  )
}

/* ================================================================
   SUCCESS POPUP
   ================================================================ */

function SuccessPopup({ delivery, onClose }) {
  return (
    <Overlay>
      <Modal>
        <div style={{ fontSize: 64, marginBottom: 12 }}>✅</div>
        <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Delivery Confirmed!</h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.5 }}>
          {delivery?.name} — {delivery?.shortAddr}
        </p>
        <p style={{ fontSize: 13, color: 'var(--text-light)', marginBottom: 24 }}>Timestamp & location recorded</p>
        <button onClick={onClose} style={{ ...styles.btnPrimary, width: 'auto', padding: '14px 40px', display: 'inline-block' }}>Back to Deliveries</button>
      </Modal>
    </Overlay>
  )
}

/* ================================================================
   MAIN APP
   ================================================================ */

export default function App() {
  const [screen, setScreen] = useState('login')
  const [tab, setTab] = useState('deliveries')
  const [deliveries, setDeliveries] = useState(() => JSON.parse(JSON.stringify(DELIVERIES)))
  const [selectedId, setSelectedId] = useState(null)
  const [dayIdx, setDayIdx] = useState(TODAY_IDX)
  const [showV2, setShowV2] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const selected = deliveries.find(d => d.id === selectedId)

  const navigate = (t) => {
    if (t === 'earnings') { setShowV2(true); return }
    setTab(t)
    setScreen(t)
    setSelectedId(null)
  }

  return (
    <div className="phone-wrapper">
      <StatusBar />

      {screen === 'login' && (
        <LoginScreen onLogin={() => { setScreen('deliveries'); setTab('deliveries') }} />
      )}

      {screen === 'deliveries' && (
        <DeliveriesScreen
          deliveries={deliveries}
          dayIdx={dayIdx}
          setDayIdx={setDayIdx}
          onSelect={d => { setSelectedId(d.id); setScreen('detail') }}
          activeTab={tab}
          onNavigate={navigate}
        />
      )}

      {screen === 'detail' && (
        <DetailScreen
          delivery={selected}
          onBack={() => { setScreen('deliveries'); setSelectedId(null) }}
          onComplete={d => { setSelectedId(d.id); setScreen('complete') }}
          onStartProgress={id => {
            setDeliveries(prev => prev.map(x => x.id === id ? { ...x, status: 'in_progress' } : x))
          }}
        />
      )}

      {screen === 'complete' && selected && (
        <CompleteScreen
          delivery={selected}
          onBack={() => setScreen('detail')}
          onConfirm={result => {
            setDeliveries(prev => prev.map(x => x.id === result.deliveryId ? { ...x, status: result.status } : x))
            setShowSuccess(true)
          }}
        />
      )}

      {screen === 'profile' && (
        <ProfileScreen
          activeTab={tab}
          onNavigate={navigate}
          onLogout={() => {
            setScreen('login'); setTab('deliveries')
            setDeliveries(JSON.parse(JSON.stringify(DELIVERIES)))
            setDayIdx(TODAY_IDX)
          }}
        />
      )}

      {showV2 && <V2Popup onClose={() => setShowV2(false)} />}
      {showSuccess && (
        <SuccessPopup
          delivery={selected}
          onClose={() => { setShowSuccess(false); setScreen('deliveries'); setSelectedId(null) }}
        />
      )}
    </div>
  )
}

/* ================================================================
   STYLES
   ================================================================ */

const styles = {
  screen: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  statusBar: {
    height: 54, padding: '14px 24px 0', display: 'flex',
    justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
  },
  notch: {
    width: 126, height: 34, borderRadius: 20, background: 'var(--text)',
    position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8,
  },
  tabBar: {
    display: 'flex', borderTop: '1px solid var(--border)', background: 'var(--bg-card)',
    padding: '8px 0', paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
    flexShrink: 0,
  },
  tabBtn: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 4, background: 'none', border: 'none', cursor: 'pointer',
    padding: '6px 0 0', fontFamily: 'inherit',
  },
  avatar: {
    width: 36, height: 36, borderRadius: '50%', background: 'var(--cream)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 15, fontWeight: 700, color: 'var(--accent)',
  },
  card: {
    background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border)',
    padding: 18, marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 13, fontWeight: 600, color: 'var(--text-light)',
    textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12,
  },
  badge: { display: 'inline-block', fontSize: 13, fontWeight: 600, padding: '3px 10px', borderRadius: 100 },
  btnPrimary: {
    width: '100%', padding: 16,
    background: 'linear-gradient(135deg,#C75B2B,#E07040)',
    color: '#FBF6EF', border: 'none', borderRadius: 100,
    fontSize: 15, fontWeight: 700, cursor: 'pointer',
    fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(199,91,43,0.25)',
  },
  btnOutline: {
    width: '100%', padding: 15, background: 'none',
    border: '2px solid var(--accent)', borderRadius: 100,
    color: 'var(--accent)', fontSize: 15, fontWeight: 700,
    cursor: 'pointer', fontFamily: 'inherit',
  },
  btnSuccess: {
    width: '100%', padding: 16, background: 'var(--success)',
    color: '#FBF6EF', border: 'none', borderRadius: 100,
    fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
    boxShadow: '0 4px 16px rgba(61,139,94,0.25)',
  },
  backBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' },
  contactBtn: {
    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
    padding: '10px 14px', borderRadius: 12, border: '1px solid var(--border)',
    background: 'var(--cream)', cursor: 'pointer', fontFamily: 'inherit',
  },
  overlay: {
    position: 'absolute', inset: 0, background: 'rgba(45,24,16,0.5)',
    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 99, padding: 20,
  },
  modal: {
    width: '100%', maxWidth: 340, background: 'var(--bg-card)',
    borderRadius: 28, padding: '40px 28px 32px', textAlign: 'center',
    boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
  },
  homeIndicator: { padding: '8px 0 10px', display: 'flex', justifyContent: 'center', flexShrink: 0 },
  homeBar: { width: 134, height: 5, borderRadius: 100, background: 'var(--text)', opacity: 0.15 },
  loginLogo: {
    width: 72, height: 72, borderRadius: 18, margin: '0 auto 16px',
    background: 'linear-gradient(135deg,#C75B2B,#E07040)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(199,91,43,0.25)',
  },
  label: { fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, display: 'block' },
  input: { width: '100%', padding: '14px 16px', borderRadius: 12, fontSize: 15 },
  showPwBtn: {
    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer',
    fontSize: 13, color: 'var(--text-muted)', fontWeight: 600,
  },
  profileAvatar: {
    width: 80, height: 80, borderRadius: '50%', margin: '0 auto 14px',
    background: 'linear-gradient(135deg,#C75B2B,#E07040)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 32, fontWeight: 700, color: '#FBF6EF',
    boxShadow: '0 8px 24px rgba(199,91,43,0.2)',
  },
  signOutBtn: {
    width: '100%', padding: 15, border: '1.5px solid var(--error)',
    borderRadius: 100, background: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    fontFamily: 'inherit',
  },
  photoUpload: {
    width: '100%', padding: '32px 20px',
    border: '2px dashed var(--border-accent)', borderRadius: 16,
    background: 'var(--cream)', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
    fontFamily: 'inherit',
  },
  photoRemoveBtn: {
    position: 'absolute', top: 8, right: 8,
    width: 28, height: 28, borderRadius: '50%',
    background: 'rgba(0,0,0,0.5)', border: 'none',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
}
