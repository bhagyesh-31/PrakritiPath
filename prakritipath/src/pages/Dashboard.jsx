import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import AddContribution from "../components/contribution/AddContribution";
import ContributionCard from "../components/contribution/ContributionCard";
import Leaderboard from "../components/leaderboard/Leaderboard";
import Container from "../components/common/Container";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { contributions } = useApp();

  if (!user) return null;

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    header: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      padding: '32px 40px',
      marginBottom: '48px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    welcomeSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
    },
    userAvatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      fontWeight: '600',
      color: 'white',
      border: '3px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
    },
    welcomeText: {
      fontSize: '36px',
      fontWeight: '800',
      color: 'white',
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    welcomeSubtext: {
      fontSize: '16px',
      color: '#cbd5e1',
    },
    headerActions: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
    },
    profileButton: {
      padding: '12px 28px',
      background: 'rgba(16, 185, 129, 0.1)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      ':hover': {
        background: 'rgba(16, 185, 129, 0.2)',
        transform: 'translateY(-2px)',
      },
    },
    logoutButton: {
      padding: '12px 28px',
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        background: 'rgba(239, 68, 68, 0.2)',
        transform: 'translateY(-2px)',
      },
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '48px',
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      ':hover': {
        transform: 'translateY(-5px)',
        background: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      },
    },
    statIcon: {
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      fontSize: '100px',
      opacity: '0.05',
      color: '#10b981',
    },
    statLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#cbd5e1',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '12px',
    },
    statValue: {
      fontSize: '48px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: '0',
      marginBottom: '8px',
    },
    statSubtext: {
      fontSize: '14px',
      color: '#94a3b8',
    },
    streakValue: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '28px',
      fontWeight: '800',
      color: '#f59e0b',
    },
    roleBadge: {
      display: 'inline-block',
      padding: '8px 20px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: '#78350f',
      marginTop: '12px',
      textTransform: 'capitalize',
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 400px',
      gap: '32px',
      marginBottom: '60px',
    },
    leftColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
    sectionCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    sectionHeader: {
      marginBottom: '32px',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: 'white',
      marginBottom: '8px',
      position: 'relative',
      display: 'inline-block',
    },
    sectionTitleUnderline: {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: '0',
      width: '60px',
      height: '4px',
      background: 'linear-gradient(90deg, #10b981, #3b82f6)',
      borderRadius: '2px',
    },
    sectionSubtitle: {
      fontSize: '15px',
      color: '#cbd5e1',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 40px',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '20px',
      border: '1px dashed rgba(255, 255, 255, 0.1)',
    },
    emptyStateIcon: {
      fontSize: '64px',
      marginBottom: '20px',
    },
    emptyStateText: {
      fontSize: '18px',
      color: '#9ca3af',
      marginBottom: '12px',
    },
    emptyStateSubtext: {
      fontSize: '14px',
      color: '#6b7280',
    },
    contributionsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    leaderboardCard: {
      position: 'sticky',
      top: '40px',
      height: 'fit-content',
    },
    leaderboardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
    },
    leaderboardTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: 'white',
    },
    viewAllButton: {
      padding: '8px 16px',
      background: 'rgba(16, 185, 129, 0.1)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      ':hover': {
        background: 'rgba(16, 185, 129, 0.2)',
      },
    },
    navigationCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    navCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'block',
      ':hover': {
        background: 'rgba(255, 255, 255, 0.08)',
        transform: 'translateY(-5px)',
      },
    },
    navIcon: {
      fontSize: '32px',
      marginBottom: '16px',
    },
    navTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '8px',
    },
    navDescription: {
      fontSize: '14px',
      color: '#cbd5e1',
    },
    footer: {
      marginTop: '60px',
      padding: '40px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center',
    },
    footerText: {
      fontSize: '14px',
      color: '#94a3b8',
    },
  };

  const navItems = [
    { icon: '🌿', title: 'Daily Challenges', desc: 'Complete eco-tasks', path: '/challenges' },
    { icon: '🏆', title: 'Achievements', desc: 'Unlock badges', path: '/achievements' },
    { icon: '📊', title: 'Analytics', desc: 'Track your impact', path: '/analytics' },
    { icon: '👥', title: 'Community', desc: 'Join discussions', path: '/community' },
  ];

  const level = Math.floor(user.xp / 100) + 1;
  const levelProgress = ((user.xp % 100) / 100) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern} />
      
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.welcomeSection}>
              <div style={styles.userAvatar}>
                {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 style={styles.welcomeText}>
                  Welcome back, {user.name || user.email.split('@')[0]}! 🌱
                </h1>
                <p style={styles.welcomeSubtext}>
                  Ready to make a difference today?
                </p>
              </div>
            </div>
            <div style={styles.headerActions}>
              <Link to="/profile" style={styles.profileButton}>
                👤 View Profile
              </Link>
              <button style={styles.logoutButton} onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div style={styles.navigationCards}>
          {navItems.map((item, index) => (
            <Link key={index} to={item.path} style={styles.navCard}>
              <div style={styles.navIcon}>{item.icon}</div>
              <div style={styles.navTitle}>{item.title}</div>
              <div style={styles.navDescription}>{item.desc}</div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⚡</div>
            <div style={styles.statLabel}>Total XP</div>
            <div style={styles.statValue}>{user.xp.toLocaleString()}</div>
            <div style={styles.statSubtext}>
              Level {level} • {levelProgress.toFixed(0)}% to next level
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🔥</div>
            <div style={styles.statLabel}>Current Streak</div>
            <div style={styles.streakValue}>
              🔥 {user.streak} days
            </div>
            <div style={styles.statSubtext}>
              {user.streak >= 7 ? '🔥 Keep the fire burning!' : 'Keep going!'}
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🌍</div>
            <div style={styles.statLabel}>Impact Score</div>
            <div style={styles.statValue}>
              {(user.xp * 0.25).toLocaleString()}
            </div>
            <div style={styles.statSubtext}>
              Equivalent to {Math.floor(user.xp * 0.25 / 10)} kg CO₂ saved
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>👑</div>
            <div style={styles.statLabel}>Your Role</div>
            <div style={styles.statValue}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </div>
            <div style={styles.roleBadge}>
              Level {level} {user.role}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Left side - Contributions */}
          <div style={styles.leftColumn}>
            {/* Add Contribution Section */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                  Share Your Eco-Action
                  <div style={styles.sectionTitleUnderline}></div>
                </h2>
                <p style={styles.sectionSubtitle}>
                  Document your sustainable habits and earn XP
                </p>
              </div>
              <AddContribution />
            </div>

            {/* Recent Contributions Section */}
            <div style={styles.sectionCard}>
              <div style={styles.leaderboardHeader}>
                <h2 style={styles.sectionTitle}>
                  Recent Contributions
                  <div style={styles.sectionTitleUnderline}></div>
                </h2>
                <Link to="/contributioncard" style={styles.viewAllButton}>
                  View All →
                </Link>
              </div>
              
              {contributions.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyStateIcon}>📝</div>
                  <p style={styles.emptyStateText}>
                    No contributions yet. Be the first to contribute!
                  </p>
                  <p style={styles.emptyStateSubtext}>
                    Share your knowledge and earn XP
                  </p>
                </div>
              ) : (
                <div style={styles.contributionsList}>
                  {contributions.slice(0, 3).map((c) => (
                    <ContributionCard key={c.id} data={c} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Leaderboard */}
          <div style={styles.leaderboardCard}>
            <div style={styles.sectionCard}>
              <div style={styles.leaderboardHeader}>
                <h2 style={styles.leaderboardTitle}>🏆 Live Leaderboard</h2>
                <Link to="/leaderboard" style={styles.viewAllButton}>
                  View All →
                </Link>
              </div>
              <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}>
                <Leaderboard />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Making sustainability rewarding • {contributions.length} contributions and counting
          </p>
        </footer>
      </div>
    </div>
  );
};
//push
export default Dashboard;