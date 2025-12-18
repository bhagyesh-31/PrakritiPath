import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const navItems = [
    { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { icon: '🌿', label: 'Challenges', path: '/challenges' },
    { icon: '🏆', label: 'Achievements', path: '/achievements' },
    { icon: '📊', label: 'Leaderboard', path: '/leaderboard' },
    { icon: '📈', label: 'Analytics', path: '/analytics' },
    { icon: '👥', label: 'Community', path: '/community' },
  ];

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '64px',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 1000,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      textDecoration: 'none',
    },
    logoIcon: {
      fontSize: '28px',
    },
    logoText: {
      fontSize: '20px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 14px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      color: '#94a3b8',
      transition: 'all 0.2s ease',
    },
    navLinkActive: {
      background: 'rgba(16, 185, 129, 0.15)',
      color: '#10b981',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    xpBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '6px 12px',
      background: 'rgba(16, 185, 129, 0.1)',
      borderRadius: '20px',
      border: '1px solid rgba(16, 185, 129, 0.3)',
    },
    xpText: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#10b981',
    },
    streakBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      padding: '6px 12px',
      background: 'rgba(245, 158, 11, 0.1)',
      borderRadius: '20px',
      border: '1px solid rgba(245, 158, 11, 0.3)',
    },
    streakText: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#f59e0b',
    },
    profileLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '600',
      color: 'white',
    },
    userName: {
      fontSize: '14px',
      fontWeight: '500',
      color: 'white',
    },
    logoutBtn: {
      padding: '8px 14px',
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/dashboard" style={styles.logo}>
        <span style={styles.logoIcon}>🌍</span>
        <span style={styles.logoText}>EcoLearn</span>
      </Link>

      {/* Nav Links */}
      <div style={styles.navLinks}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.navLink,
              ...(isActive(item.path) ? styles.navLinkActive : {}),
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div style={styles.rightSection}>
        {/* XP Badge */}
        <div style={styles.xpBadge}>
          <span>⚡</span>
          <span style={styles.xpText}>{user.xp} XP</span>
        </div>

        {/* Streak Badge */}
        <div style={styles.streakBadge}>
          <span>🔥</span>
          <span style={styles.streakText}>{user.streak}</span>
        </div>

        {/* Profile */}
        <Link to="/profile" style={styles.profileLink}>
          <div style={styles.avatar}>
            {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
          </div>
          <span style={styles.userName}>
            {user.name || user.email.split('@')[0]}
          </span>
        </Link>

        {/* Logout */}
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;